import React, { useContext, useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Alert from "react-bootstrap/Alert";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isThereError, setIsThereError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const url = "http://localhost:3001/api/users";

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setLoadedUsers(resData.users);
        setIsLoading(false);
      } catch (error) {
        setIsThereError(error.message || "Something went wrong!");
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      {isThereError && <Alert variant="danger">{isThereError}</Alert>}
      {isLoading && <Alert variant="dark">Loading...</Alert>}

      {!isLoading && loadedUsers && 
      <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
