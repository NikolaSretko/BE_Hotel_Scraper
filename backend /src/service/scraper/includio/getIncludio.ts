import puppeteer from 'puppeteer';
import { HotelDetails} from './includioInterfaces';
import { utils } from './utils/index';



/**
 * Scrapes hotel data from a website and returns the details.
 * @returns A promise that resolves to an object containing the hotel details.
 */

export const getIncludio = {
    scrapeAndReturn: async (): Promise<HotelDetails> => {
        const url = utils.generateUrl();

        try {
            const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            const result = await page.evaluate(() => {
                const priceElements = document.querySelectorAll('.grid-item');
                return Array.from(priceElements).map(priceElement => {
                    const element = priceElement as HTMLElement;
                    let inseratText = element ? element.innerText : 'Preis nicht gefunden';
                    return {
                        inseratText
                    };
                });
            });

            await browser.close();

            const processedPrices = result.map(item => utils.processScrapedData(item.inseratText));

            const hotelData: HotelDetails = {
                pricePerNight: processedPrices,
                pricePerNightFuture: []
            };
            
            return hotelData;
        } catch (error) {
            const typedError = error as Error;
            console.error('Error during scraping data:', typedError);
            throw new Error('Scraping data failed: ' + typedError.message);
        }
    }
};
