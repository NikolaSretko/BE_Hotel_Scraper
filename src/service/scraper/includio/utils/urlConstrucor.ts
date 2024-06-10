import { formatDate } from "../../../../utils/dateFormatter";

// Funktion zum Generieren der URL mit aktuellen Daten
export const generateUrl = (): string => {
    const currentDate = new Date();
    const arrivalDate = formatDate(currentDate);

    const departureDate = new Date();
    departureDate.setDate(currentDate.getDate() + 1); // Abreisedatum einen Tag später
    const formattedDepartureDate = formatDate(departureDate);

    return `https://onepagebooking.com/includio?arrival=${arrivalDate}&departure=${formattedDepartureDate}&lang=de&adults=1&rooms=1&children=0`;
};

