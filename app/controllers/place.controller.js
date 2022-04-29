const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');
const Place = require("../models/place.model");

// Create and Save a new places
exports.create = async (req, res, next) => { // .create: tao document trong collection Place (new Place)

    // Validate request
    if(!req.body.name) {
        return next(new BadRequestError(404, "Name can not be empty"));
    }

    // Create a places
    const place = new Place({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        description: req.body.description,
        schedule: req.body.schedule,
        departure: req.body.departure,
        numberOfSeatsAvailable: req.body.numberOfSeatsAvailable,
        price: req.body.price,
    });

    try {
        // Save places in the database
        const document = await place.save();
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while creating the places"
            )
        );
    }
};

// Retrieve all placess of a user from the database
exports.findAll = async (req, res, next) => {

    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" };
    }

    try {
        const document = await Place.find(condition);
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while retrieving places"
            )
        );
    }
};


// Find a single places with an id
exports.findOne = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Place.findOne(condition);
        if(!document) {
            return next(new BadRequestError(404, "places not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error retrieving places with id = ${req.params.id}`
            )
        );
    }
};

// Update a places by the id in the request
exports.update = async (req, res, next) => {

    if(Object.keys(req.body).length === 0) {
        return next(
            new BadRequestError(400,"Data to update can not be empty"));
    }

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Place.findOneAndUpdate(condition, req.body, {
            new: true,
        });
        if(!document) {
            return next(new BadRequestError(404, "places not found"));
        }
        return res.send({ message: "places was updated successfully", });
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error updating places with id=${req.params.id}`
            )
        );
    }
};


// Delete a places with the specified id in the request
exports.delete = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };


    try {
        const document = await Place.findOneAndDelete(condition);
        if(!document) {
            return next(new BadRequestError(404, "places not found"));
        }
        return res.send({ message: "places was deleted successfully", });  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Could not delete places with id=${req.params.id}`
            )
        );
    }
};

// Delete all places of a user from the database
exports.deleteAll = async(req, res, next) => {

    try {
        const data = await Place.deleteMany({});
        return res.send({
            message: `${data.deletedCount} places was deleted successfully`
        }); 
    } catch (error) {
        return next(
            new BadRequestError(
                500,`An error occurred while removing all places`
            )
        );
    }
};