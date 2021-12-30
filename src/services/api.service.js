import axios from 'axios'

export async function GetWhitelisted () {
  const response = await axios.get(process.env.REACT_APP_API_ADDRESS + '/whitelisted');
  return response.data;
}

export async function SubmitWhitelist (body) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + '/whitelist', body);
  return response.data;
}