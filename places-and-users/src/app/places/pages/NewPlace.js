import React, { useCallback, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../utils/validators';
import InputComponent from '../../shared/Forms/InputComponent';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true;
      for (const input in state.inputs) {
        if (input === action.inputId) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid},
        },
        isValid: isFormValid,
      }
  
    default:
      return state;
  }
}

const NewPlace = (props) => {
  const [formState, dispatch] = useReducer(
    formReducer, {
      inputs: {
        title: {value: '', isValid: false},
        description: {value: '', isValid: false},
      },
      isValid: false,
    });

  const inputChangeHandler = useCallback((id, value, isValid) => {
    // console.log('id, value, isValid -- ', id, value, isValid);
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      inputId: id,
      isValid: isValid,
    });
  }, [dispatch]);

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
              
              <Button className='my-2' variant="success" type='submit' disabled={!formState.isValid}>Add</Button>
            </form>
          </Card.Body>
        </Card>
        
      </div>
    </React.Fragment>
  );
}

export default NewPlace;
