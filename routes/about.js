/**
 * Express router for providing team member information.
 */

const express = require('express');
const router = express.Router();

/**
 * List of team members.
   first_name: string.
   last_name: string.
 */

const teamMembers = [
    { first_name: 'Hadar', last_name: 'Ben Zaken' },
    { first_name: 'Shoham', last_name: 'Margalit' }
];

/**
   GET endpoint to retrieve team member information.
 */

router.get('/', (req, res) => {
    res.json(teamMembers);
});

module.exports = router;


