const express = require('express');
const Employee = require('../models/Employee.js');
const router = express.Router();

//API url: http://localhost:5000/employees

// GET all employees in database
router.get('/', (req, res) => {
	if(!req.query.search) {
		Employee.find({}, (err, allEmployees) => {
			if(err)
				return res.status(500).send(err);
			else if(allEmployees.length == 0)
				return res.status(404).json(allEmployees);
			else
				res.status(200).json(allEmployees);
		})
	} else {
		Employee.find({}, (err, employee) => {
			if(err)
				res.status(500).send();
			else if (employee.length == 0)
				res.status(404).send();
			else {
				let foundEmployees = [];
				employee.forEach((employee) => {
					if (employee._id.toString().includes(req.query.search) || employee.username.toString().includes(req.query.search))
						foundEmployees.push(employee);
				})
				if(foundEmployees.length == 0)
					res.status(404).send();
				else 
					res.status(200).json(foundEmployees);
			}
		})	
	}
});

// GET user by _id
router.get('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Employee.find(query, (err, employee) => {
		if(err)
			return res.status(404).send();
		else
			res.status(200).json(employee[0]);
	})
})

// POST new user
router.post('/', (req, res) => {
	//validate schema
	if(!req.body.username || !req.body.password)
		res.status(400).send();
	else
	{
		const newEmployee = {
			username: req.body.username,
			password: req.body.password,
			date: Date.now()
		}
		Employee.create(newEmployee, (err) => {
			if(err)
				return res.status(500).send(err);
			else
				res.status(200).send();
		})
	}
})

// PUT user by _id
router.put('/:user_id', (req, res) => {
	const query = {'_id': req.params.user_id};
	Employee.find(query, (err, result) => {
		if(err)
			return res.status(500).send();
		else
		{
			if(result.length == 0)
			{
				const newEmployee = {
					username: req.body.username,
					password: req.body.password,
					date: Date.now(),
					Order: []
				}
				Employee.create(newEmployee, (err1) => {
					if(err1) return res.status(500).send(err1);
					else res.status(200).send();
				})
			}
			else
			{
				const newVals = {$set:{username: req.body.username, password: req.body.password, date: Date.now()}};
				Employee.updateOne(query, newVals, (err2) => {
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
	Employee.find(query,(err,results) => {
		if (err)
			return res.status(500).send();
		else if(results.length == 0)
			return res.status(404).send();
		else
		{
			Employee.remove(query,(err2) => {
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