"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
// Laden der Umgebungsvariablen aus der .env-Datei
dotenv_1.default.config();
// Funktion zum Starten des Servers
const startServer = async () => {
    try {
        // Verbindung zu MongoDB herstellen mit dbName Option
        const dbOptions = {
            dbName: process.env.DB_NAME, // Den Datenbanknamen aus den Umgebungsvariablen laden
        };
        await mongoose_1.default.connect(process.env.MONGODB_URL, dbOptions);
        console.log('Connected to MongoDB');
        // Server starten
        const PORT = parseInt(process.env.PORT, 10) || 8080;
        app_1.app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
startServer();
