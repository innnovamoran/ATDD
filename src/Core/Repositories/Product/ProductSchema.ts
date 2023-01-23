import { Schema, model } from "mongoose";

export type TProduct = {
  bar_code: string;
  name: string;
  stock: number;
  discount_percentage: number;
};

export default model(
  "Product",
  new Schema<TProduct>({
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
      min: [0, "Mínimo de stock debe ser mayor a 0"],
      default: 0,
    },
    discount_percentage: {
      type: "number",
      required: false,
      min: 0,
      default: 0,
    },
  })
);

/** queda para escalar productos perecibles y con fecha de caducidad */
