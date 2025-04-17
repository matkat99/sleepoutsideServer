import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
// Define constants for secret key and token expiration time
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const TOKEN_EXPIRATION_TIME = process.env.JWT_EXPIRES_IN || '10m' as any; // 600 seconds = 10 minutes

// Define a function to generate JWT tokens
export function generateToken(user: {userId:ObjectId, email:string}) {
   
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
  return token;
}


export function formatFields(fields:string) {
    const fieldsArr = fields?.split(",");
    if(fieldsArr) {
        const filter = fieldsArr
        .map((field:string) => field.trim())
        .reduce((acc: Record<string, any>, current:string) => ({ ...acc, [current]: 1 }), {});
        // a longer form of doing this conversion
        // let filter: Record<string, any> = {};
        // if(fieldsArr) {
        //     fieldsArr.forEach((field:string) => {
        //      filter[field.trim()] = 1
        //     })      
        // };
        return filter
    }
}

export function buildPaginationWrapper(totalCount:number, query:Record<string, any>) {
    const {limit=20, offset=0} = query;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.ceil(offset / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;
    let next, prev;
    // create a new URLSearchParams object from the query parameters. This will make it easy to modify the fields we need to, while passing all the others on.
  const params = new URLSearchParams(query);
  if (hasPreviousPage) {
    params.set("offset", (offset - limit).toString());
    // query.offset = offset - limit;
    prev = `/?${params}`;
  }
  if (hasNextPage) {
    params.set("offset", offset + limit);
    next = `/?${params}`;
  }
       
    return {
        count: totalCount, 
        prev: prev || null, 
        next: next || null, 
        results: [] as any
    }
    
}