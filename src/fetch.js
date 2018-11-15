const { SERVER_URL = 'http://localhost:14141' } = process.env;

export default ['GET', 'POST', 'PUT', 'DELETE'].reduce((funcs, method) => {
  funcs[method] = async (uri, body) => {
    const params = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: body ? JSON.stringify(body) : undefined
    };
    console.log(JSON.stringify(params));
    const response = await fetch(SERVER_URL + uri, params);
    if (response.ok) {
      return response.json();
  
    } else {
      throw response;
    }    
  }
  return funcs;  
}, {});