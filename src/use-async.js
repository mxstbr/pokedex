import React from "react";

function useAsync(fn) {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setStatus("loading");
    setError(null);
    setData(null);

    fn()
      .then(data => {
        setStatus("idle");
        setError(null);
        setData(data);
      })
      .catch(err => {
        setStatus("error");
        setError(err);
        setData(null);
      });
  }, [fn]);

  return { status, error, data };
}

export default useAsync;
