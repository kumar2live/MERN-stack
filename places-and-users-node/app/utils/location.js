const axios = require('axios');
const HttpError = require('../models/http-error');

const getCoordsForAddress = async (address) => {
  //just for reference
  // const response = await axios.get(
  //   `https://maps.google/${encodeURIComponent()}`
  // );
  // const data = response.data;

  // if (!data || data.status === 'ZERO_RESULTS') {
  //   const error = new HttpError('Could not find address', 422);
  // }
  // const coorinates = data.results[0].geometry.location;
  // return coorinates;

  // no google api, so dummy result
  return {
    lat: 12.34534,
    lng: -45.123454,
  }
}

module.exports = getCoordsForAddress;