import mongoose, { Document } from 'mongoose';

export interface ILocation {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  city: string;
  placeId: string;
  location: number[];
}

export interface ICreateLocation {
  name: string;
  address: string;
  city?: string;
  placeId: string;
  location: number[];
}

export type LocationDocument = ILocation & Document;
