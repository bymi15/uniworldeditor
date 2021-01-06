import axios from "axios";

export default axios.create({
  baseURL: "https://uniworld.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json",
  },
});
