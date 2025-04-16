import mongodb from "../database/index.mts";
import type {Product} from "./types.mts";
import { buildPaginationWrapper, formatFields } from "../services/utils.mts";
import type { Collection } from "mongodb";

interface Find {
    name?:string,
    descriptionHtmlSimple?:string,
    category?:string,
}

export async function getAllProducts(query:Record<string, any>): Promise<{count: number, next: string |null, prev: string |null, results: Product[] | null}> {
    let find:Find = {}
    const {q, category, fields} = query; 
    const limit = parseInt(query.limit) || 20;
    const offset = parseInt(query.offset) || 0;
    let fieldFilters = formatFields(fields);
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
        const result = await cursor.toArray();
        // build our pagination links
        const wrapper = buildPaginationWrapper(totalCount, query);
        wrapper.results = result as Product[];
        return wrapper
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await mongodb.getDb().collection<Product>("products").findOne({id: id});
    return product;
}




