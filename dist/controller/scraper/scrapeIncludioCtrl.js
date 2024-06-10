"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeIncludioCtrl = void 0;
const index_1 = require("../../service/index");
const additionalDataConfig_1 = require("../../DAO/additionalDataConfig");
/**
 * Controller function to scrape data from the Includio service and save it to the database.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the scraping and saving is complete.
 */
exports.scrapeIncludioCtrl = {
    async scrape(_, res) {
        try {
            // Scrape data from the services
            const scrapedHotelData = await index_1.ScraperService.getIncludio.scrapeAndReturn();
            // Fill additional details as needed
            const hotelData = {
                ...scrapedHotelData,
                ...additionalDataConfig_1.includioConfig
            };
            console.log("/CTRL/ Hotel-Details", scrapedHotelData);
            // Save to database
            const savedHotel = await index_1.ScraperService.postIncludio.post(hotelData);
            res.json({ success: true, savedHotel });
        }
        catch (error) {
            const typedError = error;
            console.error('Fehler beim Scrapen der Website:', typedError);
            res.status(500).json({ error: 'Fehler beim Scrapen der Website', details: typedError.message });
        }
    }
};
