import type { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

// Define constants for secret key and token expiration time
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; 

// Create a middleware function to verify JWT tokens
function authorize(req: Request, res: Response, next: NextFunction) {
  // make sure there is an authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    // get the token from the header
    const token = authHeader.split(' ')[1] || "";
    // check for validity
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          //stop the request if the token is invalid
            return res.status(403).json({ message: 'Forbidden' });
        }
        
        res.locals.user = user;
        
        next();
     
    } );
  } else {
    // stop the request if the token is missing
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authorize;