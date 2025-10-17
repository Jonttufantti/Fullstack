const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let tokenUser1
  let tokenUser2


  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash1 = await bcrypt.hash('sekret', 10)
    const user1 = new User({ username: 'root', passwordHash: passwordHash1 })
    await user1.save()

    const passwordHash2 = await bcrypt.hash('pass2', 10)
    const user2 = new User({ username: 'other', passwordHash: passwordHash2 })
    await user2.save()

    const loginResponse1 = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    tokenUser1 = loginResponse1.body.token

    const loginResponse2 = await api
      .post('/api/login')
      .send({ username: 'other', password: 'pass2' })
    tokenUser2 = loginResponse2.body.token


    const initialBlogs = helper.initialBlogs.map(
      b => ({ ...b, user: user1._id })
    )
    await Blog.insertMany(initialBlogs)
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

      blogToView.user = blogToView.user.toString()
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
        .set('Authorization', `Bearer ${tokenUser1}`)
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
        .set('Authorization', `Bearer ${tokenUser1}`)
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
        .set('Authorization', `Bearer ${tokenUser1}`)
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
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send(newBlog)
        .expect(400);
    });
  })

  describe('Updating of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10
      }

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
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
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send(updatedBlog)
        .expect(404)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if user is the creator', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
      assert(!blogsAtEnd.some(b => b.id === blogToDelete.id))
    })
  })
  test('fails with status code 401 if user is not the creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${tokenUser2}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash
    })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Joona',
      name: 'Joona Sandbacka',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with statuscode 400 if password is missing', async () => {
    const newUser = {
      username: 'nopassword',
      name: 'No Pass User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password'))
  })

  test('creation fails with statuscode 400 if password is too short', async () => {
    const newUser = {
      username: 'shortpass',
      name: 'Shorty',
      password: 'pw',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password must be at least 3 characters'))
  })
})



after(async () => {
  await mongoose.connection.close()
})