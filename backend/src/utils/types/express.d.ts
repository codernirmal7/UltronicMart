// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userData?: any; // or specify the type if you have a specific structure for userData
    }
  }
}