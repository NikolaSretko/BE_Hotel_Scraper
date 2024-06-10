"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrl = void 0;
const dateFormatter_1 = require("../../../../utils/dateFormatter");
// Funktion zum Generieren der URL mit aktuellen Daten
const generateUrl = () => {
    const currentDate = new Date();
    const arrivalDate = (0, dateFormatter_1.formatDate)(currentDate);
    const departureDate = new Date();
    departureDate.setDate(currentDate.getDate() + 1); // Abreisedatum einen Tag später
    const formattedDepartureDate = (0, dateFormatter_1.formatDate)(departureDate);
    return `https://onepagebooking.com/includio?arrival=${arrivalDate}&departure=${formattedDepartureDate}&lang=de&adults=1&rooms=1&children=0`;
};
exports.generateUrl = generateUrl;
