import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { PLACES } from '../../test-data/test-data';

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
