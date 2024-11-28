import { Request, Response } from "express";
import productModel from "../models/product.model";
import { Product } from "@prisma/client";

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.fetchAllProducts();
        if (!products) {
            res.status(404).json({ error: `fail to fetch products.` })
            return
        }
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Unable to get all products."
        })
    }
}

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await productModel.fetchProduct(id)
        if (!product) {
            res.status(404).json({ error: `product does not exist.` })
            return
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Unable to get the product."
        })
    }
}

const addProducts = async (req: Request, res: Response) => {
    try {
        const { productName, price } = req.body
        const newProduct = await productModel.createProduct({
            productName,
            price
        })
        res.status(200).json(newProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Unable to add product."
        })
    }
}

const updateProductById = async (req: Request<{ id: string }, {}, Omit<Product, 'id'>>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { productName, price } = req.body
        const updatedProduct = await productModel.updateProduct(id, { productName, price })
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Unable to update the product."
        })
    }
}

const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const deletedProduct = await productModel.deleteProduct(id)
        res.status(200).json(deletedProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Unable to delete the product."
        })
    }
}

export default {
    getAllProducts,
    getProductById,
    addProducts,
    updateProductById,
    deleteProductById
}