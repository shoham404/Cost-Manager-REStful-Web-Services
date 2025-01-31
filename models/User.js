/**
 * User schema for storing user information.
 *
 * @typedef {Object} User
 * @property {String} id - Unique user ID (required).
 * @property {String} first_name - First name of the user (required, min length: 2).
 * @property {String} last_name - Last name of the user (required, min length: 2).
 * @property {Date} birthday - User's date of birth (required).
 * @property {String} marital_status - User's marital status (required, enum: ['single', 'married', 'divorced', 'widowed']).
 * @property {Date} created_at - Date the user was created (default: current date).
 */

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({

    /**
     * Unique user ID.
     * @type {String}
     * @required
     * @unique
     */
    id: {
        type: String,
        required: true,
        unique: true
    },

    /**
     * First name of the user.
     * @type {String}
     * @required
     * @minLength 2
     */
    first_name: {
        type: String,
        required: true,
        minlength: 2
    },

    /**
     * Last name of the user.
     * @type {String}
     * @required
     * @minLength 2
     */
    last_name: {
        type: String,
        required: true,
        minlength: 2
    },

    /**
     * User's date of birth.
     * @type {Date}
     * @required
     */
    birthday: {
        type: Date,
        required: true
    },

    /**
     * User's marital status.
     * @type {String}
     * @required
     * @enum ['single', 'married', 'divorced', 'widowed']
     */
    marital_status: {
        type: String,
        required: true,
        enum: ['single', 'married', 'divorced', 'widowed']
    },

    /**
     * Date the user was created.
     * @type {Date}
     * @default Date.now
     */
    created_at: {
        type: Date,
        default: Date.now
    }
});

/**
 * Virtual property to calculate the user's age.
 *
 * This virtual property calculates the user's age based on their birthdate.
 * It uses the current year and subtracts the year of birth to determine the age.
 * This is not a stored field in the database but a computed field that can be accessed like a regular property.
 *
 * @name age
 * @type {number}
 * @getter
 * @memberof User
 * @returns {number} The calculated age of the user.
 */

userSchema.virtual('age').get(function () {
    const now = new Date();
    const age = now.getFullYear() - this.birthday.getFullYear();
    return age;
});

module.exports = mongoose.model('User', userSchema);
