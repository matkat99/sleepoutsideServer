import type { CartItem, Order} from "./types.mts";
import { ObjectId } from "mongodb";
import mongodb from "../database/index.mts";


// calculate order subtotal from the cart items
const calculateItemTotal = function (list: CartItem[]) {
    // calculate the total of all the items in the cart. If you have implemented quantity make sure to take that into account.
    const amounts = list.map((item) => item.finalPrice);
    return amounts.reduce((sum, item) => sum + item,0);
  };
  // calculate the shipping, tax, and orderTotal
  export const calculateOrdertotals = function (list: CartItem[]) {
    const subTotal = calculateItemTotal(list);
    const shipping = 10.0 + (list.length - 1) * 2;
    // toFixed converts the number to a string with two decimal places. so we have to change it back to a number before we can use it
    const tax = parseFloat((subTotal * 0.06).toFixed(2));
    const orderTotal = (
      subTotal + shipping +tax
    ).toFixed(2);
    return {
        shipping,
        subTotal,
        tax,
        orderTotal: parseFloat(orderTotal)
    }
  };

  export async function createOrder (order: Order) {
    const result = await mongodb.getDb().collection("users").insertOne(order);

    }
