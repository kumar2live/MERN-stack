import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../utils/validators';
import InputComponent from '../../shared/Forms/InputComponent';
import { useAppFormHook } from '../../app-hooks/appform-hook';

const NewPlace = () => {
  const [formState, inputChangeHandler] = useAppFormHook(
    {
      title: {value: '', isValid: false},
      description: {value: '', isValid: false},
      address: {value: '', isValid: false},
    }, false,
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState);
  }

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center m-2'>
        <Card style={{width: '50%'}}>
          <Card.Body>
            <Card.Title>Add Place</Card.Title>
            <form className='place-form' onSubmit={placeSubmitHandler}>
              <InputComponent
                label='Title'
                element='input'
                type='text'
                id='title'
                placeholder='Please enter a Title'
                errorText='Please enter a valid title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label='Description'
                element='textarea'
                id='description'
                errorText='Please enter a valid description at lease (5)'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label='Address'
                element='input'
                id='address'
                errorText='Please enter a valid address'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
              />
              
              <Button className='my-2' variant="success" type='submit' disabled={!formState.isValid}>Add Place</Button>
            </form>
          </Card.Body>
        </Card>
        
      </div>
    </React.Fragment>
  );
}

export default NewPlace;
