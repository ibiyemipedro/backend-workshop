import { UserModel, UserDocument } from '../models/user.model';
import { UserCreateInput, UserUpdateInput } from '../types/user.types';

export class UserRepository {
  async create(userData: UserCreateInput): Promise<UserDocument> {
    const user = new UserModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
  }

  async update(id: string, updateData: UserUpdateInput): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async updatePassword(id: string, hashedPassword: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
  }

  async delete(id: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndDelete(id);
  }

  async exists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    return !!user;
  }
}