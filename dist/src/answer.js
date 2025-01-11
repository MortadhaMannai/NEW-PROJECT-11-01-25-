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
function askQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const embedding = yield (0, openai_1.generateEmbedding)(question);
        const queryRes = yield (0, db_1.queryDatabase)(embedding.data[0].embedding);
        const response = yield (0, openai_1.generateResponse)(question, queryRes.map((doc) => doc.text));
        return response;
    });
}
askQuestion("Why are George Russell and Max Verstappen arguing after Qatar 2024 ?").then((res) => {
    console.log(res);
});
//# sourceMappingURL=answer.js.map