const express = require('express');
const Customer = require('../models/Employee.js');
const router = express.Router();

router.get('/', (req, res) => {
	const customers = [
		{id: 1, firstName: 'John', lastName: 'Doe'},
		{id: 2, firstName: 'Brad', lastName: 'Traversy'},
		{id: 3, firstName: 'Mary', lastName: 'Swanson'},
	];

	res.json(customers);
});

module.exports = router;