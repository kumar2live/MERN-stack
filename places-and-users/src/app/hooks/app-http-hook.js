import { useState, useEffect, useCallback, useRef } from "react";

export const useAppHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isThereError, setIsThereError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const resData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setIsLoading(false);
        return resData;
      } catch (error) {
        setIsThereError(error.message || "Something went wrong!");
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setIsThereError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, isThereError, sendRequest, clearError };
};
