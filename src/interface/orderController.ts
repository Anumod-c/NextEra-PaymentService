import { OrderService } from "../application/use-case/order";
import { IOrder } from "../domain/entities/IOrder";

class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async createStripeSession(orderData: IOrder) {
        try {
            console.log("Received order data from API Gateway:", orderData);
            const result = await this.orderService.createStripeSession(orderData);
            if (result.success) {
                console.log("Order placed successfully:", result);
                return result
            } else {
                console.log("Order placement failed:", result.message);
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.log("Error in purchasing the course:", error);
            return { success: false, message: "An error occurred while creating the order." };
        }
    }
    async saveOrder(orderData: IOrder) {
        try {
            console.log("Saving order to the database:", orderData);
            const result = await this.orderService.saveOrder(orderData);
            return result;
        } catch (error) {
            console.log("Error in saving the order:", error);
            return { success: false, message: "An error occurred while saving the order." };
        }
    }
    async payouts(tutorId:string){
        try {
            const result = await this.orderService.payouts(tutorId);
            return result
        } catch (error) {
            console.log("Error inn fetching the tutor payouts")
        }
    }
}

export const orderController = new OrderController();
