import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './PlaceItem.css';
import AppModal from '../../shared/components/AppModal';

const PlaceItem = (props) => {
  const [showImage, setShowImage] = useState(false);

  const openImageHandler = () => setShowImage(true);
  const closeImageHandler = () => setShowImage(false);

  return (
    <React.Fragment>
      <AppModal
        header={props.address}
        show={showImage}
        onCancel={closeImageHandler}
        footer={<Button variant="danger" onClick={closeImageHandler}>Close</Button>}
      >
        <div className='image-container'>
          <h3>The Image</h3>
          <img src={props.image} alt={props.name} style={{ width: '100%', height: '100px' }}/>
        </div>
      </AppModal>
      <Card style={{ width: '50%', margin: '1rem' }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
          <Button variant="secondary" className='mr-2' onClick={openImageHandler}>Show</Button>
          <Button variant="info" className='mr-2'>
            <Link to={`/places/${props.id}`}>Edit</Link>
          </Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default PlaceItem;
