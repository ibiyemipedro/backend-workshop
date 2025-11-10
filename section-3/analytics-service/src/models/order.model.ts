import { Schema, model, Document } from 'mongoose';
import { OrderStatus } from '../types/common.types';

export interface IMongoOrder extends Document {
  userId: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IMongoOrder>({
  userId: { type: String, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING }
}, {
  timestamps: true,
  collection: 'orders'
});

export const MongoOrder = model<IMongoOrder>('Order', orderSchema);