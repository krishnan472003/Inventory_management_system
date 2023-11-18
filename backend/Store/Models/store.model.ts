import { Schema } from "mongoose";
import mongoose from "mongoose";

const storeSchema = new Schema(
  {
    name: { type: String, required: true },
    users: { type: [String] },//userId of stores
    products: { type: [Object] }, // storeId of stores
    orgId: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Store = mongoose.model('store', storeSchema);

