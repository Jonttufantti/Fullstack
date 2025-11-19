import API from "./config/axios";

const getAll = async () => {
  try {
    const response = await API.get("/computers");
    return { data: response.data };
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};

const ComputerService = { getAll };

export default ComputerService;
