const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    username : {type : String, unique : true},
    password : {type : String, required : true},
    date : Date,
 });


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;