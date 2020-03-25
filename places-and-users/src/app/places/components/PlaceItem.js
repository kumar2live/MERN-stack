import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './PlaceItem.css';
import AppModal from '../../shared/components/AppModal';
import { AppContext } from '../../shared/app-contexts/app-contexts';

const PlaceItem = (props) => {
  const appContext = useContext(AppContext);
  const [showImage, setShowImage] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openImageHandler = () => setShowImage(true);
  const closeImageHandler = () => setShowImage(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);
  const confirmDeleteWarningHandler = () => {
    console.log('DELETING');
    setShowConfirmModal(false);
  };

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
      <AppModal
          show={showConfirmModal}
          onCancel={cancelDeleteWarningHandler}
          header='Are you sure?'
          footer={
            <div className='align-content-end'>
              <Button className='mx-2' variant='secondary' onClick={cancelDeleteWarningHandler}>Cancel</Button>
              <Button className='mx-2' variant='danger' onClick={confirmDeleteWarningHandler}>Delete</Button>
            </div>
          }
        >
        <p>Do you want to proceed deleting? Please note that it cannot be undone thereafter.</p>
      </AppModal>
      <Card style={{ width: '50%', margin: '1rem' }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
          <Button variant="secondary" className='mr-2' onClick={openImageHandler}>Show</Button>
          {appContext.isLoggedIn &&
          <Button variant="info" className='mr-2'>
            <Link to={`/places/${props.id}`}>Edit</Link>
          </Button>}
          {appContext.isLoggedIn &&
          <Button variant="danger" onClick={showDeleteWarningHandler}>Delete</Button>}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default PlaceItem;
