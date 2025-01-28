import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, 
{
    timestamps: true//createdAt, updatedAt
});

const Product = mongoose.model('Product', productSchema);
//here used capital letter so mongoose automatically converts to products, lowercase and plural

export default Product;