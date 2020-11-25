const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const customerSchema = new mongoose.Schema({
    username : {type : String},
    password : {type : String, required : true},
    date : Date,
    orders : [new Schema({
        menu_item : String,
        date : Date
    })]
 });


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;