import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import cors from 'cors';
import {connectDB} from './db.js';
import Product from "./models/product.model.js";
// import { v4 as uuidv4 } from 'uuid';


app.use(express.json());
app.use(cors());

app.use((req, res, next) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();}); // CORS middle-ware

app.get('/', (req, res) => {
  res.status(200).json({
  	message : "home page"
  });
});


app.post('/api/products', (req, res) => {
  const new_product = req.body;
  const new_item = new Product(new_product);

  try{
    new_item.save();

    res.status(201).json({
      message : "Successfully added a new product",
      product : new_item

    });
  }catch(error){
    res.status(404).json({
      message : error.message
    })
  }

});

app.get('/api/products',(req,res)=>{
  Product.find()
  .then(result=>{
    res.status(200).json(result);

      console.log(result[0])
  })
  .catch(err=>{
    res.status(404).json({message : err.message});
  })
});


app.delete('/api/products/:id',(req,res)=>{
  const {id} = req.params;

  Product.findByIdAndDelete(id)
  .then(result=>{
    res.status(200).json({ message : result})
  })
  .catch(err=>{
    res.status(500).json({ error : err.message})
  })
});


app.patch('/api/products/:id',(req,res)=>{
  const {id} = req.params;

  const updated_product = req.body;

  Product.findByIdAndUpdate(id,updated_product)
  .then(result=>{
    res.status(200).json({ message : updated_product})
  })
  .catch(err=>{
    res.status(500).json({ error : err.message})
  })
});




app.listen(port,()=>{
  connectDB();
  console.log(`surver is running on port -> https://localhost: ${port}`)
});