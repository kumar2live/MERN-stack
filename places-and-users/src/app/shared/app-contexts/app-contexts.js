import { createContext } from 'react';

export const AppContext = createContext(
  {
    isLoggedIn: false,
    usedIdLoggedIn: null,
    login: () => {},
    logout: () => {},
  }
);
