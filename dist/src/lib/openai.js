"use strict";
// Generate vector embeddings using the openai api
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
exports.generateEmbedding = generateEmbedding;
exports.generateResponse = generateResponse;
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: "API KEY",
});
function generateEmbedding(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const embedding = yield client.embeddings.create({
            model: "text-embedding-ada-002",
            input: text
        });
        return embedding;
    });
}
function generateResponse(question, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                    role: "user",
                    content: `You are an expert in Formula 1 racing.
      You need to answer this question using the context provided.
      Do not mention that you have been provided with the context.
      QUESTION: ${question}.
      `
                }]
        });
        return response.choices[0].message.content;
    });
}
//# sourceMappingURL=openai.js.map