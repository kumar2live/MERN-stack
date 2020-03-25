import React, { useContext } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Auth.css';
import { useAppFormHook } from '../../app-hooks/appform-hook';
import InputComponent from '../../shared/Forms/InputComponent';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';
import { AppContext } from '../../shared/app-contexts/app-contexts';

const Auth = (props) => {
  const appContext = useContext(AppContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputChangeHandler, setFormData] = useAppFormHook(
    {
      email: {value: '', isValid: false},
      password: {value: '', isValid: false},
    }, false,
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState);
    appContext.login();
  }

  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {value: '', isValid: false},
        },
        false,
      );
    }
    setIsLoginMode(prevState => !prevState);
  }

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center m-2'>
        <Card style={{width: '50%'}}>
          <Card.Body>
            <Card.Title>Login Here</Card.Title>
            <form className='place-form' onSubmit={placeSubmitHandler}>
              {!isLoginMode && 
              <InputComponent
                  label='Name'
                  element='input'
                  type='text'
                  id='name'
                  placeholder='Please enter your name'
                  errorText='Please enter a valid name'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputChangeHandler}
                />}
              <InputComponent
                label='Email'
                element='input'
                type='email'
                id='email'
                placeholder='Please enter your email'
                errorText='Please enter a valid email'
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label='Password'
                element='input'
                id='password'
                placeholder='Please enter any password'
                errorText='Please enter a valid password ! at least 5 character(s)'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />
              
              <Button
                className='my-2'
                variant="success"
                type='submit'
                disabled={!formState.isValid}>
                  {isLoginMode ? 'Login' : 'Sign Up'}
              </Button>
              <Button className='mx-2' variant="info" onClick={switchHandler}>Switch to {!isLoginMode ? 'Login' : 'Sign Up'}!</Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Auth;
