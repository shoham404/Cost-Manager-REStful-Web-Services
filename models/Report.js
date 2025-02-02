/**
 * Report schema for storing user reports.
 * This schema stores reports that contain data about user expenses for a specific month and year.
 * Each report includes a user ID, year, month, and an array of cost items for that month and year.
 *
 * @typedef {Object} Report
 * @property {string} userid - The unique ID of the user associated with the report. (required)
 * @property {number} year - The year of the report. (required).
 * @property {number} month - The month of the report (1 = January, 2 = February, etc.) (required).
 * @property {Array} data - An array of cost items (objects) for that user in the given year and month. (required).
 * @property {Date} created_at - The date when the report was created (defaults to the current date).
 */

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({

    /**
     * The unique ID of the user associated with the report.
     * @type {String}
     * @required
     */
    userid: {
        type: String,
        required: true
    },

    /**
     * The year of the report.
     * @type {Number}
     * @required
     */
    year: {
        type: Number,
        required: true
    },

    /**
     * The month of the report (1 = January, 2 = February, etc.).
     * @type {Number}
     * @required
     */
    month: {
        type: Number,
        required: true
    },

    /**
     * The data of the report, representing an array of cost items.
     * Each item includes information like description, amount, and date.
     * @type {Array}
     * @required
     */
    data: {
        type: Array,
        required: true
    },

    /**
     * The date when the report was created.
     * Defaults to the current date if not provided.
     * @type {Date}
     * @default {Date.now}
     */
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
