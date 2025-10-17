const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./listOfBlogs')


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {

        const blogs = [];
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {

        const blogs = [{
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },]
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 7)
    })


    test('of a bigger list is calculated right', () => {

        const result = listHelper.totalLikes(allBlogs)
        assert.strictEqual(result, 36)

    })
})

describe('most popular blogs if', () => {
    test('the list is empty', () => {

        const blogs = [];
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result, 0)
    })

    test('the list have only one blog', () => {

        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            }
        ];

        const mostPopular = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }


        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, mostPopular)
    })

    test('we have big list', () => {

        const mostPopular = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        const result = listHelper.favoriteBlog(allBlogs)
        assert.deepStrictEqual(result, mostPopular)
    })
})

describe('Most blogs by author', () => {
    test('author with most blogs is returned', () => {
        const result = listHelper.mostBlogs(allBlogs);
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 });
    });

    test('empty array returns null', () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
    });

    test('undefined returns null', () => {
        const result = listHelper.mostBlogs(undefined);
        assert.strictEqual(result, null);
    });
});

describe('mostLikes', () => {
    test('returns the author with the most total likes', () => {
        const result = listHelper.mostLikes(allBlogs);
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 });
    });

    test('returns null for empty list', () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, null);
    });
})
