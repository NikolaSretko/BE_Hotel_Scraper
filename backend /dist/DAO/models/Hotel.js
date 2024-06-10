"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose Schema Definition
const pricePerNightSchema = new mongoose_1.default.Schema({
    typ: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    date: { type: Date, required: true }
});
/**
 * Represents the schema for a hotel.
 */
const hotelSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, index: true },
    roomTypes: { type: [String], required: true },
    // breakfastIncluded: { type: Boolean, required: true },
    pricePerNight: { type: [pricePerNightSchema], required: true },
}, {
    collection: "HOTELS"
});
// Exporting the Model
const HotelModel = mongoose_1.default.model('Hotel', hotelSchema);
exports.default = HotelModel;
