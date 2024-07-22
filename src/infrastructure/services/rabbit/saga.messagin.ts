import * as amqp from 'amqplib';

const sendMessageAndWaitForResponse = async (event:string,data:any):Promise<any> =>{

    const connection = await amqp.connect("amqp://rabbit");
    const channel    = await connection.createChannel();
    const exchange   = 'saga_users_exchange';

    await channel.assertExchange(exchange,'direct',{durable:false});

    const responseQueue = await channel.assertQueue('',{exclusive:true});
    const correlationId = generateCorrelationId();

    const responsePromise = new Promise<any>((resolve) => {
        channel.consume(responseQueue.queue,(msg:any) => {
            if (msg.properties.correlationId === correlationId) {
                const response = JSON.parse(msg.content.toString());
                resolve(response);
            }
        }, {noAck:true});
    });

    await channel.publish(exchange,event,Buffer.from(JSON.stringify(data)),{
        correlationId,
        replyTo:responseQueue.queue
    });

    console.log(`[x] Sent ${event}: ${JSON.stringify(data)}`);

    // Espera y devuelve la respuesta
    return responsePromise;
}

const generateCorrelationId = () => {
    return Math.random().toString() + Date.now().toString();
};

export default sendMessageAndWaitForResponse;