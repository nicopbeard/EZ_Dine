const express = require('express');
const Employee = require('../models/Menu.js');
const router = express.Router();

//API url: http://localhost:5000/api/menu

//get appetizers
router.get('/appetizers', (req, res) => {
	// TODO: Check for search query i.e. employees?search=query 
	Employee.find({}, (err, appetizer) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(appetizer.length == 0)
			return res.status(404).json(appetizer);
		else
			res.status(200).json(appetizer);
	})
});

//get entrees
router.get('/entrees', (req, res) => {
	// TODO: Check for search query i.e. employees?search=query 
	Employee.find({}, (err, entree) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(entree.length == 0)
			return res.status(404).json(entree);
		else
			res.status(200).json(entree);
	})
});

//get drinks
router.get('/drinks', (req, res) => {
	// TODO: Check for search query i.e. employees?search=query 
	Employee.find({}, (err, drink) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(drink.length == 0)
			return res.status(404).json(drink);
		else
			res.status(200).json(drink);
	})
});

//get dessert
router.get('/dessert', (req, res) => {
	// TODO: Check for search query i.e. employees?search=query 
	Employee.find({}, (err, dessert) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(dessert.length == 0)
			return res.status(404).json(dessert);
		else
			res.status(200).json(dessert);
	})
});

//create appetizer
router.post('/appetizers', (req, res) => {
    // TODO: checkSchema function
    //create an order id
    var appetizerId = Math.floor(
        Math.random() * (999999 - 100000) + 100000
    );

	const newAppetizer = {
		appetizerId: appetizerId,
		item: req.body.item,
		price: req.body.price
    }
    
	Employee.create(newAppetizer, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

//create entree
router.post('/entrees', (req, res) => {
	// TODO: checkSchema function
	const newEntree = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now()
	}
	Employee.create(newEntree, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

//create drink
router.post('/drinks', (req, res) => {
	// TODO: checkSchema function
	const newDrink = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now()
	}
	Employee.create(newDrink, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

//create dessert
router.post('/desserts', (req, res) => {
	// TODO: checkSchema function
	const newDessert = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now()
	}
	Employee.create(newDessert, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

module.exports = router;