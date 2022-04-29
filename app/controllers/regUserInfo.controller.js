const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');
const RegUserInfo = require("../models/regUserInfo.model");

// Create and Save a new regUserInfos
exports.create = async (req, res, next) => { // .create: tao document trong collection RegUserInfo (new RegUserInfo)

    // Validate request
    if(!req.body.name) {
        return next(new BadRequestError(404, "Name can not be empty"));
    }

    // Create a regUserInfos
    const regUserInfo = new RegUserInfo({
        nameUser: req.body.nameUser,
        phoneUser: req.body.phoneUser,

        name: req.body.name,
        schedule: req.body.schedule,
        departure: req.body.departure,
        price: req.body.price,
    });

    try {
        // Save regUserInfos in the database
        const document = await regUserInfo.save();
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while creating the regUserInfos"
            )
        );
    }
};

// Retrieve all regUserInfoss of a user from the database
exports.findAll = async (req, res, next) => {

    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" };
    }

    try {
        const document = await RegUserInfo.find(condition);
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while retrieving RegUserInfo"
            )
        );
    }
};