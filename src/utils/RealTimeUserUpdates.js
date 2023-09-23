const io = require('socket.io-client');
let jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrSDNYWlZvNXR0YURLS1RBQUFEIiwiaWF0IjoxNjk1NDU3OTExfQ.N09bYuFl-VGUWGbgvg5hji7wZ8n8cNtYzZtnpauMwlE'; // Initialize the JWT token

// Connect to the WebSocket server
const socket = io('ws://localhost:4000', {
  query: { token: jwtToken }, // Send the token as a query parameter
});

// Listen for a new token from the server
socket.on('newToken', (newToken) => {
  console.log('Received a new token:', newToken);
  jwtToken = newToken;

  // Reconnect to the WebSocket server with the updated token
  socket.connect();
});

socket.on('connect', () => {
  console.log('Connected to the WebSocket server');

  // Send a message to the server
  socket.emit('message', 'Hello, server!');
});

socket.on('userCreated', (user) => {
  // Handle the event, e.g., update your UI with the new user data
  console.log('New user created:', user);
});

socket.on('message', (data) => {
  console.log('Received message:', data);

  // Perform assertions here
  if (data === 'Hello, client!') {
    console.log('Test passed: Server echoed the message.');
  } else {
    console.error('Test failed: Unexpected server response.');
  }

  // Close the WebSocket connection
  socket.close();
});

socket.on('disconnect', () => {
  console.log('Disconnected from the WebSocket server');
});
