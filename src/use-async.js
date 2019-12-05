import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
  }
  return state;
};

const useAsync = fn => {
  const [{ data, status, error }, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: "idle"
  });

  React.useEffect(() => {
    let cancelled = false;
    dispatch({ type: "start" });

    fn().then(
      data => {
        if (cancelled) return;
        dispatch({ type: "finished", data });
      },
      err => {
        if (cancelled) return;
        dispatch({ type: "errored", error: err });
      }
    );

    return () => {
      cancelled = true;
    };
  }, [fn]);

  return { data, error, status };
};

export default useAsync;
