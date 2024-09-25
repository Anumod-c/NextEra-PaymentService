import express from "express";
import config from "../config/config";
import { databaseConnection } from "../database/mongodb";
import RabbitMQClient from '../rabbitMQ/client'
const app = express();

app.use(express.json());


const startServer = async ()=>{
    try {
        await databaseConnection();
        await RabbitMQClient.initialize()
        const port = config.port;


        app.listen(port,()=>{
            console.log('Order service runnin on port',port)
        })
    } catch (error) {
        console.log("Error in starting Order service");
    }
}

startServer()