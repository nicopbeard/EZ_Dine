const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({
    username : {type : String, unique : true},
    password : {type : String, required : true},
    date : Date,
    Order : [{
        order_id : Number,
        menu_item : String,
        date : Date
    }]
 });


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;