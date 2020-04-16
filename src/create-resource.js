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
      if (error) throw error;
      if (!data) throw promise;
      return data;
    }
  };
};

export default createResource;
