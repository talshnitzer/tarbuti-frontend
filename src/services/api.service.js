
const superagent = require('superagent');

//const baseUrl = process.env.API_URL || 'http://localhost:8080'
const baseUrl = ''

// P.Z: It'll be the best to use the content type as content
// (or even the a setHeaders function that will set the headers in one place).
const sendPostReq = async (values, path) => {
    const response = await superagent.post(`${baseUrl}${path}`)
      .send({...values})
      .set('Content-Type', 'application/json')
    return response    
  }

const sendAuthPostReq = async (token,values, path) => {
  const response = await superagent.post(`${baseUrl}${path}`)
    .send({...values})
    .set('Content-Type', 'application/json')
    .set('x-auth',token)
  return response    
}

const sendAuthGetReq = async (token, path) => {
  console.log('service - sendAuthGetReq path:', path);
  const response = await superagent.get(`${baseUrl}${path}`)
    .set('Content-Type', 'application/json')
    .set('x-auth',token)
  return response    
}

const sendGetReq = async (path) => {
  console.log('service - sendGetReq path:', path);
  const response = await superagent.get(`${baseUrl}${path}`)
    .set('Content-Type', 'application/json')
  return response    
}

  export {sendPostReq as default, sendGetReq, sendAuthPostReq, sendAuthGetReq}