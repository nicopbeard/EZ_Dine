const express = require('express');
const Employee = require('../models/Employee.js');
const router = express.Router();

//API url: http://localhost:5000/api/employees
router.get('/', (req, res) => {
	// TODO: Check for search query i.e. employees?search=query 
	Employee.find({}, (err, allEmployees) => {
		if(err)
			return res.sendStatus(500).send(err);
		else if(allEmployees.length == 0)
			return res.status(404).json(allEmployees);
		else
			res.status(200).json(allEmployees);
	})
});

module.exports = router;
router.post('/', (req, res) => {
	// TODO: checkSchema function
	const newEmployee = {
		username: req.body.username,
		password: req.body.password,
		date: Date.now()
	}
	Employee.create(newEmployee, (err, result) => {
		if(err)
			return res.status(500).send(err);
		else
			res.status(200).send();
	})
})

module.exports = router;