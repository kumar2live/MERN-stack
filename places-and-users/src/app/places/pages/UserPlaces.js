import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const PLACES = [
  {
    id: 'p1',
    name: 'Some Random Name',
    image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    description: 'Some description about the place',
    creator: 'u1',
    address: 'Some random address'
  },
  {
    id: 'p2',
    name: 'Some Random Name',
    image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    description: 'Some description about the place',
    creator: 'u2',
    address: 'Some random address'
  },
];

const UserPlaces = (props) => {
  const userID = useParams().userId;
  const loadedPlaces = PLACES.filter((place) => place.creator === userID);

  return (
    <div className="d-flex justify-content-center">
      <div className='p-2'>
        <PlaceList items={loadedPlaces} />
      </div>
    </div>
  );
}

export default UserPlaces;
