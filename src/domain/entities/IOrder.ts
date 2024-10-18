export interface IOrder {
    tutorId: string;
    userId: string;
    adminId: string;
    price: string;
    discountPrice:string;
    adminShare: string;
    tutorShare: string;
    paymentStatus: boolean;
    createdAt: Date; // Ensure this matches the schema
    transactionId: string;
    sessionId?: string;
    metadata?: Map<string, string>;
    title: string;
    courseId: string;
    thumbnail: string;
}