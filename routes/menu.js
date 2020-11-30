const express = require('express');
const Menu = require('../models/Menu.js');
const router = express.Router();

//API url: http://localhost:5000/menu

//get entire menu
router.get('/', (req, res) => {
    if(!req.query.search) {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
                res.status(200).json(menuItems);
        })
	} else {
		Menu.find({}, (err, menus) => {
			if(err)
				res.status(500).send();
			else if (menus.length == 0)
				res.status(404).send();
			else {
				let foundMenus = [];
				menus.forEach((menu) => {
					if (menu._id.toString().includes(req.query.search) || menu.price.toString().includes(req.query.search) || menu.description.toString().includes(req.query.search) || menu.class.toString().includes(req.query.search))
						foundMenus.push(menu);
				})
				if(foundMenus.length == 0)
					res.status(404).send();
				else 
					res.status(200).json(foundMenus);
			}
		})	
	}
});

//get appetizers
router.get('/appetizers', (req, res) => {
	if(!req.query.search) {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let appetizers = [];
                menuItems.forEach((item) => {
                    if(item.class === "appetizer")
                        appetizers.push(item);
                })
                if(appetizers.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(appetizers);
            }
        })
	} else {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let appetizers = [];
                menuItems.forEach((item) => {
                    if(item.class === "appetizer" && (item.description.includes(req.query.search) || item.item.includes(req.query.search)))
                        appetizers.push(item);
                })
                if(appetizers.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(appetizers);
            }
        })
	}
});

//get entrees
router.get('/entrees', (req, res) => {
	if(!req.query.search) {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let entrees = [];
                menuItems.forEach((item) => {
                    if(item.class === "entree")
                        entrees.push(item);
                })
                if(entrees.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(entrees);
            }
        })
	} else {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let entrees = [];
                menuItems.forEach((item) => {
                    if(item.class === "entree" && (item.description.includes(req.query.search) || item.item.includes(req.query.search)))
                        entrees.push(item);
                })
                if(entrees.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(entrees);
            }
        })
	}
});

//get beverages
router.get('/beverages', (req, res) => {
	if(!req.query.search) {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let beverages = [];
                menuItems.forEach((item) => {
                    if(item.class === "beverage")
                        beverages.push(item);
                })
                if(beverages.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(beverages);
            }
        })
	} else {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let beverages = [];
                menuItems.forEach((item) => {
                    if(item.class === "beverage" && (item.description.includes(req.query.search) || item.item.includes(req.query.search)))
                        beverages.push(item);
                })
                if(beverages.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(beverages);
            }
        })
	}
});

//get dessert
router.get('/dessert', (req, res) => {
	if(!req.query.search) {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let desserts = [];
                menuItems.forEach((item) => {
                    if(item.class === "dessert")
                        desserts.push(item);
                })
                if(desserts.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(desserts);
            }
        })
	} else {
		Menu.find({}, (err, menuItems) => {
            if(err)
                return res.sendStatus(500).send(err);
            else if(menuItems.length == 0)
                return res.status(404).json(menuItems);
            else
            {
                let desserts = [];
                menuItems.forEach((item) => {
                    if(item.class === "dessert" && (item.description.includes(req.query.search) || item.item.includes(req.query.search)))
                        desserts.push(item);
                })
                if(desserts.length == 0)
                    res.status(404).send();
                else 
                    res.status(200).json(desserts);
            }
        })
	}
});

//create new menu item
router.post('/', (req, res) => {
    if(!req.body.item || !req.body.price || !req.body.description || !req.body.class)
        res.status(400).send();
    else
    {
        const newItem = {
            item: req.body.item,
            price: req.body.price,
            description: req.body.description,
            class: req.body.class
        }
        Menu.create(newItem, (err, result) => {
            if(err)
                return res.status(500).send(err);
            else
                res.status(200).send();
        })
    }
})

// PUT user by _id
router.put('/:_id', (req, res) => {
	const query = {'_id': req.params._id};
	Menu.find(query, (err, result) => {
		if(err)
			return res.status(500).send();
		else
		{
			if(result.length == 0)
			{
				const newMenu = {
					item: req.body.item,
					price: req.body.price,
					description: req.body.description,
					class: req.body.class
				}
				Menu.create(newMenu, (err1) => {
					if(err1) return res.status(500).send(err1);
					else res.status(200).send();
				})
			}
			else
			{
				const newVals = {$set:{item: req.body.item, price: req.body.price, description: req.body.description, class: req.body.class}};
				Menu.updateOne(query, newVals, (err2) => {
					if(err2) return res.status(500).send(err2);
					else res.status(200).send();
				})
			}
		}
	})
})

// DELETE user by _id
router.delete('/:_id', (req, res) => {
	const query = {'_id': req.params._id};
	Menu.find(query,(err,results) => {
		if (err)
			return res.status(500).send();
		else if(results.length == 0)
			return res.status(404).send();
		else
		{
			Menu.remove(query,(err2) => {
				if(err2)
					return res.status(500).send();
				else
					res.status(200).send();
			})
		}
	})
})

module.exports = router;