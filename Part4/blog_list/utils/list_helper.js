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

module.exports = {
  dummy, totalLikes, favoriteBlog
}
