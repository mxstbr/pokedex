import { useState, useEffect, useCallback } from "react";

const useAsync = (asyncFn, dependencies) => {
  const callback = useCallback(asyncFn, dependencies);

  const [data, setData] = useState(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    setState("loading");
    setData(null);
    callback()
      .then(data => {
        setState("idle");
        setData(data);
      })
      .catch(err => {
        setState("error");
      });
  }, [callback]);

  return [data, state];
};

export default useAsync;
