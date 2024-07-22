import * as amqp from 'amqplib';

export const declareOrderExchange = async () => {
    try {
        const connection = await amqp.connect('amqp://rabbit');
        const channel = await connection.createChannel();
        const exchangeName = 'saga_users_exchange';
        const exchangeType = 'direct';

        await channel.assertExchange(exchangeName, exchangeType, { durable: false });
        console.log(`Exchange '${exchangeName}' declared successfully.`);
        
        // Declare a response queue to listen for responses
        const responseQueue = await channel.assertQueue('', { exclusive: true });
        console.log(`Response queue '${responseQueue.queue}' declared successfully.`);
    } catch (error) {
        console.log("ERROR: " + error);
    }
};
