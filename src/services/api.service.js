import axios from 'axios'

export async function GetWhitelisted () {
  const response = await axios.get(process.env.REACT_APP_API_ADDRESS + 'presale');
  return response.data;
}

export async function SubmitWhitelist (body) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'presale', body).catch((err) => {
    throw new Error(err.response.data);
 });
  return response.data;
}

export async function isWhitelisted (address) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'iswhitelisted',{ address } );
  return response.data;
}

export async function isPresale (address) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'ispresale',{ address } );
  return response.data;
}


export async function getMerkleProofPresale (address) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'getmerkleproof-presale',{ address } );
  return response.data;
}

export async function getMerkleProofWhitelist (address) {
  const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'getmerkleproof-whitelisted',{ address } );
  return response.data;
}