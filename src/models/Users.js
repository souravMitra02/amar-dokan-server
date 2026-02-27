const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    number: { 
        type: Number, 
        required: false 
    },
    password: { 
        type: String, 
        required: false 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'],
        default: 'user' 
    },
    image: { 
        type: String, 
        default: "" 
    }
}, { 
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);