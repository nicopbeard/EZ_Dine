const express = require('express');
const Customer = require('../models/Customer.js');
const router = express.Router();

router.get('/', (req, res) => {
	// TODO: Check for search query i.e. customers?search=query 
	Customer.find({}, (err, allCustomers) => {
		if(err) return res.sendStatus(500).send(err);
		else if (allCustomers.length == 0) return res.status(404).json(allCustomers);
		else res.status(200).json(allCustomers);
	})
});

router.post('/', (req, res) => {
	// TODO: checkSchema function 
	const newCustomer = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now(),
		Order: []
	}
	Customer.create(newCustomer, (err, result) => {
		if(err) return res.status(500).send(err);
		else  res.status(200).send();
	})
})


module.exports = router;
