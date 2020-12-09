const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema for new customer info
const customerSchema = new Schema({
    firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
      type: String,
      required: true
      },
      zip: {
      type: String,
      required: true
      },
      vehiclemake: {
        type: String,
        required: true
      },
      vehiclemodel: {
        type: String,
        required: true
      },
      vehicleyear: {
        type: Number,
        required: true
      },
      licenseplate: {
        type: String,
        required: true
      },
      history: {
        type: String,
        required: true
      },
      updated: {
          type: Date,
          required: true,
          default: Date.now
      }
});

module.exports = Customer = mongoose.model('customer', customerSchema, 'custRecords');