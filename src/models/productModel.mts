import mongodb from "../database/index.mts";
import type {Product} from "./types.mts";


export async function getAllProducts(): Promise<Product[] | null> {
    const data = (await mongodb.getDb().collection<Product>("products").find({}).toArray());
    return data ;
}





