import mongoose, { Document, Schema } from "mongoose";
import { ICourse } from "../domain/entities/ICourse";

export interface ICourseDocument extends ICourse, Document {}

const OrderSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionId:{
    type:String,
    required:true,
  },

  tutorId: {
    type:String,
    required:true,
  },
  price:{
    type:String,
    required:true,
  },
  adminShare:{
    type:String,
    required:true,
  },
  tutorShare:{
    type:String,
    required:true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentStatus: {
    type: Boolean,
  },
});

export const Order = mongoose.model<ICourseDocument>("Order",OrderSchema);