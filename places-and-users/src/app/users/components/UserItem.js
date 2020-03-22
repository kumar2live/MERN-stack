import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import './UserItem.css';

const UserItem = (props) => {

  return (
    <React.Fragment>
      <Link to={`/${props.id}/places/`}>
        <Card className='m-2'>
          <div className='p-2 user-item'>
            <div className="d-flex justify-content-center">
              <div className='p-2'>
                <img className='imageStyles' src={props.image} alt={props.name} />
              </div>
              <div className='p-2 align-self-center'>
                <h3>{props.name}</h3>
                <h3>{props.placesCount} {props.placesCount === 1 ? 'Place' : 'Places'} </h3>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </React.Fragment>
  );
}

export default UserItem;
