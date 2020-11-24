const express = require('express');
const Customer = require('../models/Customer.js');
const router = express.Router();

//API url: http://localhost:5000/api/customers

// GET all customers in database
router.get('/', (req, res) => {
	// TODO: Check for search query i.e. customers?search=query 
	Customer.find({}, (err, allCustomers) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(allCustomers.length == 0)
			return res.status(404).json(allCustomers);
		else
			res.status(200).json(allCustomers);
	})
});

// POST new user
router.post('/', (req, res) => {
	// TODO: checkSchema function 
	const newCustomer = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now(),
		Order: []
	}
	Customer.create(newCustomer, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

// GET user by _id
router.get('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query, (err, customer) => {
		if(err) return res.status(404).send();
		else {
			res.status(200).json(customer[0]);
		}
	})
})

// PUT user by _id
router.put('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query, (err, result) => {
		if(err) return res.status(500).send();
		else {
			if(result.length == 0){
				const newCustomer = {
					username: req.body.username,
					password: req.body.password,
					date: Date.now(),
					Order: []
				}
				Customer.create(newCustomer, (err1) => {
					if(err1) return res.status(500).send(err1);
					else res.status(200).send();
				})
			} else {
				const newVals = {$set:{username: req.body.username, password: req.body.password, date: Date.now()}};
				Customer.updateOne(query, newVals, (err2) => {
					if(err2) return res.status(500).send(err2);
					else res.status(200).send();
				})
			}
		}
	})
})

// DELETE user by _id
router.delete('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query,(err,results) => {
		console.log(err);
		if (err) return res.status(500).send();
		else if (results.length == 0) return res.status(404).send();
		else {
			Customer.remove(query,(err2) => {
				console.log(err2);
				if(err2) return res.status(500).send();
				else res.status(200).send();
			})
		}
	})
})




module.exports = router;