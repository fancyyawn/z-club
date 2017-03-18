const User = require('../models').User;

exports.addUser = (user)=>{
    return User.create(user)
};

exports.getUserById = (id)=>{
    return User.findById(id).exec();
};

exports.getUserByName = (name)=>{
    return User.findOne({name: name}).exec();
};