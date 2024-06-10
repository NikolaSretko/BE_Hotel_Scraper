import { ScrapedPrice } from "../includioInterfaces";

export const processScrapedData = (inseratText: string): ScrapedPrice => { //  @TODO: regex matchen für alle möglen Daten oder bessere string-manipulation 
    const regex = /(DOPPELZIMMER\s+[A-Z\s+\-]+|FAMILIENZIMMER)\s*\n*\s*(\d+\s*m²)\s*\n*\s*ab\s*(\d+,\d{2})\s*€/;

    const parts = regex.exec(inseratText);

    const typ = parts ? parts[1].trim() : 'Typ nicht gefunden';
    const size = parts ? parts[2].trim() : 'Größe nicht gefunden';
    const price = parts ? parts[3].trim() : 'Preis nicht gefunden';
    const date = new Date();

    return {
        typ,
        size,
        price,
        date
    };
};