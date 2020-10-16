const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const config = require('config');
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')

// User model 
const User = require('../../models/Users');


// route GET api/Auth 
router.post('/', (req, res) => {
    const { email, password } = req.body;

    //simple validation 
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user 
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User doesn\'t not exit' })

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })



        })
})



// get api/auth/user 
// get user data 
// private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})





module.exports = router; 