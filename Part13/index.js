const express = require("express");
const app = express();

app.use(express.json());

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");

app.use("/api/blogs", blogsRouter);

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  res.status(500).json({ error: "Something went wrong" });
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
