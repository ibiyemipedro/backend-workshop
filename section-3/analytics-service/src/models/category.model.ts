import { Schema, model, Document } from 'mongoose';

export interface IMongoCategory extends Document {
  name: string;
  description: string;
  parentCategoryId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<IMongoCategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parentCategoryId: { type: String },
  tags: [{ type: String }]
}, {
  timestamps: true,
  collection: 'categories'
});

export const MongoCategory = model<IMongoCategory>('Category', categorySchema);