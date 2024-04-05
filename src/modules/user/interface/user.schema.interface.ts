import mongoose, { Document } from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  joinDate: string;
  dob?: Date;
  gender: string;
  roles: string[];
  salt?: string;
  lastUpdatePassword?: Date;
  createdAt: Date;
  updatedAt: Date;
  permissions?: string[];
  role: string;
  language: string;
  avatar: string;
  company?: string;
  bio?: string;
  website?: string;
  locationId: mongoose.Types.ObjectId;
}

export interface ICreateUser {
  email?: string;
  phone?: string;
  status: string;
  salt: string;
  password: string;
  language: string;
  country?: string;
  role?: string;
  locationId: string;
  firstName: string;
  lastName: string;
  bio?: string;
  website?: string;
  company?: string;
}

export type UserDocument = IUser & Document;
