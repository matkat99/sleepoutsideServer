import mongodb from "../database/index.mts";
import type {Product, QueryParams} from "./types.mts";
import { formatFields } from "../services/utils.mts";
import type { Collection } from "mongodb";

interface Find {
    name?:string,
    descriptionHtmlSimple?:string,
    category?:string,
}

export async function getAllProducts(query:QueryParams): Promise<{totalCount: number; data: Product[] | null}> {
    let find:Find = {}
    const {q, category, fields} = query; 
    // here we check to see if there is a limit...if yes convert it to a number, if no set it to the default of 20
    const limit= query.limit? parseInt(query.limit) : 20;
    const offset= query.offset? parseInt(query.offset) : 0;
    let fieldFilters = fields? formatFields(fields): null;
    const productsCollection:Collection<Product> = mongodb.getDb().collection<Product>('products');
    // check to see if we need to filter on category or name   
    if(category) {
        find.category = category;
    }
    if(q) {
        find.name = q;
        find.descriptionHtmlSimple = q;
    }
    
    console.log("find:",find)
      // get the total number of records matching our query
      const totalCount = await productsCollection.countDocuments(find);
    const cursor = await productsCollection.find(find).skip(offset).limit(limit);
    if(fieldFilters) {
        cursor.project(fieldFilters);
    }
        // finally convert the result to an array that we can consume
        const results = await cursor.toArray();
        return {data:results, totalCount};
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await mongodb.getDb().collection<Product>("products").findOne({id: id});
    return product;
}




