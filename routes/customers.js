const express = require('express');
const Customer = require('../models/Customer.js');
const router = express.Router();

//API url: http://localhost:5000/customers

// GET all customers in database
router.get('/', (req, res) => {
	if(!req.query.search) {
		Customer.find({}, (err, allCustomers) => {
			if(err)
				return res.status(500).send(err);
			else if(allCustomers.length == 0)
				return res.status(404).json(allCustomers);
			else
				res.status(200).json(allCustomers);
		})
	} else {
		Customer.find({}, (err, customers) => {
			if(err)
				res.status(500).send();
			else if (customers.length == 0)
				res.status(404).send();
			else {
				let foundCustomers = [];
				customers.forEach((customer) => {
					if (customer._id.toString().includes(req.query.search) || customer.username.toString().includes(req.query.search))
						foundCustomers.push(customer);
				})
				if(foundCustomers.length == 0)
					res.status(404).send();
				else 
					res.status(200).json(foundCustomers);
			}
		})	
	}
});

//GET all orders for a given customer
router.get('/:user_id/orders', (req, res) => {
	if(!req.query.search) {
		const query = {_id:req.params.user_id};
		Customer.find(query, (err, customer) => {
			if(err)
				return res.status(500).send(err);
			else if(customer.length == 0)
				return res.status(404).json();
			else 
				res.status(200).json(customer[0].orders);
		})
	} else {
		const query = {_id:req.params.user_id};
		Customer.find(query, (err, customer) => {
			if(err)
				return res.status(500).send(err);
			else if(customer.length == 0)
				return res.status(404).json();
			else
			{
				let orders = customer[0].orders;
				let foundOrders = [];
				orders.forEach((order) => {
					if (order._id.toString().includes(req.query.search) || order.menu_item.toString().includes(req.query.search))
						foundOrders.push(order);
				})
				if(foundOrders.length == 0)
					res.status(404).send();
				else 
					res.status(200).json(foundOrders);
			}
		})
	}
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
			orders: []
		}
		Customer.create(newCustomer, (err) => {
			if(err)
				return res.status(500).send(err);
			else
				res.status(200).send();
		})
	}
})

// POST new order for a given user
router.post('/:user_id/orders', (req, res) => {
	if(!req.body.menu_item)
		res.status(400).send();
	else {
		const query = {_id: req.params.user_id};
		let specReq;
		if(!req.body.special_requests) specReq = "none";
		else specReq = req.body.special_requests;
		const newOrder = {
			menu_item: req.body.menu_item,
			special_requests : specReq,
			status: "ordered",
			date: Date.now()
		}
		const newVals = {$push: {orders: newOrder} };
		Customer.findOneAndUpdate(query, newVals, (error) => {
			if(error) 
				res.status(500).send();
			else
			 	res.status(200).send();
		})
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

// GET order by _id
router.get('/:user_id/orders/:order_id', (req, res) => {
	const query = {_id:req.params.user_id};
		Customer.find(query, (err, customer) => {
			if(err)
				return res.status(500).send(err);
			else if(customer.length == 0)
				return res.status(404).json();
			else
			{
				let orders = customer[0].orders;
				var counter = 0;
				//iterate through the orders to find the corresponding one
				orders.forEach((order) => {
					if (order._id.toString() === req.params.order_id)
					{
						counter = 1;
						res.send(order);
					}
				})

				//if the specified order_id didn't match any results
				if(counter === 0)
					res.status(404).send();
			}
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

// GET order by _id
router.put('/:user_id/orders/:order_id', (req, res) => {
	if(!req.body.menu_item)
		res.status(400).send();
	else
	{
		const query = {_id:req.params.user_id};
		Customer.find(query, (err, customer) => {
			if(err)
				return res.status(500).send(err);
			else if(customer.length == 0)
				return res.status(404).json();
			else
			{
				let orders = customer[0].orders;
				var counter = 0;
				//iterate through the orders to find the corresponding one
				orders.forEach((order) => {
					if (order._id.toString() === req.params.order_id)
					{
						counter = 1;
						order.menu_item = req.body.menu_item;
						customer[0].save();
						res.status(200).send();
					}
				})

				//if the specified order_id didn't match any results
				if(counter === 0)
				{
					// const query2 = {_id: req.params.user_id};
					const newOrder = {
						menu_item: req.body.menu_item,
						special_requests : specReq,
						status: "ordered",
						date: Date.now()
					}
					const newVals = {$push: {orders: newOrder} };
					Customer.findOneAndUpdate(query, newVals, (error) => {
						if(error) 
							res.status(500).send();
						else
							res.status(200).send();
					})
				}
			}
		})
	}
})

// DELETE user by _id
router.delete('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query,(err,results) => {
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

// DELETE an order for a given _id
router.delete('/:user_id/orders/:order_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Customer.find(query,(err,results) => {
		if (err)
			return res.status(500).send();
		else if(results.length == 0)
			return res.status(404).send();
		else
		{
			var orders = results[0].orders;
			//get the index of the specified order_id
			const removeIndex = orders.findIndex(function(item) {
				return String(item._id) === req.params.order_id;
			});
			//remove the element from the array only if the removeIndex is valid
			if(removeIndex !== -1)
			{
				orders.splice(removeIndex, 1);
				results[0].save();
				res.status(201).send();
			}
			//otherwise send a 400 if the specified order_id doesn't exist
			else
				res.status(400).send();
		}
	})
})

module.exports = router;