export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPreferred?: boolean;
}

export interface Mobile {
  countryCode: string;
  number: string;
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  mobile: Mobile;
  dateOfBirth: Date;
  password: string;
  addresses: Address[];
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  mobile: Mobile;
  dateOfBirth: Date;
  password: string;
  addresses?: Address[];
  role?: UserRole;
}

export interface UserUpdateInput {
  firstName?: string;
  lastName?: string;
  address?: Address;
  mobile?: Mobile;
  dateOfBirth?: Date;
  addresses?: Address[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  email: string;
  code: string;
  newPassword: string;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: UserRole;
}