/**
 * Express router for providing team member information.
 * This router exposes an endpoint to retrieve information about the team members.
 *
 * @module teamRouter
 */

const express = require('express');
const router = express.Router();

/**
 * List of team members.
 * Contains first and last name of each team member.
 *
 * @typedef {Object} TeamMember
 * @property {string} first_name - The first name of the team member.
 * @property {string} last_name - The last name of the team member.
 *
 * @type {Array<TeamMember>}
 */

const teamMembers = [
    { first_name: 'Hadar', last_name: 'Ben Zaken' },
    { first_name: 'Shoham', last_name: 'Margalit' }
];

/**
 * GET endpoint to retrieve team member information.
 * This endpoint returns a list of team members with their first and last names.
 *
 * @name GET /api/about
 * @returns {Array<TeamMember>} An array of team members.
 */

router.get('/', (req, res) => {
    res.json(teamMembers);
});

module.exports = router;


