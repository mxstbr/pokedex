const createResource = promise => {
  let status = "loading";
  let data = null;
  let error = null;
  promise
    .then(result => {
      status = "idle";
      data = result;
    })
    .catch(err => {
      status = "error";
      error = err;
    });

  return {
    read() {
      if (status === "idle") return data;
      if (status === "error") throw error;
      throw promise;
    }
  };
};

export default createResource;
