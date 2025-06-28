const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = new userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    await user.save();
    return user;
}

module.exports.findUserByEmail = async(email) => {
    if(!email){
        throw new Error('Email is required');
    }
    return userModel.findOne({ email }).select('+password');
}