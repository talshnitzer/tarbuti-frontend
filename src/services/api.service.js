const superagent = require("superagent");

const baseUrl = "";

// P.Z: It'll be the best to use the content type as content
// (or even the a setHeaders function that will set the headers in one place).
const sendPostReq = async (values, path) => {
  let response = null;
  try {
    response = await superagent
      .post(`${baseUrl}${path}`)
      .send({ ...values })
      .set("Content-Type", "application/json");
  } catch (e) {
    response = e.response;
  }
  return response;
};

const sendAuthPostReq = async (token, values, path) => {
  let response = null;
  try {
    response = await superagent
      .post(`${baseUrl}${path}`)
      .send({ ...values })
      .set("Content-Type", "application/json")
      .set("x-auth", token);
  } catch (e) {
    response = e.response;
  }
  return response;
};

const sendAuthGetReq = async (token, path) => {
  console.log("service - sendAuthGetReq path:", path);
  let response = null;
  try {
    response = await superagent
      .get(`${baseUrl}${path}`)
      .set("Content-Type", "application/json")
      .set("x-auth", token);
  } catch (e) {
    response = e.response;
  }
  return response;
};

const sendGetReq = async (path) => {
  console.log("service - sendGetReq path:", path);
  let response = null
  try {
    response = await superagent
    .get(`${baseUrl}${path}`)
    .set("Content-Type", "application/json");
  } catch (e) {
    response = e.response;
  }
  return response;
};

export { sendPostReq as default, sendGetReq, sendAuthPostReq, sendAuthGetReq };
