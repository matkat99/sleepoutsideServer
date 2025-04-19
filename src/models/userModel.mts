import { ObjectId } from "mongodb";
import mongodb from "../database/index.mts";
import type {User} from "./types.mts";


export async function getAllUsers(): Promise<User[] | null> {
    const data = (await mongodb.getDb().collection<User>("users").find({}).toArray());
    return data ;
}

export async function getUserById(id: ObjectId): Promise<User | null> {
    const user = await mongodb.getDb().collection<User>("users").findOne({_id: id});
    return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await mongodb.getDb().collection<User>("users").findOne({email:email});
    return user;
}
export async function createUser(newUser:{email:string, password:string, name:string}): Promise<void> {
    
     const result = await mongodb.getDb().collection("users").insertOne(newUser);
    
}



