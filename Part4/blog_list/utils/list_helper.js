const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.likes;
  }, 0);
};

module.exports = {
  dummy, totalLikes
}


