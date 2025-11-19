import reservationService from "./reservations.service.js";

export const createReservation = async (req, res, next) => {
  const computerId = req.params.computerId;
  const userId = req.user.id;
  const { date, startTime, endTime } = req.body;

  try {
    const reservation = await reservationService.create({
      computerId,
      userId,
      date,
      startTime,
      endTime,
    });
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  const user = req.user;

  try {
    await reservationService.remove(
      req.params.reservationId,
      user.id,
      user.isAdmin
    );
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.getById(
      req.params.reservationId
    );
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAll(req.params.computerId);
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

export const getReservationsByUserId = async (req, res, next) => {
  const user = req.user;

  try {
    const reservations = await reservationService.getByUserId(
      req.params.reservationId,
      user.id,
      user.isAdmin
    );
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};
