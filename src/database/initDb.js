// import MongoClient and ServerApiVersion from the mongodb library and import products from the products.js file.
import { MongoClient, ServerApiVersion } from "mongodb";
import { products } from "./products.js";

//build the uri for our connection string
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
const init = async () => {
  try {
    await client.connect();
    console.log(`Connected to MongoDB`);
    // get a reference to the actual database we will be using with .db(<database name>)
    const db = client.db(process.env.MONGO_DATABASE);

    // initialize the Products collection
    await seedProducts(db);
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.close();
  }
};

const seedProducts = async (db) => {
  // we need to make a small transform to the provided data before inserting
  // use .map() to transform each product before inserting it into the database
  // change Reviews.ReviewUrl to match the following pattern: /products/<productId>/reviews/
  const newProducts = products.map((product) => {
    product.Reviews.ReviewsUrl = `/products/${product.Id}/reviews/`;
    return product;
  });
  try {
    // drop the collection to clear out the old records
    await db.collection("products").drop();
    console.log("Collection 'products' dropped successfully");
    // create a new collection
    await db.createCollection("products");
    console.log("Collection 'products' created successfully");
    // insert all products
    const result = await db.collection("products").insertMany(newProducts);
    console.log(
      `${result.insertedCount} new listing(s) created with the following id(s):`
    );
    console.log(result.insertedIds);
  } catch (error) {
    console.error(error.message);
  }
};

init();
