"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const scraperRoutes_1 = __importDefault(require("./routes/scraper/scraperRoutes"));
const index_1 = __importDefault(require("./auto/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// Middleware konfigurieren
app.use((0, cors_1.default)());
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [process.env.SESSION_KEY || 'default_key'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Automatischdes Scrapen
index_1.default.regensburg.includio();
// Routen definieren
app.use('/api/scrape', scraperRoutes_1.default);
