import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAppAuth = () => {
  const [token, setToken] = useState(false);
  const [usedIdLoggedIn, setUsedIdLoggedIn] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uuid, token, expDate) => {
    setToken(token);
    const tokenExpDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uuid,
        token: token,
        expiration: tokenExpDate.toISOString(),
      })
    );
    setUsedIdLoggedIn(uuid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsedIdLoggedIn(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, usedIdLoggedIn };
};
