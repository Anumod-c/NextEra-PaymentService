import { orderController } from "../../interface/orderController";
import RabbitMQConfig from "../config/rabbitMQ";
import RabbitMQClient from './client'

export default class MessageHandlers {
    static async handle(operations: string, data: any, correlationId: string, replyTo: string) {
        let response;

        switch (operations) {
            case 'create_order':
                console.log("creating stripe payment session");
                response = await orderController.createStripeSession(data)
                break;
            case 'save_order':
                console.log("Saving order in database");
                response = await orderController.saveOrder(data);
                break;
            case 'tutor_payout':
                console.log('fetching tutor payouts');
                response = await orderController.tutorPayouts(data);
                break;
            case 'admin_payout':
                console.log('fetching admin payouts');
                response = await orderController.adminPayouts();
                break;
            case 'AdminPayoutsByMonth':
                response = await orderController.AdminPayoutsByMonth();
        }
        await RabbitMQClient.produce(response, correlationId, replyTo)
    }
}