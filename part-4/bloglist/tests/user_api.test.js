// import statements
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

// reset database state before running each test
beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('HTTP POST', () => {

    test('empty username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Chris Smalling',
            password: '123456'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error).toContain('`username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('empty password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'chris', 
            name: 'Chris Smalling'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error).toContain('`password` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('short username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'c', 
            name: 'Chris Smalling',
            password: '123456'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error).toContain('`username` (`c`) is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('short password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'chris', 
            name: 'Chris Smalling',
            password: '1'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error).toContain('`password` must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('existing username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'harry', 
            name: 'Harry Kane',
            password: '123456'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

// run after all tests finish execution
afterAll(async () => {
    await mongoose.connection.close()
})