const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema for new appointment info
const appointmentSchema = new Schema({
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
    appointmentdate: {
      type: String,
      required: true
      },
      appointmenttime: {
        type: String,
        required: true
      },
    vehicleMake: {
      type: String,
      required: true
      },
    vehicleModel: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
      },
    created: {
      type: Date,
      required: true,
      default: Date.now
      }
});

module.exports = Appointment = mongoose.model('appointment', appointmentSchema, 'custAppointments');