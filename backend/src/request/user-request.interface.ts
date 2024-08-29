import { Request } from 'express';

export interface UserRequest extends Request {
  user: {
    userId: number;
    roles: string[];
  };
}