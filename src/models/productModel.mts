import mongodb from "../database/index.mts";
import {Product} from "./types.mts";


export async function getAllProducts(): Promise<Product[] | null> {
  try {
    const data = (await mongodb.getDb().collection<Product>("products").find({}).toArray());
    if (!data.length) throw new Error(`No products found`);
    return data ;
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await mongodb.getDb().collection<Product>("products").findOne({Id: id});
    if (!product) throw new Error(`Product with ID ${id} not found`);
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}




