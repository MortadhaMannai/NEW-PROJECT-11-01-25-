"use strict";
// Using playwright to scrape the data from the website urls
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = scrape;
const playwright_1 = __importDefault(require("playwright"));
const text_splitter_1 = require("langchain/text_splitter");
function scrape(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Scrape the text from the website
        const browser = yield playwright_1.default.chromium.launch();
        const context = yield browser.newContext();
        const page = yield context.newPage();
        yield page.goto(url);
        const text = yield page.innerText("body");
        text.replace(/\n/g, " ");
        yield browser.close();
        // Split the text into chunks
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 512,
            chunkOverlap: 100,
        });
        const output = yield splitter.createDocuments([text]);
        return output;
    });
}
//# sourceMappingURL=scrape.js.map