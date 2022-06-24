const express = require("express");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const Mongo = require('./mongodb.js')
var mongo = new Mongo();

mongo.test().then(client=>{
    client.db('katsu').collection('Stocks1').rename('Stocks',()=>{})
})

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.listen(5000,() =>{
    console.log("Server hosted on port 5000")
})
    
