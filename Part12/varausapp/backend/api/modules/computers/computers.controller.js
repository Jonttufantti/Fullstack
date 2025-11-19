import computerService from "./computers.service.js";

export const createComputer = async (req, res, next) => {
  try {
    const computer = await computerService.create(req.body);
    res.status(200).json(computer);
  } catch (err) {
    next(err);
  }
};

export const updateComputer = async (req, res, next) => {
  try {
    const computer = await computerService.update(
      req.params.computerId,
      req.body
    );
    res.status(200).json(computer);
  } catch (err) {
    next(err);
  }
};

export const deleteComputer = async (req, res, next) => {
  try {
    await computerService.remove(req.params.computerId);
    res.status(200).json("Computer deleted");
  } catch (err) {
    next(err);
  }
};

export const getComputer = async (req, res, next) => {
  try {
    const computer = await computerService.getById(req.params.computerId);
    res.status(200).json(computer);
  } catch (err) {
    next(err);
  }
};

export const getComputers = async (req, res, next) => {
  try {
    const computers = await computerService.getAll();
    res.status(200).json(computers);
  } catch (err) {
    next(err);
  }
};
