const { validationResult } = require('express-validator');
const Place = require('../mongo/models/place');
const User = require('../mongo/models/user');
const mongoose = require('mongoose');

const getCoordsForAddress = require('../utils/location');

const HttpError = require('../models/http-error');

const getAllPlaces = async (req, res, next) => {
  let places;

  try {
    places = await Place.find();  
  } catch (error) {
    const getError = new HttpError('Could not find a place due to tech error', 404);
    return next(getError);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not any places!', 404),
    );
  } 

  res.json({places: places.map((place) => place.toObject({getters: true}))});
}

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);  
  } catch (error) {
    const getError = new HttpError('Could not find a place for given ID', 404);
    return next(getError);
  }

  if (!place) {
    const placeError = new HttpError('Could not find a place for given ID', 404);
    return next(placeError);
  } 

  res.json({place: place.toObject({getters: true})});
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  let userWithPlaces;
  try {
    console.log('userId -- ', userId);
    // places = await Place.find({creator: userId});  
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (error) {
    const getError = new HttpError('Could not find a place for given User ID', 404);
    return next(getError);
  }
  console.log('userWithPlaces -- ', userWithPlaces);

  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(
      new HttpError('Could not find a places for provided User ID', 404),
    );
  } 

  res.json({places: userWithPlaces.places.map((place) => place.toObject({getters: true}))});
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid Inputs Password, Please check', 422));
  }
  const { title, description, address, creator } = req.body;
  let coordinates;

  try {
    coordinates = await getCoordsForAddress({})
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    image: 'https://images.pexels.com/photos/3801030/pexels-photo-3801030.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    address,
    location: coordinates,
    creator,
  });

  // console.log('creator -- ', creator);
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError('Error in finding the user, Please try again', 500));
  }

  if(!user) {
    return next(new HttpError('Could not find user, Please try again', 500));
  }

  try {
    // await createdPlace.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const throwError = new HttpError('Creating Place Failed, Please try again', 500);
    return next(throwError);
  }

  res.status(201).json({place: createdPlace});
}

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid Inputs Password, Please check', 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  
  let place;

  try {
    place = await Place.findById(placeId);  
  } catch (error) {
    return next(new HttpError('Unable to fine due to tech error', 500));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();  
  } catch (error) {
    return next(new HttpError('Unable to update due to tech error', 500));
  }

  res.status(200).json({place: place.toObject({getters: true})});
}

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  
  let place;

  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (error) {
    return next(new HttpError('Unable to find due to tech error', 500));
  }

  if (!place) {
    return next(new HttpError('Unable to find the place that you are trying to delete', 500));
  }

  try {
    // await place.remove();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError('Unable to delete due to tech error', 500));
  }

  res.status(200).json({message: 'Deleted successfully!'});
}

exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
