"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Set up your server
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
//create server
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
//Routes
app.use('/api/products', product_routes_1.default);
//Start Server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}...`);
});
