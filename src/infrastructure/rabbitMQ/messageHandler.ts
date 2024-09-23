import RabbitMQConfig from "../config/rabbitMQ";
 import  RabbitMQClient from './client'

export default class MessageHandlers{
    static async handle(operations:string,data:any,correlationId:string,replyTo:string){
        let response;

        switch(operations){
            case 'create_order':
                console.log("creating order");
                
                break
        }
        await RabbitMQClient.produce(response,correlationId,replyTo)
    }
}