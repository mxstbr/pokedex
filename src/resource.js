const createResource = promise => {
  let status = "loading";
  let error = null;
  let data = null;

  promise.then(
    result => {
      status = "complete";
      data = result;
    },
    err => {
      status = "errored";
      error = err;
    }
  );

  return {
    read() {
      if (status === "loading") throw promise;
      if (status === "errored") throw error;

      return data;
    }
  };
};

export default createResource;
