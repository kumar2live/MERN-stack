const uuid = require('uuid/v4');
const { check, validationResult } = require('express-validator');

const getCoordsForAddress = require('../utils/location');

const HttpError = require('../models/http-error');

let testPlaces = [
  {
    id: 'p1',
    title: 'Testing Place 1',
    description: 'One of the testing place 1',
    address: 'Testing address 1',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Testing Place 2',
    description: 'One of the testing place 2',
    address: 'Testing address 2',
    creator: 'u2',
  },
  {
    id: 'p3',
    title: 'Testing Place 3',
    description: 'One of the testing place 3',
    address: 'Testing address 3',
    creator: 'u2',
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = testPlaces.find((tp) => tp.id === placeId);

  if (!place) {
    throw new HttpError('Could not find a place for given ID', 404);
  } 

  res.json({message: 'It works in places!', place});
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = testPlaces.filter((tp) => tp.creator === userId);

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find a places for provided User ID', 404),
    );
  } 

  res.json({message: 'It works in places!', places});
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

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  testPlaces.push(createdPlace);

  res.status(201).json({place: createdPlace});
}

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid Inputs Password, Please check', 422)
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  
  const updatedPlace = { ...testPlaces.find(tp => tp.id === placeId) };
  const placeIndex = testPlaces.findIndex(tp => tp.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  testPlaces[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
}

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  if (! testPlaces.find(tp => tp.id === placeId) ) {
    throw new HttpError('No such Place found.', 404);
  }
  testPlaces = testPlaces.filter(p => p.id !== placeId);

  res.status(200).json({places: testPlaces});
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;

