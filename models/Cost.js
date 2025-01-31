/*/**
 * Mongoose model for storing user expenses (costs).
 * This schema defines the structure of the cost documents in the database.
 * Each document represents an expense made by a user, including details like description, category, amount, and date.
 *
 * @typedef {Object} Cost
 * @property {string} description - A brief description of the expense (e.g., "Groceries", "Utility Bill").
 * @property {string} category - The category of the expense (e.g., "food", "health", "housing").
 * @property {string} userid - The ID of the user who made the expense.
 * @property {number} sum - The total amount of the expense, must be a positive number (minimum: 0).
 * @property {Date} date - The date the expense was made. Defaults to the current date if not provided.
 */

const mongoose = require('mongoose');


const costSchema = new mongoose.Schema({
    /**
     * A brief description of the expense.
     * @type {String}
     * @required
     * @maxLength 255
     */

    description: {
        type: String,
        required: true,
        maxlength: 255
    },

    /**
     * The category of the expense (e.g., "food", "health", "housing").
     * @type {String}
     * @required
     */

    category: {
        type: String,
        required: true
    },

    /**
     * The unique user ID associated with the expense.
     * @type {String}
     * @required
     */

    userid: {
        type: String,
        required: true
    },

    /**
     * The total amount of the expense (must be positive).
     * @type {Number}
     * @required
     * @min 0
     */

    sum: {
        type: Number,
        required: true,
        min: 0
    },

    /**
     * The date when the expense occurred.
     * Defaults to the current date if not provided.
     * @type {Date}
     * @default {Date.now}
     */

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cost', costSchema);

