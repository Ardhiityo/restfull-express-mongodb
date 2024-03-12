const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name Required']
    },
    brand: {
        type: String,
        required: [true, 'Brand Required']
    },
    color: {
        type: String,
        required: [true, 'Color Required']
    },
    price: {
        type: String,
        required: [true, 'Price Required']
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;