const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')


const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    assert(titles.includes('Second test blog'))
  })

  test('unique identifier property of blogs is named id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    blogsAtStart.forEach(blog => {
      assert.strictEqual(blog._id, undefined);

      assert(blog.id);
    });
  });


  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[1];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with a valid data', async () => {
      const newBlog = {
        title: "New blog post",
        author: "Joona",
        url: "http://newblog.com",
        likes: 3
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await Blog.find({})
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes("New blog post"))
    })

    test('blog without likes defaults to 0', async () => {
      const newBlog = {
        title: 'Blog with no likes',
        author: 'Tester',
        url: 'http://test.com'
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Tester',
        url: 'http://notitle.com'
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'No URL Blog',
        author: 'Tester'
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });
  })

  describe.only('Updating of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10
      }

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.likes, blogToUpdate.likes + 10)


      const blogsAtEnd = await helper.blogsInDb()
      const found = blogsAtEnd.find(b => b.id === blogToUpdate.id)
      assert.strictEqual(found.likes, blogToUpdate.likes + 10)
    })
    test('fails with status code 404 if id does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()

      const updatedBlog = {
        title: 'Nonexistent blog',
        author: 'Nobody',
        url: 'http://nope.com',
        likes: 123
      }

      await api
        .put(`/api/blogs/${nonExistingId}`)
        .send(updatedBlog)
        .expect(404)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert(!blogsAtEnd.some(b => b.id === blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })
})



















after(async () => {
  await mongoose.connection.close()
})