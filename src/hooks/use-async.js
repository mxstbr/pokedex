import { useState, useEffect } from "react";

function useAsync(fn) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");
    setData(null);
    fn()
      .then(fetchedData => {
        setStatus("idle");
        setData(fetchedData);
      })
      .catch(err => {
        setStatus("error");
        setError(err.message);
      });
  }, [fn]);

  return [data, { status, error }];
}

export default useAsync;
