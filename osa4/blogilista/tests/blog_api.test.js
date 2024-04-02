const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)
/*
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
  })
*/
test('the identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0].id != undefined, response.body[0]._id == undefined)
  })
/*
test('a blog can be added', async () => {
    const newBlog = {
        "title": "neljäs",
        "author": "Mark",
        "url": "www.123.com",
        "likes": 17
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.title, newBlog.title)
})

test('if likes are not defined there will be set 0 likes', async () => {
    const newBlog = {
        "title": "no likes2",
        "author": "test2",
        "url": "www.test2.com"
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.likes, 0)
})

test('if title or url are not defined, response status is 400', async () => {
    const newBlog = {
        "author": "test",
        "likes": 10
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.status, 400)
})

test('deleting a blog is possible', async () => {
    const intialResponse = await api.get('/api/blogs')
    const length = intialResponse.body.length
    const id = intialResponse.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, length - 1)
})
*/

test('updating a blog is possible', async () => {
    const intialResponse = await api.get('/api/blogs')
    const id = intialResponse.body[0].id
    const newBlog = {
        "title": intialResponse.body[0].title,
        "author": intialResponse.body[0].author,
        "url": intialResponse.body[0].url,
        "likes": intialResponse.body[0].likes + 1
    }
    const response = await api.put(`/api/blogs/${id}`).send(newBlog)
    assert.strictEqual(response.body.likes, intialResponse.body[0].likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})