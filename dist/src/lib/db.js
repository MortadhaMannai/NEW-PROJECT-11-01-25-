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
exports.createCollection = createCollection;
exports.uploadData = uploadData;
exports.queryDatabase = queryDatabase;
const astra_db_ts_1 = require("@datastax/astra-db-ts");
const client = new astra_db_ts_1.DataAPIClient('AstraCS:qFmoALDsbMZZJjPjAHtQBQgu:982d22df5ecb283b52bde19720d472db59e6843b92289d05fe7517e3c58ee340');
const db = client.db('qFmoALDsbMZZJjPjAHtQBQgu');
const collection = db.collection('f1gpt');
function createCollection() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db.createCollection("f1gpt", {
            vector: {
                dimension: 1536,
                metric: "dot_product"
            }
        });
        return res;
    });
}
function uploadData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield collection.insertMany(data);
    });
}
function queryDatabase(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield collection.find(null, {
            sort: {
                $vector: query
            },
            limit: 10
        }).toArray();
        return res;
    });
}
//# sourceMappingURL=db.js.map