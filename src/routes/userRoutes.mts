import type {Request, Response} from "express";
import {Router} from "express";
import * as argon2 from "argon2";
import { ObjectId } from "mongodb";
import { generateToken } from "../services/utils.mts";
import authorize from "../middleware/authorize.mts";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
import { createUser, getUserByEmail, getUserById } from "../models/userModel.mts"; 
import Ajv from "ajv";
import addFormats from "ajv-formats"
import { UserSchema } from "../database/json-schema.ts";

// for some reason typescript doesn't like this even though it is exactly how the documentation says to use these. We are just going to ignore the types for now
// @ts-ignore
const ajv = new Ajv();
// @ts-ignore
addFormats(ajv);

const router: Router = Router();
// Create an endpoint to login and obtain a JWT token

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Check if the user exists in the database
      const user = await getUserByEmail(email);
  if (!user || !(await argon2.verify(user.password, password))) {
          throw new EntityNotFoundError({ message: "User not found or incorrect password", statusCode: 401 });
      }
    const token = generateToken({userId: user._id, email: user.email});
    res.status(200).json({ token, user: { _id: user._id, email: user.email, name: user.name } });
  
});

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    const user = await getUserByEmail(email);
    if (user) throw new EntityNotFoundError({ message: "User already exists", statusCode: 409 });
    const hashedPassword = await argon2.hash(password);
    // normally we will just be expecting a name, email, and password for a new user. But what if they send a phone number as well?
    // we can use the spread operator to put everything that was sent in the body, then update and add things as needed.
    // if we were not validating the schema this could be a bit risky however...
    const newUser = {
        ...req.body,
        password: hashedPassword,
        createdAt: (new Date()).toISOString(),
        modifiedAt: new Date().toISOString()
    }
    console.log(newUser)
    const validate = ajv.compile(UserSchema)
    if(!validate(newUser)) {
        if(validate.errors) {
            // validate.errors is an array.  I've never seen more than one error come back...but just in case we can map over it and pull out the message(s)
            // We need to do this because our errorHandler is expecting a string...not an array of objects.
            const message = validate.errors.map((error:any)=> error.instancePath+" "+error.message).join(", ");
            throw new EntityNotFoundError({message:message, statusCode:400 });
        }
    }
     await createUser(newUser);
     res.status(200).json({message:"User created successfully"});
});

// router.get("/:id", authorize, async (req, res) => {
//   const { id } = req.params;
//   console.log(id)
//   const user = await getUserById(new ObjectId(id));

//   if (!user) {
//     throw new EntityNotFoundError({ message: "User not found", statusCode: 404 });
//   }
//   res.status(200).json(user);
// });


// Protect a route with JWT authentication
router.get('/protected', authorize, (req: Request, res: Response) => {
    console.log(res.locals.user)
  res.json({ message: `Hello, ${res.locals.user.email}!` });
});

export default router;