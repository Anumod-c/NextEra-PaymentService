
import { Order } from "../../model/Order";

import { IOrder } from "../entities/IOrder";
export class OrderRepository {


    async saveOrder(orderData: IOrder) {
        try {
            orderData.createdAt = new Date();
            console.log('333333', orderData);

            // Check if an order with the same courseId and userId exists
            const existingOrder = await Order.findOne({ courseId: orderData.courseId, userId: orderData.userId });

            // If order exists, return early
            if (existingOrder) {
                console.log('Order already exists, skipping...');
                return { success: false, message: "Order already exists." };
            }

            // If no existing order is found, create a new one
            const newOrder = new Order({
                ...orderData // Copy all fields from orderData
            });

            console.log('newOrder', newOrder);

            // Save the new order
            await newOrder.save();
            console.log('Order saved in database');

            return { success: true, message: "Order successfully created.", order: newOrder };
        } catch (error) {
            console.log("Error in saving the order", error);
            return { success: false, message: "Order failed. Please try again." };
        }
    }
    async fetchTutorPayouts(tutorId: string) {
        try {
            const tutorPayouts = await Order.find({ tutorId });
            if (tutorPayouts) {
                return { tutorPayouts, success: true, message: "Payouts fetched successfull" }
            } else {
                return { success: false, messagge: "No payouts to list" }
            }
        } catch (error) {
            console.log("Error in fetchig tutor payouts from orderdb")
        }
    }
    async fetchAdminPayouts() {
        try {
            const adminPayouts = await Order.find();
            console.log('adminpayouts',adminPayouts)
            if (adminPayouts) {
                return { adminPayouts, success: true, message: "Payouts fetched successfull" }
            } else {
                return { success: false, messagge: "No payouts to list" }
            }
        } catch (error) {
            console.log("Error in fetchig admin payouts from orderdb")
        }
    }
    async getAdminPayoutsByMonth (){
        try {
            const payoutsByMonth = await Order.aggregate([
                {
                    $group: {
                      _id: { $month: "$createdAt" }, // Group by month
                      totalPayout: { $sum: { $toDouble: "$adminShare" } }, // Convert adminShare (string) to number and sum
                    }
                  },
                  {
                    $sort: { _id: 1 }, // Sort by month in ascending order
                  }
            ]);
            console.log('adminpayouts by month',payoutsByMonth)
            return payoutsByMonth
        } catch (error) {
            console.error('Error fetching payouts by month:', error);
            throw new Error('Could not fetch payouts');
        }
    }
}
