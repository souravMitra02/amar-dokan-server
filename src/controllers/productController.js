const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        const newProduct = new Product({ name, description, price, category, stock, images });
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product successfully added!",
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({ message: "Product addition failed!", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;
        let queryObject = {};

        if (search) {
            queryObject.name = { $regex: search, $options: "i" };
        }
        if (category && category !== "all") {
            queryObject.category = category;
        }

        let result = Product.find(queryObject);
        if (sort === "lowest") {
            result = result.sort("price");
        } else if (sort === "highest") {
            result = result.sort("-price");
        } else {
            result = result.sort("-createdAt"); 
        }

        const products = await result;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated!", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };