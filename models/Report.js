const mongoose = require('mongoose');

// סכמת דוחות
const reportSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
