
import { Order } from "../../model/Order";

import { IOrder } from "../entities/IOrder";
export class OrderRepository {


    async saveOrder(orderData:IOrder){
        try {
            orderData.createdAt = new Date ()
            console.log('333333',orderData);
            const existingOrder = await Order.findOne({  courseId: orderData.courseId,userId:orderData.userId });
            if (existingOrder) {
                console.log('Order already saved, skipping...');
                return { success: false, message: "Order already saved." };
            }
            const newOrder = new Order({
                ...orderData // Ensure this is set correctly
            });
            console.log('neworder',newOrder)
            await newOrder.save();
            console.log('Order saved in database');
            return { success: true, message: "Order successful", order: newOrder };
        } catch (error) {
            
            console.log("Error in saaving the order",error);
            return { success: false, message: "Order failed. Please try again" };
        }
    }
    async fetchTutorPayouts(tutorId:string){
        try {
            const tutorPayouts= await Order.find({tutorId});
            if(tutorPayouts){
                return {tutorPayouts,success:true,message:"Payouts fetched successfull"}
            }else{
                return {success:false,messagge:"No payouts to list"}
            }
        } catch (error) {
            console.log("Error in fetchig tutor payouts from orderdb")
        }
    }
}
