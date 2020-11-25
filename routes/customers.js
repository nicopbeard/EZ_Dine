const express = require('express');
const Customer = require('../models/Customer.js');
const router = express.Router();

//API url: http://localhost:5000/api/customers

// GET all customers in database
router.get('/', (req, res) => {
	//check for search query
	// if(req.search.query)
	// {
	// 	Customer.find(function(err, customers){
	// 		//variable to store results to send
	// 		var retCustomers = [];
	// 		//counter to check if the specified query matches any info in the Customers collection
	// 		var counter = 0;
	// 		for(var i = 0; i < customers.length; i++)
	// 		{
	// 		  if(customers[i].username.includes(req.query.search))
	// 		  {
	// 			counter = 1;
	// 			retCustomers.push(films[i]);
	// 		  }
	// 		}
	// 		//if the specified query doesn't match any information within the customers array, send a 400 response
	// 		if(counter === 0)
	// 		  res.status(400).send();
	// 		//otherwise, send retCustomers with the corresponding customer entries
	// 		else
	// 		  res.send(retCustomers);
	// 	  });
	// }
	// else//otherwise return all customers
	// {
		Customer.find({}, (err, allCustomers) => {
			if(err)
				return res.sendStatus(500).send(err);
			else if(allCustomers.length == 0)
				return res.status(404).json(allCustomers);
			else
				res.status(200).json(allCustomers);
		})
	//}
});

//GET all orders for a given customer
router.get('/:user_id/orders', (req, res) => {
	//check for search query
	// if(req.search.query)
	// {
	// 	Customer.find(function(err, customers){
	// 		//variable to store results to send
	// 		var retCustomers = [];
	// 		//counter to check if the specified query matches any info in the Customers collection
	// 		var counter = 0;
	// 		for(var i = 0; i < customers.length; i++)
	// 		{
	// 		  if(customers[i].username.includes(req.query.search))
	// 		  {
	// 			counter = 1;
	// 			retCustomers.push(films[i]);
	// 		  }
	// 		}
	// 		//if the specified query doesn't match any information within the customers array, send a 400 response
	// 		if(counter === 0)
	// 		  res.status(400).send();
	// 		//otherwise, send retCustomers with the corresponding customer entries
	// 		else
	// 		  res.send(retCustomers);
	// 	  });
	// }
	// else//otherwise return all customers
	// {
		//find the specified customer
		Film.findOne({_id: req.params.user_id}, function(err, customer) {
			//if the customer doesn't exist, send a 400 response
			if(!customer)
			  res.status(400).send();
			else//otherwise, return the corresponding orders for the customer
			{
			  //return all the orders
			  res.send(customer.Order);
			}
		  });
	//}
});

// POST new user
router.post('/', (req, res) => {
	//validate schema
	if(!req.body.username || !req.body.password)
		res.status(400).send();
	else
	{
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
	}
})

// POST new order for a given user
router.post('/:user_id/orders', (req, res) => {
	//validate schema
	if(!req.body.menu_item)
		res.status(400).send();
	else
	{
		//find the specified customer
		Customer.findOne({_id: req.params.user_id}, function(err, customer) {
			//if the customer doesn't exist, send a 400 response
			if(!customer)
			  res.status(400).send();
			else//otherwise, update the review for the corresponding customer
			{
			  //create an order id
			  var orderId = Math.floor(
				Math.random() * (999999 - 100000) + 100000
			  );
			  //create the order
			  const order = {
				order_id : orderId,
				menu_item : req.body.menu_item,
				date : Date.now()
			  };
			  //post the order to the corresponding customer
			  Customer.findOneAndUpdate({_id: req.params.user_id}, {$push: {Orders: order}}, {safe: true, upsert: true}, function(err, orders) {
				res.status(201).send();
			  });
			}
		});
	}
})

// GET user by _id
router.get('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query, (err, customer) => {
		if(err)
			return res.status(404).send();
		else
			res.status(200).json(customer[0]);
	})
})

// PUT user by _id
router.put('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query, (err, result) => {
		if(err)
			return res.status(500).send();
		else
		{
			if(result.length == 0)
			{
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
			}
			else
			{
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
		if (err)
			return res.status(500).send();
		else if(results.length == 0)
			return res.status(404).send();
		else
		{
			Customer.remove(query,(err2) => {
				console.log(err2);
				if(err2)
					return res.status(500).send();
				else
					res.status(200).send();
			})
		}
	})
})




module.exports = router;