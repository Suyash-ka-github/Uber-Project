const axios=require('axios');
const captainModel=require('../models/captain.model')

module.exports.getAdressCoordinate= async (address)=>{
  const YOUR_API_KEY=process.env.GOOGLE_API;
  const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${YOUR_API_KEY}`;
  
  try {
    const response=await axios.get(url);
    if(response.data.status==='OK'){
        const result=response.data.results[0];
        return {"ltd":result.geometry.location.lat,
                 "lng":result.geometry.location.lng
        };
    }else{
        throw new Error("Unable to fetch Coordinates");
    }
  } catch (error) {
        throw new Error(error.response?.data?.error_message || error.message);
  }
}

module.exports.getDistance=async (origin,destination) => {
    const YOUR_API_KEY=process.env.GOOGLE_API;
    const url=`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${YOUR_API_KEY}`
    try {
    const response=await axios.get(url);
    if(response.data.status==='OK'){
        const result=response.data.routes[0].legs[0];
        return result;
    }else{
        throw new Error("Unable to fetch Coordinates");
    }
  } catch (error) {
        throw new Error(error.response?.data?.error_message || error.message);
  }
}

module.exports.getSuggestions=async (input) => {
  const YOUR_API_KEY=process.env.GOOGLE_API;
  const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${YOUR_API_KEY}`
  try {
    const response=await axios.get(url);
    if(response.data.status==='OK'){
        const result=response.data;
        const predictions=result.predictions.map(p=>p.description)
        return predictions;
    }else{
        throw new Error("Unable to fetch Coordinates");
    }
  } catch (error) {
        throw new Error(error.response?.data?.error_message || error.message);
  }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}