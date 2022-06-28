const express = require("express");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const Mongo = require('./mongodb.js')
var mongo = new Mongo();



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))
app.use(express.static('dist'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.get('/admin',(req,res)=>{
	res.sendFile(__dirname+"/public/pages/admin.html")
})

app.get('/admin/*',(req,res)=>{
	res.sendFile(__dirname+"/public/pages/admin.html")
})

app.get('/api/stocks/list',(req,res)=>{
	mongo.listStocks().then((docs)=>{
		res.status(200);
		res.send(docs);
	})
})

app.get('/api/stocks/add',(req,res)=>{
	let { itemName, itemCode, stocks, stockUnit, itemType } = req.query;
	console.log(itemName, itemCode, stocks, stockUnit, itemType)
	if(!(itemName || itemCode || stocks || stockUnit || itemType)){
		res.status(204);
		res.end();
		return;
	}
	mongo.addStock(itemName, itemCode, stocks, stockUnit, itemType).then(()=>{
		res.status(200);
		res.end();
	})
})

app.listen(5000,() =>{
    console.log("Server hosted on port 5000")
})
    
