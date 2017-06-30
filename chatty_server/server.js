// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
var connectionId = 0;
var connectionColors = {};

// function to create a random hexadecimal color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  ws.id = connectionId ++;
  // Assign a color per user, it won't change when user changes name
  connectionColors[ws.id] = getRandomColor();
  console.log('Client connected', ws.id);

  wss.broadcast = (data) => {
    console.log("Broadcasting...");
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
    });
  };
  //count size of how many users are in there
  wss.broadcast({type:"incomingCount", count: wss.clients.size});

  //set the new message to User Bob said Hi
  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    switch(message.type) {
      case "postMessage":
        message.type = "incomingMessage";
        break;
      case "postNotification":
        message.type = "incomingNotification";
        break;
      default:
        break;
      }
    data = Object.assign({}, {id: uuidv1(), color: connectionColors[ws.id]}, message);
    wss.broadcast(data);

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast({type:"incomingCount", count: wss.clients.size});
    console.log('Client disconnected');
  });

});
