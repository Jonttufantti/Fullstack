import API from "./config/axios";

/**
 * Login.
 *
 * @param credentials object that has username and password.
 * @returns object that has: data: {email, username, _id} or null, and
 * errorData: {message} or null.
 * */
const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return { data: response.data, errorData: null };
  } catch (err) {
    return { data: null, errorData: err.response.data };
  }
};

const authService = { login };

export default authService;
