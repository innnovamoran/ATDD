import { Schema, model } from "mongoose";

export type TProduct = {
  bar_code: String;
  name: String;
  stock: Number;
  discount_percentage: Number;
  price: Number;
};

export default model(
  "Product",
  new Schema<TProduct>(
    {
      bar_code: {
        type: "string",
        required: [true, "Código de barra es requerido"],
      },
      name: {
        type: "string",
        required: [true, "Nombre de producto es requerido"],
      },
      stock: {
        type: "number",
        required: false,
        min: [1, "Mínimo de stock debe ser mayor a 0"],
        default: 1,
      },
      discount_percentage: {
        type: "number",
        required: false,
        min: 0,
        default: 0,
      },
      price: {
        type: "number",
        required: false,
        min: [1, "Mínimo de valor debe ser mayor a 0"],
        default: 1,
      },
    },
    { autoCreate: true, bufferCommands: false, collection: "Products" }
  )
);

/** queda para escalar productos perecibles y con fecha de caducidad */
