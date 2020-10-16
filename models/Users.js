const mongoose = require('mongoose');
const config = require('config');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken')

// create schema 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now

    }
}, { collection: 'users' })

module.exports = User = mongoose.model('user', UserSchema)