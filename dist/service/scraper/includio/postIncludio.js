"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postIncludio = void 0;
// src/service/includio/postIncludio.ts
const Hotel_1 = __importDefault(require("../../../DAO/models/Hotel"));
/**
 * Saves hotel data to the database.
 * @param {HotelDetails} hotelData - The hotel data to be saved.
 * @returns {Promise<HotelDetails>} - The saved hotel data.
 * @throws {Error} - If there is an error while saving the data to the database.
 */
exports.postIncludio = {
    async post(hotelData) {
        try {
            const hotel = new Hotel_1.default(hotelData);
            const savedHotel = await hotel.save();
            return savedHotel.toObject(); // Verwendung von toObject für die Typisierung
        }
        catch (error) {
            const typedError = error;
            console.error('Fehler beim Speichern der Daten in der Datenbank:', typedError);
            throw new Error('Speichern der Daten in der Datenbank fehlgeschlagen: ' + typedError.message);
        }
    }
};
