const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const key = require(path.join(__dirname, '../../config/keys')).secret;
const passport = require('passport');
const User = require(path.join(__dirname, '../../models/userSchema'));

/**
 * @route POST api/user/register
 * @desc Register new user
 * @access Private
 */
router.post('/register', (req,res) => {
    let {
        firstname,
        lastname,
        email,
        password,
        confirm_password,
        phone,
        address,
        city,
        state,
        zip,
        privilege
    } = req.body
    //Check that the password is confirmed properly
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "Password does not match."
        });
    }
    //Check for unique email address
    User.findOne({
        email: email
    }).then(user =>{
        if(user){
            return res.status(400).json({
                msg: "Email already in use."
            });
        }
    })
    //If pw & email pass checks
    let newUser = new User({
        firstname,
        lastname,
        email,
        password,
        phone,
        address,
        city,
        state,
        zip,
        privilege
    })
    //Hashing the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Registration successful."
                });
            });
        });
    });
});

/**
 * @route POST api/user/login
 * @desc Log in a user
 * @access Public
 */
router.post('/login', (req,res) => {
    //Checking that inputed email is recognized/registered
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Invalid email.",
                success: false
            });
        }
        //If email valid, check inputed pw with stored pw
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            //If pw correct
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    zip: user.zip,
                    privilege: user.privilege
                }
                jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Log in successful."
                    });
                })
            }
            //If pw incorrect
            else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

/**
 * @route GET api/user/profile
 * @desc Show user info
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session:false
}), (req,res) => {
    return res.json({
        user: req.user
    });
});

/**
 * @route GET api/user/getallusers
 * @desc Retrieve all employee records
 * @access Private
 */
router.get('/getallusers', (req,res) => {
    User.find(function(err, user){
        if(err){
          res.json(err);
        }
        else {
          res.json(user);
        }
      });
})

/**
 * @route PUT api/user/updateuser/:id
 * @desc Update an employee record
 * @access Private
 */
router.put('/updateuser/:id', (req,res) => {
    User.findById(req.params.id, function(err, user) {
        if (!user)
          res.status(404).send("data is not found");
        else {
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zip = req.body.zip;
            user.privilege = req.body.privilege;
            user.notes = req.body.notes;
            user.save().then(() => {
              res.json('Update complete');
          })
          .catch(() => {
                res.status(400).send("Unable to update the database");
          });
        }
      });
})

/**
 * @route DELETE api/user/deleteuser/:id
 * @desc Delete an employee record
 * @access Private
 */
router.delete('/deleteuser/:id', (req,res) => {
    User.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
})

module.exports = router;