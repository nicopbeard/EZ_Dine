const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const customerSchema = new mongoose.Schema({
    username : {type : String, required : true},
    // password : {type : String, required : true},
    date : Date,
    orders : [new Schema({
        menu_item : String,
        special_requests : String,
        status : String,
        date : Date
    })]
 });


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
