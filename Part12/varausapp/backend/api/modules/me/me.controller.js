import computerReservationService from "../computers/reservations/reservations.service.js";

export const getMyComputerReservations = async (req, res, next) => {
  const user = req.user;

  try {
    const reservations = await computerReservationService.getByUserId(
      user.id,
      user.id,
      user.isAdmin
    );
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};
