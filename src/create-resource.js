const createResource = promise => {
  let data = null;
  let error = null;

  promise
    .then(result => {
      data = result;
    })
    .catch(err => {
      error = err;
    });

  return {
    read() {
      if (data) return data;

      if (error) throw error;

      throw promise;
    }
  };
};

export default createResource;
