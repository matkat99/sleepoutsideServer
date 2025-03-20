import mongodb from "../database/index.mts";
import {Product} from "./types.mts";


export async function getAllProducts(): Promise<Product[] | null> {
    const data = (await mongodb.getDb().collection<Product>("products").find({}).toArray());
    return data ;
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await mongodb.getDb().collection<Product>("products").findOne({Id: id});
    return product;
}




