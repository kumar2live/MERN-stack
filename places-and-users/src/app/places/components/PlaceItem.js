import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import "./PlaceItem.css";
import AppModal from "../../shared/components/AppModal";
import { AppContext } from "../../shared/app-contexts/app-contexts";
import { useAppHttpHook } from "../../hooks/app-http-hook";

const PlaceItem = (props) => {
  const appContext = useContext(AppContext);
  const [showImage, setShowImage] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  const openImageHandler = () => setShowImage(true);
  const closeImageHandler = () => setShowImage(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);

  const confirmDeleteWarningHandler = async () => {
    console.log("DELETING");
    const url = "http://localhost:3001/api/places/";

    // console.log(formState);

    try {
      clearError();
      await sendRequest(url + props.id, "DELETE", null, {
        Authorization: `Bearer ${appContext.token}`,
      });
      props.onDelete(props.id);
    } catch (error) {}

    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <AppModal
        header={props.address}
        show={showImage}
        onCancel={closeImageHandler}
        footer={
          <Button variant="danger" onClick={closeImageHandler}>
            Close
          </Button>
        }
      >
        <div className="image-container">
          <h3>The Image</h3>
          <img
            // src={props.image}
            src={`http://localhost:3001/${props.image}`}
            alt={props.name}
            style={{ width: "100%", height: "100px" }}
          />
        </div>
      </AppModal>
      <AppModal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footer={
          <div className="align-content-end">
            <Button
              className="mx-2"
              variant="secondary"
              onClick={cancelDeleteWarningHandler}
            >
              Cancel
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={confirmDeleteWarningHandler}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>
          Do you want to proceed deleting? Please note that it cannot be undone
          thereafter.
        </p>
      </AppModal>
      <Card style={{ width: "50%", margin: "1rem" }}>
        <Card.Img
          variant="top"
          // src={props.image}
          src={`http://localhost:3001/${props.image}`}
          style={{ maxHeight: "250px" }}
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button
            variant="secondary"
            className="mr-2"
            onClick={openImageHandler}
          >
            Show
          </Button>
          {appContext.usedIdLoggedIn === props.creator && (
            <Button variant="info" className="mr-2">
              <Link to={`/places/${props.id}`}>Edit</Link>
            </Button>
          )}
          {appContext.usedIdLoggedIn === props.creator && (
            <Button variant="danger" onClick={showDeleteWarningHandler}>
              Delete
            </Button>
          )}
        </Card.Body>
        {isLoading && <Alert variant="danger">Loading...</Alert>}
        {isThereError && (
          <Alert variant="danger" onClick={clearError}>
            {isThereError}
          </Alert>
        )}
      </Card>
    </React.Fragment>
  );
};

export default PlaceItem;
