import React from "react";
import Alert from "react-bootstrap/Alert";

import "./PlaceList.css";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <React.Fragment>
        <Alert variant="warning">No Places found.</Alert>
        {/* <NavLink className='p-2' to='/' exact>All Users</NavLink>
        <Button to='/places/new'>Share Place</Button> */}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="d-flex flex-column">
        {props.items.map((place) => (
          <div className="d-flex justify-content-center" key={place.id}>
            <PlaceItem
              onDelete={props.onDeletePlace}
              image={place.image}
              name={place.name}
              title={place.title}
              description={place.description}
              creator={place.creator}
              address={place.address}
              id={place.id}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PlaceList;
