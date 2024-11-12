import { Channel,Connection,ConsumeMessage,connect } from "amqplib";
import rabbitMQLogger from "../../../logger/rabbitLogger";
import RabbitMQConfig from "../config/rabbitMQ";
import MessageHandlers from "./messageHandler";

export default class Consumer{
    constructor(private channel :Channel){}
     
    async consumeMessage(){
        try{
            console.log('ready to consume message from gateway');
            await this.channel.assertQueue(RabbitMQConfig.rabbitMQ.queues.orderQueue,{durable:true});
            this.channel.consume(RabbitMQConfig.rabbitMQ.queues.orderQueue,async(message:ConsumeMessage |null)=>{
                if(message){
                    const {correlationId,replyTo} = message.properties;
                    const operation = message.properties.headers?.function;
                    rabbitMQLogger.emit('messageReceived', {
                        queue: RabbitMQConfig.rabbitMQ.queues.orderQueue,
                        correlationId,
                        operation,
                    });


                    console.log('Message properties:', { correlationId, replyTo, operation });
                    if(message.content){
                        const data = JSON.parse(message.content.toString());
                        try{
                        await MessageHandlers.handle(operation,data,correlationId,replyTo);
                        rabbitMQLogger.emit('messageProcessed', { operation, result: "Success" });

                        }catch(handlererror){
                            console.log('Error in message handler',handlererror)
                        }
                    }
                }
            },{noAck:true})
           
        }catch(error){
            rabbitMQLogger.emit('error', error);
            console.error("error in consume message in userService",error)
        }
    }
}