export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface NewUser {
  email: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export interface Customer {
  _id: string;
  acctcode: string;
  company: string;
  email: string;
  salesrep: string;
  trade: string;
}

export interface NewCustomer {
  acctcode: string;
  company: string;
  email: string;
  salesrep: string;
  trade: 'Trade Customer' | 'Cash Customer' | 'Credit Customer' | string;
}