const dev = "http://localhost:80/api";
const production = "https://postcompapi.ushja.org/api/";

const API_URI = process.env.REACT_APP_ENV === "production" ? production : dev;

module.exports = {
  api: API_URI,
};
