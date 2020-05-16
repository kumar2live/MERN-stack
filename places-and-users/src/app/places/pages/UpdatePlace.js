import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputComponent from "../../shared/Forms/InputComponent";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import { useAppFormHook } from "../../app-hooks/appform-hook";
import { useAppHttpHook } from "../../hooks/app-http-hook";
import { AppContext } from "../../shared/app-contexts/app-contexts";

const UpdatePlace = (props) => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const placeIdRef = useParams().placeId;
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  const [formState, inputChangeHandler, setFormData] = useAppFormHook(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/places/`;

    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(url + placeIdRef);
        // console.log(responseData.place);
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: { value: responseData.place.title, isValid: true },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, placeIdRef, setFormData]);

  const placeUpdateHandler = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/places/`;

    // console.log(formState);

    try {
      clearError();
      await sendRequest(
        url + placeIdRef,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appContext.token}`
        }
      );
      history.push(`/${appContext.usedIdLoggedIn}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return <Alert variant="danger">Loading...</Alert>;
  }

  if (!isLoading && isThereError) {
    return (
      <Alert variant="danger" onClick={clearError}>
        {isThereError}
      </Alert>
    );
  }

  if (!isLoading && !isThereError && !loadedPlace) {
    return <Alert variant="danger">Could not find the place!</Alert>;
  }

  return (
    <React.Fragment>
      {!isLoading && !isThereError && loadedPlace && (
        <div className="d-flex justify-content-center m-2">
          <Card style={{ width: "50%" }}>
            <Card.Body>
              <Card.Title>Update Place</Card.Title>
              <form className="place-form" onSubmit={placeUpdateHandler}>
                <InputComponent
                  label="Title"
                  element="input"
                  type="text"
                  id="title"
                  initialValue={loadedPlace.title}
                  initialValidity={true}
                  placeholder="Please enter a Title"
                  errorText="Please enter a valid title"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputChangeHandler}
                />

                <InputComponent
                  label="Description"
                  element="textarea"
                  id="description"
                  initialValue={loadedPlace.description}
                  initialValidity={true}
                  errorText="Please enter a valid description at lease (5)"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  onInput={inputChangeHandler}
                />

                <Button
                  className="my-2"
                  variant="success"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Update Place
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
