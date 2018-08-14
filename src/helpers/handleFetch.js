function handleFetch (url, init) {
    return fetch(url, init)
    .then(res => res.json())
    .then(result => {
      if (!result.ok) {
        throw Error(result.message);
      }
      return result;
    })
    .catch(error => console.log(error));
}

export default handleFetch;
