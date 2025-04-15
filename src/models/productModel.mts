import mongodb from "../database/index.mts";

import {Product} from "./types.mts";

interface Find {
    name?:string,
    descriptionHtmlSimple?:string,
    category?:string,
}

export async function getAllProducts(query:Record<string, any>): Promise<Product[] | null> {
    let find:Find = {}
    const {q, category, fields} = query; 
    const limit = parseInt(query.limit) || 20;
    const offset = parseInt(query.offset) || 0;
    let fieldFilters = formatFields();
    if(category) {
        find.category = category;
    }
    if(q) {
        find.name = q;
        find.descriptionHtmlSimple = q;
    }
    function formatFields() {
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
    console.log("find:",find)
    const cursor = await mongodb.getDb().collection<Product>("products").find(find).skip(offset).limit(limit);
    if(fieldFilters) {
        cursor.project(fieldFilters);
    }
    const data = await cursor.toArray();
    return data ;
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await mongodb.getDb().collection<Product>("products").findOne({id: id});
    return product;
}




