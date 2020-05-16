import { createContext } from 'react';

export const AppContext = createContext(
  {
    isLoggedIn: false,
    usedIdLoggedIn: null,
    token: null,
    login: () => {},
    logout: () => {},
  }
);
