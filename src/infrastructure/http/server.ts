import express from "express";
import config from "../config/config";
import { databaseConnection } from "../database/mongodb";
const app = express();
app.use(express.json());


const startServer = async ()=>{
    try {
        await databaseConnection();
        const port = config.port;

        app.listen(port,()=>{
            console.log('Order service runnin on port',port)
        })
    } catch (error) {
        console.log("Error in starting Order service");
    }
}

startServer()