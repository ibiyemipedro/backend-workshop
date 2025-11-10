import { Schema, model, Document } from 'mongoose';
import { UserRole, IAddress, IMobileNumber } from '../types/common.types';

export interface IMongoUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
  mobile: IMobileNumber;
  dateOfBirth: Date;
  password: string;
  addresses: IAddress[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isPreferred: { type: Boolean, default: false }
}, { _id: false });

const mobileSchema = new Schema<IMobileNumber>({
  countryCode: { type: String, required: true },
  number: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema<IMongoUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: addressSchema, required: true },
  mobile: { type: mobileSchema, required: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  addresses: [addressSchema],
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER }
}, {
  timestamps: true,
  collection: 'users'
});

export const MongoUser = model<IMongoUser>('User', userSchema);