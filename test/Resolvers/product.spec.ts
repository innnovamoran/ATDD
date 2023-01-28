import "reflect-metadata";
import MongooseDB from "../../src/Server/Config/Mongoose";
import { gCall } from "../Utils";
const db = new MongooseDB();
describe("Product Resolver", () => {
  beforeAll(async () => await db.start_mock_db());

  afterAll(async () => await db.end_mock_db());

  it("Should Be create a product", async () => {
    const gql = `mutation {
      addNewProduct
    }
    `;
    const response = await gCall({
      source: gql,
    });
    console.log(response.data?.addNewProduct);
    expect(response.data?.addNewProduct).toEqual("hola");
  });
});
