import "reflect-metadata";
import MongooseDB from "../../src/Server/Config/Mongoose";
import { gCall } from "../Utils";
const db = new MongooseDB();
describe("Product Resolver", () => {
  beforeAll(async () => await db.start_mock_db());

  afterAll(async () => await db.end_mock_db());

  it("Should Be create a product", async () => {
    const gql = `mutation AddNewProduct($data:RegiserInput!){
        addNewProduct(data:$data){
            name,
            stock,
            bar_code,
            discount_percentage,
            price
        }
    }`;
    const response = await gCall({
      source: gql,
      variableValues: {
        data: {
          bar_code: "01010101",
          discount_percentage: 0,
          name: "product",
          stock: 10,
          price: 1000,
        },
      },
    });
    console.log(response);
    expect(true).toBeTruthy();
  });
});
