import "reflect-metadata";
import MongooseDB from "../../src/Server/Config/Mongoose";
import { gCall } from "../Utils";
const db = new MongooseDB();
describe("Product Resolver", () => {
  beforeAll(async () => await db.start_mock_db());

  afterAll(async () => await db.end_mock_db());

  it("Should Be create a product", async () => {
    const gql = `mutation AddNewProduct($ProductInput:ProductInput!) {
      addNewProduct(ProductInput:$ProductInput){
        name
        bar_code
      }
    }
    `;
    const response = await gCall({
      source: gql,
      variableValues: {
        ProductInput: {
          name: "Producto1",
          stock: 2,
          bar_code: "010101010",
          discount_percentage: 10,
          price: 1000,
        },
      },
    });
    console.log(response);
    const inputs = response.data?.addNewProduct;
    expect(inputs.name).toEqual("Producto1");
    expect(inputs.bar_code).toEqual("010101010");
  });
});
