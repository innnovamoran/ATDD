import MongooseDB from "@server/Config/Mongoose";
import { CreateProduct } from "@repositories/Product";
import { TProduct } from "@repositories/Product/Entity";

const db = new MongooseDB();
describe("Product Repo [Create]", () => {
  beforeAll(async () => await db.start_mock_db());

  afterAll(async () => await db.end_mock_db());

  it("Should be handle multiple error", async () => {
    const isError = await CreateProduct({
      bar_code: "",
      discount_percentage: 0,
      name: "",
      stock: -1,
      price: 0,
    });
    if (Array.isArray(isError)) {
      expect(typeof isError.find((error) => error.key === "name")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "name")?.message).toEqual(
        "Nombre de producto es requerido"
      );
      expect(typeof isError.find((error) => error.key === "bar_code")).toEqual(
        "object"
      );
      expect(
        isError.find((error) => error.key === "bar_code")?.message
      ).toEqual("Código de barra es requerido");
      expect(typeof isError.find((error) => error.key === "stock")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "stock")?.message).toEqual(
        "Mínimo de stock debe ser mayor a 0"
      );
      expect(typeof isError.find((error) => error.key === "price")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "price")?.message).toEqual(
        "Mínimo de valor debe ser mayor a 0"
      );
    }
  });
  it("Should be handle name only error", async () => {
    const isError = await CreateProduct({
      bar_code: "01010101",
      discount_percentage: 0,
      name: "",
      stock: 1,
      price: 1,
    });
    if (Array.isArray(isError)) {
      expect(typeof isError.find((error) => error.key === "name")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "name")?.message).toEqual(
        "Nombre de producto es requerido"
      );
    }
  });
  it("Should be handle bard_code only error", async () => {
    const isError = await CreateProduct({
      bar_code: "",
      discount_percentage: 0,
      name: "product",
      stock: 1,
      price: 1,
    });
    if (Array.isArray(isError)) {
      expect(typeof isError.find((error) => error.key === "bar_code")).toEqual(
        "object"
      );
      expect(
        isError.find((error) => error.key === "bar_code")?.message
      ).toEqual("Código de barra es requerido");
    }
  });
  it("Should be handle stock only error", async () => {
    const isError = await CreateProduct({
      bar_code: "01010101",
      discount_percentage: 0,
      name: "product",
      stock: -1,
      price: 1,
    });
    if (Array.isArray(isError)) {
      expect(typeof isError.find((error) => error.key === "stock")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "stock")?.message).toEqual(
        "Mínimo de stock debe ser mayor a 0"
      );
    }
  });
  it("Should be handle price only error", async () => {
    const isError = await CreateProduct({
      bar_code: "01010101",
      discount_percentage: 0,
      name: "product",
      stock: 1,
      price: -2,
    });
    if (Array.isArray(isError)) {
      expect(typeof isError.find((error) => error.key === "price")).toEqual(
        "object"
      );
      expect(isError.find((error) => error.key === "price")?.message).toEqual(
        "Mínimo de valor debe ser mayor a 0"
      );
    }
  });
  it("Should be create new product", async () => {
    const isCreated = await CreateProduct({
      bar_code: "01010101",
      discount_percentage: 0,
      name: "product",
      stock: 10,
      price: 1000,
    });
    if (!Array.isArray(isCreated)) {
      const product = isCreated as TProduct;
      expect(product.bar_code).toEqual("01010101");
      expect(product.discount_percentage).toEqual(0);
      expect(product.name).toEqual("product");
      expect(product.stock).toEqual(10);
    }
  });
});
