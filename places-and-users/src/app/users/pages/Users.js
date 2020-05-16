import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Alert from "react-bootstrap/Alert";
import { useAppHttpHook } from "../../hooks/app-http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, isThereError, sendRequest, clearError } = useAppHttpHook();

  useEffect(() => {
    const url = "http://localhost:3001/api/users";

    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(url);
        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isThereError && (
        <Alert variant="danger" onClick={clearError}>
          {isThereError}
        </Alert>
      )}
      {isLoading && <Alert variant="dark">Loading...</Alert>}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
