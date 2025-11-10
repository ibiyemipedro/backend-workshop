import { Schema, model, Document } from 'mongoose';

export interface IMongoProduct extends Document {
  categoryId: string;
  title: string;
  description: string;
  summary: string;
  price: number;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IMongoProduct>({
  categoryId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  tags: [{ type: String }]
}, {
  timestamps: true,
  collection: 'products'
});

export const MongoProduct = model<IMongoProduct>('Product', productSchema);