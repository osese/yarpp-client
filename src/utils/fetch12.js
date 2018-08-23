var headers = new Headers({
    "Content-Type":"application/json",
    "Accept": "*/*"
    }
);

var gInit = {
    method : 'GET',
    headers : headers,
};


const url_origin = '';



function getRequest(url){
    return new Request(url_origin + url, {
      headers: new Headers({
          "Content-Type": "application/json"
      }),
      credentials: 'include', // ekle

      method : 'GET',
    });
}

function deleteRequest(url){
    return new Request(url_origin + url, {
      headers: new Headers({
          "Content-Type": "text/html"
      }),
      credentials: 'include', // ekle

      method: 'DELETE',
    })
}

function postRequest(url, data) {
    return new Request(url_origin + url,  {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: new Headers({
          "Content-Type": "application/json"
      }),
      credentials: 'include', // ekle

      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
}

/*
  credentials: 'include', // ekle
  mode: 'cors', // no-cors, cors, *same-origin  -> sill
  const url_origin = 'http://localhost:8080'; -> boş bırak

*/
export  {getRequest, postRequest, deleteRequest};
