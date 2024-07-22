import * as amqp from 'amqplib';
import { VehicleUseCases } from "../../../application/use-case/vehicle-use-cases";
import { MysqlVehicleRepository } from "../../repositories/mysql-vehicle.repository";

export const consumeMessages = async () => {
    const connection = await amqp.connect('amqp://rabbit');
    const channel    = await connection.createChannel();
    const exchange   = 'saga_exchange';
    const queue      = 'cars_queue';

    await channel.assertExchange(exchange,'direct',{durable:false});

    await channel.assertQueue(queue,{durable:false});
    await channel.bindQueue(queue,exchange,'getCarFromOrder');

    console.log('[*] Waiting for order messages. To exit press CTRL+C');

    channel.consume(queue,async(msg:any) => {
        const message = JSON.parse(msg.content.toString());

        await handleOrderMessage(
            message,
            msg.properties.replyTo,
            msg.properties.correlationId,
            channel
        );
        console.log(`[x] Received order message: ${JSON.stringify(message)}`);
    },{noAck:true});
}

const handleOrderMessage = async (message:any, replyTo:string, correlationId:string, channel: amqp.Channel) => {
  try {
      console.log(message);
      const mysqlVehicleRepository = new MysqlVehicleRepository();
      const vehicleUseCases = new VehicleUseCases(mysqlVehicleRepository);
      const vehicle = await vehicleUseCases.getVehicleByUuid(message.vehicleId);
      const response = { vehicle };
      channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(response)), { correlationId });
      console.log('Responded to temporary queue:', response);
  } catch (error:any) {
      console.error('Error al manejar el mensaje de la orden:', error.message);
  }
};
