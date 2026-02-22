const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Fruits', 'Vegetables', 'Dairy', 'Grocery', 'Snacks']
    },
    stock: {
        type: Number,
        default: 0
    },
    images: [{
        type:
            String
    }],
    rating: {
        type: Number,
        default: 0
    }
},
    { timestamps: true });

module.exports = mongoose.model("products", productSchema);
