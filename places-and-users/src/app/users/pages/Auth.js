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

import { useAppHttpHook } from "../../hooks/app-http-hook";
import ImageUploader from "../../shared/Forms/ImageUploader";

const Auth = (props) => {
  const appContext = useContext(AppContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  const [formState, inputChangeHandler, setFormData] = useAppFormHook(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    // console.log("formState -- ", formState);

    if (isLoginMode) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/users/login`;

      try {
        const responseData = await sendRequest(
          url,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        appContext.login(responseData.userId, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const url = `${process.env.REACT_APP_BACKEND_URL}/users/signup`;

        const responseData = await sendRequest(url, "POST", formData);
        appContext.login(responseData.userId, responseData.token);
      } catch (error) {}
    }
  };

  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
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
            {isThereError && (
              <Alert variant="danger" onClick={clearError}>
                {isThereError}
              </Alert>
            )}
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
              {!isLoginMode && (
                <ImageUploader
                  id="image"
                  errorText="Please provide an image!"
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
                errorText="Please enter a valid password ! at least 6 character(s)"
                validators={[VALIDATOR_MINLENGTH(6)]}
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
