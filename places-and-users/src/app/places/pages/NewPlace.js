import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import InputComponent from "../../shared/Forms/InputComponent";
import { useAppFormHook } from "../../app-hooks/appform-hook";
import { useAppHttpHook } from "../../hooks/app-http-hook";
import { AppContext } from "../../shared/app-contexts/app-contexts";
import ImageUploader from "../../shared/Forms/ImageUploader";

const NewPlace = () => {
  const [formState, inputChangeHandler] = useAppFormHook(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );
  const appContext = useContext(AppContext);
  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(formState, appContext.usedIdLoggedIn);
    const url = `${process.env.REACT_APP_BACKEND_URL}/places`;

    try {
      clearError();
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(url, "POST", formData, {
        Authorization: `Bearer ${appContext.token}`
      });
      history.push("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {isThereError && (
        <Alert variant="danger" onClick={clearError}>
          {isThereError}
        </Alert>
      )}
      {isLoading && <Alert variant="dark">Loading...</Alert>}
      <div className="d-flex justify-content-center m-2">
        <Card style={{ width: "50%" }}>
          <Card.Body>
            <Card.Title>Add Place</Card.Title>
            <form className="place-form" onSubmit={placeSubmitHandler}>
              <InputComponent
                label="Title"
                element="input"
                type="text"
                id="title"
                placeholder="Please enter a Title"
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label="Description"
                element="textarea"
                id="description"
                errorText="Please enter a valid description at lease (5)"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />
              <InputComponent
                label="Address"
                element="input"
                id="address"
                errorText="Please enter a valid address"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
              />
              <ImageUploader
                id="image"
                errorText="Please provide an image!"
                onInput={inputChangeHandler}
              />

              <Button
                className="my-2"
                variant="success"
                type="submit"
                disabled={!formState.isValid}
              >
                Add Place
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default NewPlace;
