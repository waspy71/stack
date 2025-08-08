

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('Correct number of blogs in JSON format is returned', async () => {
  const returnedBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(returnedBlogs.body.length, helper.initialBlogs.length)
})

test('database returned blog has id property', async () => {
  const returnedBlogs = await api
    .get('/api/blogs')

  assert(returnedBlogs.body[0].id)
})

test('successfully creates new blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: "Test",
    author: "Robert",
    url: "http://blog.com",
    likes: 2,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogTitle = response.body.title
  assert.strictEqual(blogTitle, newBlog.title)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)

})

test('missing likes default to 0', async () => {
    const newBlog = {
    title: "Test",
    author: "Robert",
    url: "http://blog.com",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)

})

test('missing title or url returns 400 Bad Request', async () => {
  const newBlog = {
    author: "Robert",
    url: "http://blog.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})


after(async () => {
  await mongoose.connection.close()
})