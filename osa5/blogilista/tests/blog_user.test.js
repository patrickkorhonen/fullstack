const bcrypt = require('bcrypt')
const User = require('../models/user')
const assert = require('node:assert')
const app = require('../app')
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)


test('password must be at least 3 characters long', async () => {
    const user = {
        username: 'test user',
        name: 'test name',
        password: '12'
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash
    })
    const response = await api.post('/api/users').send(newUser)
    assert.strictEqual(response.status, 400)
})