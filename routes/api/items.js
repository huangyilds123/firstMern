const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// item model 
const Item = require('../../models/Item');


// route GET api/items 
router.get('/', (req, res) => {
    Item.find()
        .sort({ data: -1 })
        .then(items => res.json(items))



})


//POST
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    })

    newItem.save()
        .then(item => res.json(item))

})


//DELETE
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))

})



module.exports = router; 