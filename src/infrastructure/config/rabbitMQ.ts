import config from "./config";


interface RabbitMQConfig{
    rabbitMQ:{
        url:string;
        queues:{
            orderQueue:string;
        };
    };
}

const RabbitMQConfig:RabbitMQConfig={
    rabbitMQ:{
        url:config.RABBITMQ_URL,
        queues:{
            orderQueue:'order_queue'
        }
    }
}


export default RabbitMQConfig