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
                return { success: true, message: result.message, sessionId: result.sessionId };
            } else {
                console.log("Order placement failed:", result.message);
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.log("Error in purchasing the course:", error);
            return { success: false, message: "An error occurred while processing the order." };
        }
    }
}

export const orderController = new OrderController();
