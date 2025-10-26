const DataLoader = require("dataloader");
const Book = require("./models/books");
const mongoose = require("mongoose");

const batchBookCounts = async (authorIds) => {
  console.log("batchBookCounts called with:", authorIds);
  const counts = await Book.aggregate([
    {
      $match: {
        author: { $in: authorIds.map((id) => new mongoose.Types.ObjectId(id)) },
      },
    },
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);

  const countMap = {};
  counts.forEach((c) => {
    countMap[c._id.toString()] = c.count;
  });

  return authorIds.map((id) => countMap[id.toString()] || 0);
};

const createLoaders = () => ({
  bookCountLoader: new DataLoader(batchBookCounts),
});

module.exports = { createLoaders };
