"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./lib/db");
const openai_1 = require("./lib/openai");
const scrape_1 = require("./lib/scrape");
const urls = [
    "https://en.wikipedia.org/wiki/Formula_One",
    "https://en.wikipedia.org/wiki/George_Russell_(racing_driver)",
];
function ingest() {
    return __awaiter(this, void 0, void 0, function* () {
        let chunks = [];
        yield (Promise.all(urls.map((url) => __awaiter(this, void 0, void 0, function* () {
            let data = yield (0, scrape_1.scrape)(url);
            const embeddings = yield Promise.all(data.map((doc, index) => __awaiter(this, void 0, void 0, function* () {
                const embedding = yield (0, openai_1.generateEmbedding)(doc.pageContent);
                return embedding;
            })));
            chunks = chunks.concat(data.map((doc, index) => {
                return {
                    text: doc.pageContent,
                    $vector: embeddings[index].data[0].embedding,
                    url: url
                };
            }));
        }))));
        yield (0, db_1.createCollection)();
        yield (0, db_1.uploadData)(chunks.map((doc, index) => {
            return {
                $vector: doc.$vector,
                text: doc.text,
                source: doc.url
            };
        }));
    });
}
ingest();
//# sourceMappingURL=ingest.js.map