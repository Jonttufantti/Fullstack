import API from "./config/axios";

const getAllForComputer = async (computerId) => {
  try {
    const response = await API.get(`/computers/${computerId}/reservations`);
    return { data: response.data };
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};

const getAllForUser = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/computer-reservations`);
    return { data: response.data };
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};

const getAllForCurrentUser = async () => {
  try {
    const response = await API.get(`/me/computer-reservations`);
    return { data: response.data };
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};

const create = async (computerId, { date, startTime, endTime }) => {
  try {
    const response = await API.post(`/computers/${computerId}/reservations`, {
      date,
      startTime,
      endTime,
    });
    return { data: response.data, errorData: null };
  } catch (err) {
    return {
      data: null,
      errorData: err.response?.data || {
        message: "Reservation could not be created",
      },
    };
  }
};

const remove = async (computerId, reservationId) => {
  try {
    await API.delete(`/computers/${computerId}/reservations/${reservationId}`);
    return { success: true };
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) {
      return {
        success: false,
        errorMessage: "Reservation has already been deleted",
      };
    }
    return { success: false, errorMessage: "Reservation could not be deleted" };
  }
};

const computerReservationService = {
  getAllForComputer,
  getAllForCurrentUser,
  getAllForUser,
  create,
  remove,
};

export default computerReservationService;
