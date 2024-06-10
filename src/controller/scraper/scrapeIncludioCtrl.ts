import { Request, Response } from 'express';
import { ScraperService } from '../../service/index';
import { includioConfig } from '../../DAO/additionalDataConfig';

/**
 * Controller function to scrape data from the Includio service and save it to the database.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the scraping and saving is complete.
 */

export const scrapeIncludioCtrl = {
    async scrape(_:Request, res: Response) {
        try {
            // Scrape data from the services
            const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();
            
            // Fill additional details as needed
            const hotelData = {
                ...scrapedHotelData,
                ...includioConfig
            };

            console.log("/CTRL/ Hotel-Details", scrapedHotelData);

            // Save to database
            const savedHotel = await ScraperService.postIncludio.post(hotelData);
            res.json({ success: true, savedHotel });
        } catch (error) {
            const typedError = error as Error;
            console.error('Fehler beim Scrapen der Website:', typedError);
            res.status(500).json({ error: 'Fehler beim Scrapen der Website', details: typedError.message });
        }
    }
};