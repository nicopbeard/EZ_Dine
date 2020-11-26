const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const menuSchema = new mongoose.Schema({
    Appetizers : [{
        item : String,
        price : Number
    }],
    Entrees : [{
        item : String,
        price : Number
    }],
    Drinks : [{
        item : String,
        price : Number
    }],
    Desserts : [{
        item : String,
        price : Number
    }]
 });


const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;