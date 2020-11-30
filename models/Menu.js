const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const menuSchema = new mongoose.Schema({
    item : String,
    price : Number,
    description : String,
    class : String
 });


const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;