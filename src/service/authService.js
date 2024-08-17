import axios from "axios";

//these are the apis that will be integrated with OpenText directory service
// const API_URL = "http://psuite:8080/otdsws/rest/authentication/credentials";
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `http://psuite:8080/otdsws/rest/authentication/credentials`,
      {
        userName: username,
        password: password,
      }
    );
    console.log(response.data);
    return response.data; // Assuming the API returns a token or success status
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const generateSamlToken = async (token) => {
  try {
    const response = await axios.post(
      `http://psuite:8080/otdsws/rest/authentication/saml?token=${token}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to generate SAML token");
  }
};
