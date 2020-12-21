import * as mongoose from 'mongoose';
 /* 
    Moongose model definition
 */
const productModel = new mongoose.Schema({
    productName: String,
    cost: Number,
    price: Number,
    idealStock: Number,
    minimunStock: Number
})

export const Product = mongoose.model('Product',productModel,'Product')

