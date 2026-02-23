const Product = require('../models/Product');


const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product successfully added!",
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({ message: "Product added problem!!", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Product not found!!", error: error.message });
    }
};

module.exports = { createProduct, getAllProducts };