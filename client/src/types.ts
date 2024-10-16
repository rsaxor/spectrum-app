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