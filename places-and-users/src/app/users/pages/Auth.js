import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import "./Auth.css";
import { useAppFormHook } from "../../app-hooks/appform-hook";
import InputComponent from "../../shared/Forms/InputComponent";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../utils/validators";
import { AppContext } from "../../shared/app-contexts/app-contexts";

const Auth = (props) => {
  const appContext = useContext(AppContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isThereError, setIsThereError] = useState(null);
  const [formState, inputChangeHandler, setFormData] = useAppFormHook(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      try {
        const url = "http://localhost:3001/api/users/login";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setIsLoading(false);
        appContext.login();
      } catch (error) {
        console.log(error);
        setIsThereError(error.message || "Something went wrong!");
        setIsLoading(false);
      }
    } else {
      try {
        const url = "http://localhost:3001/api/users/signup";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message);
        }
        console.log(resData);
        setIsLoading(false);
        appContext.login();
      } catch (error) {
        console.log(error);
        setIsThereError(error.message || "Something went wrong!");
        setIsLoading(false);
      }
    }
  };

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
          name: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center m-2">
        <Card style={{ width: "50%" }}>
          <Card.Body>
            {isThereError && <Alert variant="danger">{isThereError}</Alert>}
            <Card.Title>Login Here</Card.Title>
            <form className="place-form" onSubmit={placeSubmitHandler}>
              {!isLoginMode && (
                <InputComponent
                  label="Name"
                  element="input"
                  type="text"
                  id="name"
                  placeholder="Please enter your name"
                  errorText="Please enter a valid name"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputChangeHandler}
                />
              )}
              <InputComponent
                label="Email"
                element="input"
                type="email"
                id="email"
                placeholder="Please enter your email"
                errorText="Please enter a valid email"
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label="Password"
                element="input"
                id="password"
                placeholder="Please enter any password"
                errorText="Please enter a valid password ! at least 5 character(s)"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />

              <Button
                className="my-2"
                variant="success"
                type="submit"
                disabled={!formState.isValid}
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </Button>
              <Button className="mx-2" variant="info" onClick={switchHandler}>
                Switch to {!isLoginMode ? "Login" : "Sign Up"}!
              </Button>

              {isLoading && <Alert variant="dark">Loading...</Alert>}
            </form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
