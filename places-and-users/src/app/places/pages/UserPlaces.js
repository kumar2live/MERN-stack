import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import PlaceList from "../components/PlaceList";

import { useAppHttpHook } from "../../hooks/app-http-hook";

const UserPlaces = () => {
  const userID = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/places/user/`;

    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(url + userID);
        // console.log(responseData.places);
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userID]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <div className="d-flex justify-content-center">
      {isThereError && (
        <Alert variant="danger" onClick={clearError}>
          {isThereError}
        </Alert>
      )}
      {isLoading && <Alert variant="dark">Loading...</Alert>}

      {!isLoading && loadedPlaces && (
        <div className="p-2">
          <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
        </div>
      )}
    </div>
  );
};

export default UserPlaces;
