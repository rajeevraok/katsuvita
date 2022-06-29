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
	res.sendFile(__dirname+"/public/pages/learn.html")
})

app.get('/orderconfirm',(req,res)=>{
	res.sendFile(__dirname+"/orderConfirm.html")
})


app.get('/admin/*',(req,res)=>{
	res.sendFile(__dirname+"/public/pages/admin.html")
})

app.get('/api/order/add',(req,res)=>{
	let orderID = Math.floor((Math.random() * 100) + 1);
	let { itemName, totalPriceInRs, /* receiptID, */ quantity,quantityUnit, purchaserEmail, purchaserName } = req.query;
	if((itemName || orderID || totalPriceInRs /* || receiptID */ || quantity ||quantityUnit || purchaserEmail || purchaserName))
		mongo.addOrder(itemName,orderID, totalPriceInRs, /* receiptID, */ quantity,quantityUnit, purchaserEmail, purchaserName).then(()=>{
			res.status(200)
			res.end();
		})
	else{
		res.status(204);
		res.end();
	}
	res.redirect("/orderconfirm")
})

app.get("/api/order/approval",(req,res)=>{
	let { orderID, approval } = req.query;
	if(approval=="true")
	approval = new Boolean(1);
	else
	approval = new Boolean(0);
	mongo.orderApproval(orderID, approval).then(()=>{
		res.status(200);
		res.end();
	})
})

app.get('/api/order/delete',(req,res)=>{
	let {orderID}= req.query;
	console.log(orderID)
	mongo.deleteOrder(orderID).then(()=>{
		res.end();
	})
})

app.get('/api/sales/list',(req,res)=>{
	mongo.listSales().then((docs)=>{
		res.send(docs);
	})
})

app.get('/api/stocks/list',(req,res)=>{
	mongo.listStocks().then((docs)=>{
		res.status(200);
		res.send(docs);
	})
})

app.get('/api/stocks/add',(req,res)=>{
	let { itemName, itemCode, stocks, stockUnit,pricePerUnit, itemType } = req.query;
	console.log(itemName, itemCode, stocks, stockUnit, pricePerUnit, itemType)
	if(!(itemName || itemCode || stocks || stockUnit || pricePerUnit || itemType)){
		res.status(204);
		res.end();
		return;
	}
	mongo.addStock(itemName, itemCode, stocks, stockUnit, pricePerUnit, itemType).then(()=>{
		res.status(200);
		res.end();
	})
})

app.get('/api/stocks/delete',(req, res)=>{
	let {itemCode} = req.query;
	mongo.deleteItem(itemCode).then(()=>{
		res.end();
	})
})

app.get('/api/stocks/change/name',(req,res)=>{
	let {itemCode,itemName} = req.query;
	mongo.changeStockName(itemCode,itemName).then(()=>{
		res.sendStatus(200);
	})
})
app.get('/api/stocks/change/stocks',(req,res)=>{
	let {itemCode,stocks} = req.query;
	mongo.changeStocks(itemCode,stocks).then(()=>{
		res.redirect('/admin/stocks');
	})
})
app.get('/api/stocks/change/ppu',(req,res)=>{
	let {itemCode,pricePerUnit} = req.query;
	console.log(pricePerUnit)
	mongo.changePricePerUnit(itemCode,pricePerUnit).then(()=>{
		res.redirect('/admin/stocks');
	})
})
app.get('/api/stocks/change/itemtype',(req,res)=>{
	let {itemCode,itemType} = req.query;
	mongo.changeStockType(itemCode,itemType).then(()=>{
		res.redirect('/admin/stocks');
	})
})

app.get('/api/sales/delete',(req, res)=>{
	let {orderID} = req.query;
	mongo.deleteOrder(orderID).then(()=>{
		res.end();
	})
})

app.listen(5000,() =>{
    console.log("Server hosted on port 5000")
})

