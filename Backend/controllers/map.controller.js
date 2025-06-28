const mapsService=require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates=async (req,res,next) => {
    const {address}=req.body;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
      try {
    const data = await mapsService.getAdressCoordinate(address);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch coordinates", details: error.message });
  }
}

module.exports.getDistance=async (req,res,next) => {
   const {pickup,drop}=req.query;
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    try{
        const data =await mapsService.getDistance(pickup,drop);
        return res.status(200).json(data);
    } catch (error) {
    return res.status(500).json({ error: "Failed to fetch coordinates", details: error.message });
  }

}

module.exports.getAutoCompleteSuggestions=async (req,res,next) => {
  const {input}=req.query;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    try{
        const data =await mapsService.getSuggestions(input);
        return res.status(200).json(data);
    } catch (error) {
    return res.status(500).json({ error: "Failed to fetch coordinates", details: error.message });
  }
}