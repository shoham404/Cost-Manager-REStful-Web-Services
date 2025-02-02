/**
 * Cost schema for storing user costs.
 *
 * @typedef {Object} Cost
 * @property {string} description - A brief description of the expense. (required, maxLength: 255)
 * @property {string} category - The category of the expense. (required).
 * @property {string} userid - The unique ID of the user associated with the report. (required)
 * @property {number} sum - The total amount of the expense. (required, min: 0).
 * @property {Date} date - The date when the expense occurred. (default: Date.now).
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

