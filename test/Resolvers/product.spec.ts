import "reflect-metadata";
import MongooseDB from "../../src/Server/Config/Mongoose";
import { gCall } from "../Utils";
import { gql_add_product } from "../Utils/querys";
const db = new MongooseDB();

describe("Product Resolver", () => {
  beforeAll(async () => await db.start_mock_db());

  afterAll(async () => await db.end_mock_db());

  it("Should Be get error mongoose", async () => {
    const ProductInput = {
      name: "",
      stock: -50,
      bar_code: "",
      discount_percentage: null,
      price: 1000,
    };

    const response = await gCall({
      source: gql_add_product,
      variableValues: {
        ProductInput,
      },
    });

    const errors = response.data?.addNewProduct.errors;

    expect(Array.isArray(errors)).toBeTruthy();

    expect(errors.find((d: any) => d.key === "bar_code").message).toEqual(
      "Código de barra es requerido"
    );
    expect(errors.find((d: any) => d.key === "stock").message).toEqual(
      "Mínimo de stock debe ser mayor a 0"
    );
  });

  it("Should Be create a product", async () => {
    const ProductInput = {
      name: "Producto1",
      stock: 2,
      bar_code: "010101010",
      discount_percentage: 10,
      price: 1000,
    };

    const response = await gCall({
      source: gql_add_product,
      variableValues: {
        ProductInput,
      },
    });
    expect(typeof response.data?.addNewProduct._id).toEqual("string");
    expect(response.data?.addNewProduct.name).toEqual(ProductInput.name);
    expect(response.data?.addNewProduct.bar_code).toEqual(
      ProductInput.bar_code
    );
    expect(response.data?.addNewProduct.stock).toEqual(ProductInput.stock);
  });
});
