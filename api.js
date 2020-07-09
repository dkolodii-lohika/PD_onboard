const axios = require("axios");
const config = require("./config");
const axiosConfig = {
  headers: {
    Authorization: `Token token=${config.token}`,
    Accept: "application/vnd.pagerduty+json;version=2",
    From: config.userEmail,
  },
};

const post = async (url = "", params = {}, config = axiosConfig) => {
  try {
    const response = await axios.post(
      `${config.APIhost}${url}`,
      params,
      config
    );
    return response;
  } catch (e) {
    console.log(e.response.data.error);
  }
};
const api = {
  createIncedent: async (incident = {}) => {
    try {
      post("/incidents", incident);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = api;
