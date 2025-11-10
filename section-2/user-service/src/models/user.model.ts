import mongoose, { Schema, Document } from 'mongoose';
import { User, UserRole, Address, Mobile } from '../types/user.types';

export interface UserDocument extends Omit<User, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isPreferred: { type: Boolean, default: false }
});

const MobileSchema = new Schema<Mobile>({
  countryCode: { type: String, required: true },
  number: { type: String, required: true }
});

const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  address: { type: AddressSchema, required: true },
  mobile: { type: MobileSchema, required: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true, minlength: 6 },
  addresses: { type: [AddressSchema], default: [] },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  }
}, {
  timestamps: true
});

UserSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);