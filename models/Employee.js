const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const employeeSchema = new mongoose.Schema({
    username : {type : String, unique : true},
    date : Date,
    orders : [new Schema({
        customer_email : String,
        menu_item : String,
        special_requests : String,
        status : String,
        date : Date,
        price: Number
    })]
 });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
