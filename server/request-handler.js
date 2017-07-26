var responseBody = {};
responseBody.results = [];
// responseBody.results[0] =  {
//           createdAt: "2017-07-17T04:15:37.827Z",
//           objectId: "blahblahblah",
//           username: 'Mel Brooks',
//           text: 'Never underestimate the power of the Schwartz!',
//           roomname: 'lobby'
//         };

requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode;
  var headers = defaultCorsHeaders;
  var body = [];
  if(request.url.slice(0,8) === '/classes') {
    if(request.method === 'GET' || request.method === 'OPTIONS') {
      statusCode = 200;
    }
    if(request.method === 'POST') {
      statusCode = 201;
      request.on('data', (chunk) => {
        body.push(chunk)
      })
      request.on('end', () => {
        body = JSON.parse(body.toString());
        responseBody.results.push(body);
      })
    }
  } else {
    statusCode = 404
  }

  headers['Content-Type'] = 'application/json';

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(responseBody))

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = requestHandler;
