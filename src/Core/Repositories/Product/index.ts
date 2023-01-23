import { Document, Types } from "mongoose";

import HandleErrorsMongose, {
  ErrorFromMongoose,
  Ierrors,
} from "../../../Helper/HandleErrorMongoose";

import ProductSchema, { TProduct } from "./ProductSchema";

export type ProductRepoResponse = Promise<Ierrors[] | TProduct>;

export const CreateProduct = async (product: TProduct): ProductRepoResponse => {
  try {
    const n_product = await (await ProductSchema.create(product)).save();
    return n_product.toObject();
  } catch (error) {
    return HandleErrorsMongose(error as ErrorFromMongoose);
  }
};

export const UpdateProduct = () => {};
export const DeleteProduct = () => {};
export const ActiveProduct = () => {};
export const GetAllProduct = () => {};
export const FindByIDProduct = () => {};
