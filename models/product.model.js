import mongoose from 'mongoose';

const product = new mongoose.Schema({
	product_name : {type : String, required : true},
	product_price : {type : String, required : true}
});

const Product = mongoose.model("Product",product);
export default Product;