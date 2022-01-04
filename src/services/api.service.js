import axios from 'axios'

export async function GetWhitelisted () {
  const response = await axios.get(process.env.REACT_APP_API_ADDRESS + '/whitelisted');
  return response.data;
}

export async function SubmitWhitelist (body) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + '/whitelist', body).catch((err) => {
    // deal with err, such as toggle loading state, recover click and scroll.
    // recover the reject state before.
    throw new Error(err.response.data);
 });
  return response.data;
}