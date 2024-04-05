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
