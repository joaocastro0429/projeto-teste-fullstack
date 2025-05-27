import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: string | object;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
   

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
           if (err) return res.sendStatus(403);
           req.user = user;
           next();
         });
       };

export  {authMiddleware}