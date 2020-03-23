import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputComponent from '../../shared/Forms/InputComponent';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import { useAppFormHook } from '../../app-hooks/appform-hook';
import { PLACES } from '../../test-data/test-data';


const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeIdRef = useParams().placeId;

  const [formState, inputChangeHandler, setFormData] = useAppFormHook(
    {
      title: {value: '', isValid: false},
      description: {value: '', isValid: false},
    },
    false,
  );

  const identifiedPlace = PLACES.find((p) => p.id === placeIdRef);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {value: identifiedPlace.name, isValid: true},
        description: {value: identifiedPlace.description, isValid: true},
      }, true);
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <Alert variant='danger'>
        Could not find the place!
      </Alert>
    );
  }

  const placeUpdateHandler = event => {
    event.preventDefault();
    console.log(formState);
  }

  if (isLoading) {
    return (
      <Alert variant='danger'>
        Loading...
      </Alert>
    );
  }
  
  return (
    <React.Fragment>
      <div className='d-flex justify-content-center m-2'>
        <Card style={{width: '50%'}}>
          <Card.Body>
            <Card.Title>Update Place</Card.Title>
            <form className='place-form' onSubmit={placeUpdateHandler}>
              <InputComponent
                label='Title'
                element='input'
                type='text'
                id='title'
                initialValue={formState.inputs.title.value}
                initialValidity={true}
                placeholder='Please enter a Title'
                errorText='Please enter a valid title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
              />

              <InputComponent
                label='Description'
                element='textarea'
                id='description'
                initialValue={formState.inputs.description.value}
                initialValidity={true}
                errorText='Please enter a valid description at lease (5)'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />
              
              <Button
                className='my-2'
                variant="success"
                type='submit'
                disabled={!formState.isValid}
              >Update Place</Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UpdatePlace;
