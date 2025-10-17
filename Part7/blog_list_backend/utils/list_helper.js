const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  return blogs.reduce((mostLiked, currentObject) => {
    return currentObject.likes > mostLiked.likes ? currentObject : mostLiked;
  }, blogs[0]);
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, 'author');
  const top = _.maxBy(Object.entries(grouped), ([author, blogs]) => blogs.length);

  return { author: top[0], blogs: top[1].length };
};


const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, 'author');

  const likesByAuthor = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }));

  return _.maxBy(likesByAuthor, 'likes');
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
