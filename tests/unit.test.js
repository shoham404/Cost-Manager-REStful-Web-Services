/**
 * @file Unit tests for the Express.js application using Jest and Supertest.
 * @description This file contains unit tests for user, cost, and report routes.
 */

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Cost = require('../models/Cost');
const Report = require('../models/Report');

/**
 * Connects to the database before running tests.
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the database connection is established.
 */
beforeAll(async () => {
    // התחברות למסד הנתונים לפני הרצת הבדיקות
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

/**
 * Closes the database connection after all tests have run.
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the database connection is closed.
 */
afterAll(async () => {
    await mongoose.connection.close();
});


/**
 * Unit tests for user routes.
 */
describe('User Routes', () => {
    /**
     * Test for successfully adding a new user.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('✅ Should add a new user successfully', async () => {
        const response = await request(app)
            .post('/api/users/add')
            .send({
                id: "999999",
                first_name: "Test",
                last_name: "User",
                birthday: "1990-01-01",
                marital_status: "single"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', '999999');
    });

    /**
     * Test for failing to add a user with missing fields.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should not add a user with missing fields', async () => {
        const response = await request(app)
            .post('/api/users/add')
            .send({ id: "888888" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    /**
     * Test for fetching user details.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('✅ Should fetch user details successfully', async () => {
        const response = await request(app)
            .get('/api/users/999999');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('first_name', 'Test');
    });

    /**
     * Test for failing to fetch details of a non-existing user.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should return 404 for a non-existing user', async () => {
        const response = await request(app)
            .get('/api/users/12345678');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });

    /**
     * Test for not allowing duplicate user IDs.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should not add a user with an existing ID', async () => {
        const response = await request(app)
            .post('/api/users/add')
            .send({
                id: "999999", // כבר קיים
                first_name: "Duplicate",
                last_name: "User",
                birthday: "1995-05-15",
                marital_status: "married"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User ID already exists');
    });
});

/**
 * Unit tests for cost routes.
 */
describe('Cost Routes', () => {

    /**
     * Test for successfully adding a new cost.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('✅ Should add a new cost successfully', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({
                userid: "999999",
                description: "Test Purchase",
                category: "food",
                sum: 100
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('description', 'Test Purchase');
    });

    /**
     * Test for missing cost fields.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should return 400 for missing cost fields', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({
                userid: "999999",
                sum: 50
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    /**
     * Test for adding a cost with a non-existing user.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should return 404 for adding cost with non-existing user', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({
                userid: "111111",
                description: "Fake User Cost",
                category: "health",
                sum: 50
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});


/**
 * Unit tests for report routes.
 */
describe('Report Routes', () => {

    /**
     * Test for retrieving a report with existing data.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('✅ Should return report for existing data', async () => {
        const response = await request(app)
            .get('/api/report/?id=999999&year=2025&month=2');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    /**
     * Test for failing to retrieve a report when no data exists.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('❌ Should return 404 if no data found for report', async () => {
        const response = await request(app)
            .get('/api/report/?id=999999&year=2030&month=1');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No data found for the specified user and date range');
    });

    /**
     * Test that the report correctly returns calculated totals for each category.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    test('✅ Should correctly calculate and sum costs in a report', async () => {
        const response = await request(app)
            .get('/api/report/?id=999999&year=2025&month=2');

        expect(response.status).toBe(200);
        response.body.forEach(category => {
            expect(category).toHaveProperty('total');
            expect(category.total).toBeGreaterThan(0);
        });
    });
});
