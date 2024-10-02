import { IOrder } from "../../domain/entities/IOrder";
import dotenv from 'dotenv';
dotenv.config()

import { OrderRepository } from "../../domain/repositories/OrderRepository";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!)


export class OrderService {
    private orderRepo: OrderRepository;
    constructor() {
        this.orderRepo = new OrderRepository();
    }

    async createStripeSession(orderData: IOrder) {
        try {
            console.log('Reached use case for purchasing order');

            // Create a Stripe Checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: orderData.title,
                                images: [orderData.thumbnail],
                                
                            },
                            unit_amount: parseInt(orderData.discountPrice) * 100, // Assuming price is in dollars
                        },
                        quantity: 1,
                    },
                ],
                
                mode: 'payment',
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:5173`,
            });
            
            // Save the order in the database
           
            const priceAsNumber = parseFloat(orderData.price);

            orderData.transactionId=session.id
            orderData.paymentStatus=true
            orderData.adminShare=( priceAsNumber*0.10).toString();
            orderData.tutorShare= (priceAsNumber*0.90).toString();
            console.log('hyyy',orderData)

            return {
                success: true,
                message: "Order successfully created",
                sessionId: session.id,
                orderData,
            };
        } catch (error) {
            console.log("Error in purchasing course(use-case):", error);
            return { success: false, message: "Failed to create order." };
        }
    }
    async saveOrder(orderData: IOrder) {
        try {
            console.log('Saving the order in the database',orderData);
            const order = await this.orderRepo.saveOrder(orderData);
            return {
                success: true,
                message: "Order successfully saved",
                order,
            };
        } catch (error) {
            console.log("Error saving the order:", error);
            return { success: false, message: "Failed to save the order." };
        }
    }
    async payouts(tutorId:string){
        try{
            const result=await this.orderRepo.fetchTutorPayouts(tutorId);
            return result
        }catch(error){
            console.log("Error in fetchihg the tutor payouts in usecase")
            return { success: false, message: "Failed to fetch the payouts." };

        }
    }
}