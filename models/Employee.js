const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const employeeSchema = new mongoose.Schema({
    username : {type : String, unique : true},
    date : Date,
 });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
