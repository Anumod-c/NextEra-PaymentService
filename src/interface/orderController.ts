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
    async tutorPayouts(tutorId:string){
        try {
            const result = await this.orderService.tutorpayouts(tutorId);
            return result
        } catch (error) {
            console.log("Error inn fetching the tutor payouts")
        }
    }
    async adminPayouts(){
        try {
            const result = await this.orderService.adminPayouts();
            return result
        } catch (error) {
            console.log("Error inn fetching the admin payouts")
        }
    }
    async AdminPayoutsByMonth(){
        try {
            const result = await this.orderService.AdminPayoutsByMonth();
            return result;
        } catch (error) {
            console.log("Error in fetching AdminPayoutsByMonth",error)
        }
    }
    async TutorPayoutsByMonth(tutorId:string){
        try {
            const result = await this.orderService.tutorPayoutsByMonth(tutorId);
            return result;
        } catch (error) {
            console.log("Error in fetching TutorPayoutsByMonth",error)
        }
    }
}

export const orderController = new OrderController();
