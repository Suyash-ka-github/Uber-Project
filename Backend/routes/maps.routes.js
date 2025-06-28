const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator');
const mapController=require('../controllers/map.controller');
const { authUser } = require('../middlewares/auth.middleware');
const authMiddleware=require('../middlewares/auth.middleware')
router.get('/location',[
    query('address').isString().isLength({min:3}),
    
],authMiddleware.authUser,mapController.getCoordinates);

router.get('/get-distance',[
    query('pickup').isString().isLength({min:3}),
    query('drop').isString().isLength({min:3})
],authMiddleware.authUser,mapController.getDistance);

router.get('/get-suggestion',[
    query('input').isString().isLength({min:1}),

],authMiddleware.authUser,mapController.getAutoCompleteSuggestions);

module.exports=router;