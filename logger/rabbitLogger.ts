import EvenEmitter from 'events';
import logger from './logger';

class RabbitMQLogger extends EvenEmitter{}

const rabbitMQLogger = new RabbitMQLogger();

rabbitMQLogger.on('connect',(info)=>{
    logger.info(`RabbitMQ Connectedddddddddddddddddddddddddddddddd : ${info}`)
});
rabbitMQLogger.on('disconnect', (error) => {
    logger.error(`RabbitMQ Disconnected: ${error.message}`);
});

rabbitMQLogger.on('messageReceived', ({ queue, correlationId, operation }) => {
    logger.info(`Message received from queue ${queue}, operation: ${operation}, correlationId: ${correlationId}`);
});

rabbitMQLogger.on('messageProcessed', ({ operation, result }) => {
    logger.info(`Operation processed: ${operation}, result: ${JSON.stringify(result)}`);
});

rabbitMQLogger.on('messageProduced', ({ queue, correlationId }) => {
    logger.info(`Message sent to queue ${queue} with correlationId: ${correlationId}`);
});

rabbitMQLogger.on('error', (error) => {
    logger.error(`RabbitMQ Error: ${error.message}`);
});


export default rabbitMQLogger;