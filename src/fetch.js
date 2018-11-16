export default ['GET', 'POST', 'PUT', 'DELETE'].reduce((funcs, method) => {
  funcs[method] = async (uri, body) => {
    const params = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    };
    console.log(JSON.stringify(params));
    const response = await fetch(uri, params);
    if (response.ok) {
      return response.json();
  
    } else {
      throw response;
    }    
  }
  return funcs;  
}, {});