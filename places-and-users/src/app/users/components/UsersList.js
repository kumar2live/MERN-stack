import React from "react";
import Alert from "react-bootstrap/Alert";

import "./UsersList.css";
import UserItem from "./UserItem";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="container p-2">
        <Alert variant="warning">No users found!</Alert>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="d-flex flex-column p-2">
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            image={user.image}
            name={user.name}
            placesCount={user.places.length}
            id={user.id}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default UsersList;
