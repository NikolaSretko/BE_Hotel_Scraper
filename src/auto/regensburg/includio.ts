import cron from 'node-cron';
import { ScraperService } from '../../service';
import { includioConfig } from '../../DAO/additionalDataConfig';

/**
 * Runs a scraping job at specified times using cron scheduling.
 * Scrapes data from the service, fills additional details, and saves the data to the database.
 */

const includio = () => {
    // Definieren der Zeiten, zu denen der Scraping-Job ausgeführt werden soll
    const times = ['0 5 * * *', '0 20 * * *'];
    // Maximale Anzahl der Versuche, um eine Endlosschleife zu vermeiden
    const maxAttempts = 5;

    // Funktion, die den Scraper ausführt und die Daten speichert
    const retryScrapeAndSave = async (): Promise<void> => {
        // Schleife für die Anzahl der Versuche
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                console.log(`Scraping attempt ${attempt} at ${new Date()}`);
                // Daten scrapen
                const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();

                // Überprüfen, ob die gescrapten Daten leer sind
                if (!scrapedHotelData || Object.keys(scrapedHotelData).length === 0) {
                    throw new Error('Scraped data is empty.');
                }

                // Zusätzliche Daten hinzufügen
                const hotelData = {
                    ...scrapedHotelData,
                    ...includioConfig
                };

                // Daten in die Datenbank speichern
                const savedHotel = await ScraperService.postIncludio.post(hotelData);

                // Überprüfen, ob die gespeicherten Daten leer sind
                if (!savedHotel || Object.keys(savedHotel).length === 0) {
                    throw new Error('Saved hotel data is empty.');
                }

                console.log('Saved hotel data:', savedHotel);
                // Erfolgreiches Ende der Funktion, wenn die Daten gespeichert wurden
                return; // Aus der Schleife und Funktion austreten

            } catch (error) {
                // Fehlerbehandlung und Loggen des Fehlers
                console.error(`Attempt ${attempt} failed:`, error);
                // Wenn die maximale Anzahl der Versuche erreicht ist, den Fehler werfen
                if (attempt === maxAttempts) {
                    console.error('Max attempts reached. Failed to scrape and save data.');
                    throw error;
                }
                // Warten, bevor der nächste Versuch gestartet wird
                await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds before retrying
            }
        }
    };

    // Definieren der Cron-Jobs für die angegebenen Zeiten
    times.forEach(time => { 
        cron.schedule(time, async () => {
            try {
                // Ausführen der Scraping- und Speicherlogik
                await retryScrapeAndSave();
            } catch (error) {
                // Fehlerbehandlung, wenn der Cron-Job fehlschlägt
                console.error('Fehler beim automatisierten Scrapen der Website:', error);
            }
        });
    });
};

export default includio;