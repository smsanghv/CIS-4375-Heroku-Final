const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema for new inventory item info
const inventorySchema = new Schema({
    itemname: {
        type: String,
        required: true
    },
    numberleft: {
        type: Number,
        required: true
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Inventory = mongoose.model('inventory', inventorySchema, 'invRecords');