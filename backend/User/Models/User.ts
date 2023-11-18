// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, required: true, default: 2 }, // Default value set to 2
    storeId: { type: String },
    orgId: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);

