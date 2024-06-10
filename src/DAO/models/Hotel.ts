import mongoose from 'mongoose';
import { Hotel } from '../intefaces/companyInter';


// Mongoose Schema Definition
const pricePerNightSchema = new mongoose.Schema({
  typ: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, required: true }
});

/**
 * Represents the schema for a hotel.
 */
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true ,index: true},
  roomTypes: { type: [String], required: true },
  // breakfastIncluded: { type: Boolean, required: true },
  pricePerNight: { type: [pricePerNightSchema], required: true },
}, 
{
  collection: "HOTELS"
});

// Exporting the Model
const HotelModel = mongoose.model<Hotel>('Hotel', hotelSchema);
export default HotelModel;