const express = require('express');
const router = express.Router();
const path = require('path');
const Inventory = require(path.join(__dirname, '../../models/inventorySchema'));

/**
 * @route POST api/inventory/additem
 * @desc Add a new item to inventory
 * @access Private
 */
router.post('/additem', (req,res) => {
    let {
        itemname,
        numberleft
    } = req.body
    let invItem = new Inventory({
        itemname,
        numberleft
    })
    invItem.save().then(() => {
        res.status(200).json({
            success: true,
            msg: "Item added."});
      })
      .catch(() => {
        res.status(400).json({
            msg: "Unable to add item."
        });
      });
})

/**
 * @route GET api/inventory/getallinv
 * @desc Retrieve all items in inventory
 * @access Private
 */
router.get('/getallinv', (req,res) => {
    Inventory.find(function(err, invItem){
        if(err){
          res.json(err);
        }
        else {
          res.json(invItem);
        }
      });
})

/**
 * @route GET api/inventory/edititem/:id
 * @desc Edit an item in inventory
 * @access Private
 */
router.get('/edititem/:id', (req,res) => {
    Inventory.findById(req.params.id, function (err, invItem){
      if(err) {
        res.json(err);
      }
      res.json(invItem);
  });
})

/**
 * @route PUT api/inventory/updateitem/:id
 * @desc Update an item in inventory
 * @access Private
 */
router.put('/updateitem/:id', (req,res) => {
    Inventory.findById(req.params.id, function(err, invItem) {
        if (!invItem)
          res.status(404).send("data is not found");
        else {
            invItem.itemname = req.body.itemname;
            invItem.numberleft = req.body.numberleft;
            invItem.save().then(() => {
              res.json('Update complete');
          })
          .catch(() => {
                res.status(400).send("Unable to update the database");
          });
        }
      });
})

/**
 * @route DELETE api/inventory/deleteitem/:id
 * @desc Delete a message
 * @access Public
 */
router.delete('/deleteitem/:id', (req,res) => {
    Inventory.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
})

module.exports = router;