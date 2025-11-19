import Computer from "./computer.js";

// TODO: throw an error (using errors from utils/errors.js) if a computer
// doesn't exist.

const create = async ({ name, location, computerNumbers }) => {
  const newComputer = new Computer({ name, location, computerNumbers });
  const savedComputer = await newComputer.save();
  return savedComputer;
};

const update = async (id, { name, location, computerNumbers }) => {
  const updatedComputer = await Computer.findByIdAndUpdate(
    id,
    { $set: { name, location, computerNumbers } },
    { new: true }
  );
  return updatedComputer;
};

const remove = async (id) => {
  await Computer.findByIdAndDelete(id);
};

const getById = async (id) => {
  const computer = await Computer.findById(id);
  return computer;
};

const getAll = async () => {
  const computers = await Computer.find();
  return computers;
};

const computerService = {
  create,
  update,
  remove,
  getById,
  getAll,
};

export default computerService;
