import React from 'react';
import UsersList from '../components/UsersList';

const Users = (props) => {
  const USERS = [
    {
      id: 'u1',
      name: 'John',
      image: 'https://images.pexels.com/photos/3616232/pexels-photo-3616232.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      places: 3,
    },
    {
      id: 'u2',
      name: 'Jane',
      image: 'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      places: 2,
    }
  ];

  return (
    <UsersList items={USERS}/>
  );
}

export default Users;
