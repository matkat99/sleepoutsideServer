import type {Request, Response} from "express";
import {Router} from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats"
import { OrderSchema } from "../database/json-schema.ts";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
import { getProductById } from "../models/productModel.mts";
import type { CartItem, Order } from "../models/types.mts";
import { calculateOrdertotals, createOrder } from "../models/orderModel.mts";

// @ts-ignore
const ajv = new Ajv();
// @ts-ignore
addFormats(ajv);

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    // get the body of the request
    const body = req.body as Order;
    // console.log(body);
        // we shouldn't trust that the amounts sent in the body are correct. They are too easy to change clientside. So we should calculate our own totals here.
        // note that the callback for map is async. That means we will get an array of promises back from it. We will need to resolve those before we can use the values
        const productPromises = body.orderItems.map(async (item:CartItem) => {
            const productFromDB = await getProductById(item.productId)
            if(!productFromDB) {
                throw new EntityNotFoundError({
                    message:"Product Not Found",
                    code:'ERR_NF',
                    statusCode:404
                    })
                    }
            return {
                ...item,
                price: productFromDB.listPrice,
                finalPrice:  productFromDB.finalPrice
            }
            })
            const products = await Promise.all(productPromises);
            const totals = calculateOrdertotals(products);
        // build out a new order object
    const newOrder:Order = {
        ...req.body,
       items: products,
       totalPrice: totals.orderTotal,
        shippingCost: totals.shipping,
        taxAmount: totals.tax,
        status: "pending"
    }
        console.log(newOrder)
        const validate = ajv.compile(OrderSchema);
        
        if(!validate(newOrder)) {
            if(validate.errors) {
                // validate.errors is an array.  I've never seen more than one error come back...but just in case we can map over it and pull out the message(s)
                // We need to do this because our errorHandler is expecting a string...not an array of objects.
                const message = validate.errors.map((error:any)=> error.instancePath+" "+error.message).join(", ");
                throw new EntityNotFoundError({message:message, statusCode:400 });
            }
        }
       
        await createOrder(newOrder);
         
    res.status(201).json({message : 'Order Created'});
});

export default router;