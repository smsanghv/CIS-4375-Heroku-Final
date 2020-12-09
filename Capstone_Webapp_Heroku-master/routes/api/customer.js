const express = require('express');
const router = express.Router();
const path = require('path');
const customerRecord = require(path.join(__dirname, '../../models/customerSchema'));

/**
 * @route POST api/customer/createcustomer
 * @desc Create new customer record
 * @access Private
 */
router.post('/createcustomer', (req,res) => {
    let {
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        zip,
        vehiclemake,
        vehiclemodel,
        vehicleyear,
        licenseplate,
        history
    } = req.body
    let custRec = new customerRecord({
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        zip,
        vehiclemake,
        vehiclemodel,
        vehicleyear,
        licenseplate,
        history
    })
    custRec.save().then(() => {
        res.status(200).json({
            success: true,
            msg: "Customer saved."});
      })
      .catch(() => {
        res.status(400).json({
            msg: "Unable to save."
        });
      });
})

/**
 * @route GET api/customer/getallcustomers
 * @desc Retrieve all customer records
 * @access Private
 */
router.get('/getallcustomers', (req,res) => {
    customerRecord.find(function(err, custRec){
        if(err){
          res.json(err);
        }
        else {
          res.json(custRec);
        }
      });
})

/**
 * @route GET api/customer/editcustrec/:id
 * @desc Edit a customer record
 * @access Private
 */
router.get('/editcustrec/:id', (req,res) => {
    customerRecord.findById(req.params.id, function (err, custRec){
      if(err) {
        res.json(err);
      }
      res.json(custRec);
  });
})

/**
 * @route PUT api/customer/updatecustrec/:id
 * @desc Update a customer record
 * @access Private
 */
router.put('/updatecustrec/:id', (req,res) => {
    customerRecord.findById(req.params.id, function(err, custRec) {
        if (!custRec)
          res.status(404).send("data is not found");
        else {
            custRec.firstname = req.body.firstname;
            custRec.lastname = req.body.lastname;
            custRec.email = req.body.email;
            custRec.phone = req.body.phone;
            custRec.address = req.body.address;
            custRec.city = req.body.city;
            custRec.state = req.body.state;
            custRec.zip = req.body.zip;
            custRec.vehiclemake = req.body.vehiclemake;
            custRec.vehiclemodel = req.body.vehiclemodel;
            custRec.vehicleyear = req.body.vehicleyear;
            custRec.licenseplate = req.body.licenseplate;
            custRec.history = req.body.history;
            custRec.save().then(() => {
              res.json('Update complete');
          })
          .catch(() => {
                res.status(400).send("Unable to update the database");
          });
        }
      });
})

/**
 * @route DELETE api/customer/deletecustrec/:id
 * @desc Delete a customer record
 * @access Private
 */
router.delete('/deletecustrec/:id', (req,res) => {
    customerRecord.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
})

module.exports = router;