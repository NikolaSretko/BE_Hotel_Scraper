import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { CompanyDocument, CompanyModel } from "../intefaces/companyInter"; // assuming the interfaces file is named "interfaces.ts"

// Definiere das Interface für Settings
const companySchema = new Schema<CompanyDocument, CompanyModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    website: { type: String },
    observerdHotels: { type: Map, of: String, default: {} },
    settings: {
      darkMode: { type: Boolean, default: false },
      hotelColors: { type: Map, of: String, default: {} },
      viewInDashboard: { type: String, default: "" },
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    sixDigitCode: {
      type: String,
      default: () => Math.random().toString().slice(2, 8),
    },
  },
  { collection: "company" }
);

companySchema.methods.toProfileInfo = function () {
  return {
    username: this.username,
    email: this.email,
    company: this.company,
    Idqrcode: this.qrcode,
    phonenumber: this.phonenumber,
    website: this.website,
    _id: this._id,
    observerdHotels: this.observerdHotels,
    settings: this.settings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    sixDigitCode: this.sixDigitCode,
  };
};

companySchema.pre<CompanyDocument>("save", async function () {
  const user = this;

  if (user.isModified("email")) {
    user.email = user.email.toLowerCase();
  }
  if (user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
});

companySchema.statics.findByEmail = function (email: string) {
  if (typeof email !== "string") return null;
  return this.findOne({ email: email.toLowerCase() });
};

const Company = mongoose.model<CompanyDocument, CompanyModel>("Company", companySchema);
export default Company;