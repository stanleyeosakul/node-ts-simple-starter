// *************************************************
// Initialization
// *************************************************
// Import the App and required methods
import App from './app';
import { Application } from 'express';
import { createServer } from 'http';

// Define variables
const port = normalizePort(process.env.PORT || 3000);
const expressApp: Application = App.app;
expressApp.set('port', port);

// ***************************************************
// Start the Server
// ***************************************************
const server = createServer(expressApp);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// ***************************************************
// Function Logic
// ***************************************************
// Parse port input types
function normalizePort(val: number | string): number | string | boolean {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return false; }
}

// Server Error Handler
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Server Start Success
function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server started on ${bind}`);
}