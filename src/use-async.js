import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "start": {
      return {
        data: null,
        error: null,
        status: "loading"
      };
    }
    case "resolved": {
      return {
        data: action.data,
        error: null,
        status: "idle"
      };
    }
    case "errored": {
      return {
        data: null,
        status: "errored",
        error: action.error
      };
    }
    default:
      throw new Error(`Action ${action.type} is unhandled.`);
  }
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
        dispatch({ type: "resolved", data });
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
