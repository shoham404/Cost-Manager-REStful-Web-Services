/**
   Mongoose model for users.
 */

const mongoose = require('mongoose');

/**
 * User schema for storing user information.
   id: String - Unique user ID (required).
   first_name: String - First name of the user (required, min length: 2).
   last_name: String - Last name of the user (required, min length: 2).
   birthday: Date - User's date of birth (required).
   marital_status: String - User's marital status (required, enum: ['single', 'married', 'divorced', 'widowed']).
   created_at: Date - Date the user was created (default: current date).
 */

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        minlength: 2
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2
    },
    birthday: {
        type: Date,
        required: true
    },
    marital_status: {
        type: String,
        required: true,
        enum: ['single', 'married', 'divorced', 'widowed']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

/**
 * Virtual property to calculate the user's age.
 */

userSchema.virtual('age').get(function () {
    const now = new Date();
    const age = now.getFullYear() - this.birthday.getFullYear();
    return age;
});

module.exports = mongoose.model('User', userSchema);
