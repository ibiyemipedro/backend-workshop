import { Schema, model, Document } from 'mongoose';
import { OrderStatus } from '../types/common.types';

export interface IMongoOrderItem extends Document {
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IMongoOrderItem>({
  orderId: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING }
}, {
  timestamps: true,
  collection: 'order_items'
});

export const MongoOrderItem = model<IMongoOrderItem>('OrderItem', orderItemSchema);