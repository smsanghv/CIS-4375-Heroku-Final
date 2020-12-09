const express = require('express');
const router = express.Router();
const path = require('path');
const Appointment = require(path.join(__dirname, '../../models/appointmentSchema'));

/**
 * @route POST api/appointment/createappointment
 * @desc Create new appointment
 * @access Public
 */
router.post('/createappointment', (req,res) => {
    let {
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        zip,
        appointmentdate,
        appointmenttime,
        vehicleMake,
        vehicleModel,
        description
    } = req.body
    let appoint = new Appointment({
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        zip,
        appointmentdate,
        appointmenttime,
        vehicleMake,
        vehicleModel,
        description
    })
    appoint.save().then(() => {
        res.status(200).json({
            success: true,
            msg: "Appointment saved."});
      })
      .catch(() => {
        res.status(400).json({
            msg: "Unable to save appointment."
        });
      });
})

/**
 * @route GET api/appointment/getallappointments
 * @desc Retrieve all appointments sent to support
 * @access Private
 */
router.get('/getallappointments', (req,res) => {
    Appointment.find(function(err, appoint){
        if(err){
          res.json(err);
        }
        else {
          res.json(appoint);
        }
      });
})

/**
 * @route GET api/appointment/editappointment/:id
 * @desc Edit an appointment
 * @access Private
 */
router.get('/editappointment/:id', (req,res) => {
    Appointment.findById(req.params.id, function (err, appoint){
      if(err) {
        res.json(err);
      }
      res.json(appoint);
  });
})

/**
 * @route PUT api/appointment/updateappointment/:id
 * @desc Update a appointment
 * @access Private
 */
router.put('/updateappointment/:id', (req,res) => {
    Appointment.findById(req.params.id, function(err, appoint) {
        if (!appoint)
          res.status(404).send("Data not found.");
        else {
            appoint.firstname = req.body.firstname;
            appoint.laststname = req.body.lastname;
            appoint.email = req.body.email;
            appoint.phone = req.body.phone;
            appoint.address = req.body.address;
            appoint.city = req.body.city;
            appoint.state = req.body.state;
            appoint.zip = req.body.zip;
            appoint.appointmentdate = req.body.appointmentdate;
            appoint.appointmenttime = req.body.appointmenttime;
            appoint.vehicleMake = req.body.vehicleMake;
            appoint.vehicleModel = req.body.vehicleModel;
            appoint.description = req.body.description;
            appoint.save().then(() => {
              res.json('Update complete');
          })
          .catch(() => {
                res.status(400).send("Unable to update the database");
          });
        }
      });
})

/**
 * @route DELETE api/appointment/deleteappointment/:id
 * @desc Delete an appointment
 * @access Private
 */
router.delete('/deleteappointment/:id', (req,res) => {
    Appointment.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed.');
    });
})

module.exports = router;