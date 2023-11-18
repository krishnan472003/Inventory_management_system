import { Schema } from "mongoose";
import mongoose from "mongoose";

const orgSchema = new Schema(
  {
    name: { type: String, required: true },
    admins: { type: [String] },//adminId of admins
    stores: { type: [String] }, // storeId of stores
    orgId: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model('organization', orgSchema);

