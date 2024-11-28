// Set up your server
import express from "express";
import dotenv from "dotenv"
import productRouter from "./routes/product.routes";
dotenv.config()

//create server
const app = express()

//middleware
app.use(express.json())

//Routes
app.use('/api/products', productRouter)

//Start Server
const PORT = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}...`)
})