

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

const getToken = async () => {
  const request = await api
    .post('/api/login')
    .send(helper.initialUsers[0])

  return `Bearer ${request.body.token}`
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})

  await api
    .post('/api/users')
    .send(helper.initialUsers[0])

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
    .set('Authorization', await getToken())
    .send(newBlog)
    .expect(201)

  const blogTitle = response.body.title
  assert.strictEqual(blogTitle, newBlog.title)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)

})

test('fails to create blog with code 401 if token is missing', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: "Test",
    author: "Robert",
    url: "http://blog.com",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(!titles.includes('Test'))
})

test('missing likes default to 0', async () => {
    const newBlog = {
    title: "Test",
    author: "Robert",
    url: "http://blog.com",
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
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
    .set('Authorization', await getToken())
    .send(newBlog)
    .expect(400)

})

test('deletion of a blog returns status code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
    .send({ 
      title: 'BlogToDelete', 
      author: 'Delete', 
      url: 'Delete' 
    })
    .expect(201)

  const blogsBeforeDelete = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length + 1, blogsBeforeDelete.length)

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', await getToken())
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.body.title))

  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('correctly updates a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    likes: 10
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedBlog.body.likes, newBlog.likes)

})


after(async () => {
  await mongoose.connection.close()
})