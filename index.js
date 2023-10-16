import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './server/routes/index.js';
import dbConnect from './server/models/index.js';
import MESSAGES from './server/configs/messages.js';
import CONSTANTS from './server/configs/constants.js';
import logger from './server/utils/logger.js';
import { startSocket } from './server/utils/socket.js';
import COMMON from './server/configs/common.js';

const app = express();
const server = createServer(app);
const port = CONSTANTS.PORT;

// Middleware to read urlencoded payloads
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
// Middleware to read JSON payloads
app.use(express.json({ limit: '1mb' }));

// Middleware to control CORS
app.use(
  cors({
    credentials: true,
  }),
);

app.use(routes);
// Bind socket on express http port
startSocket(server, { cors: { origin: '*' } });

dbConnect;

// Start the server
server.listen(port, COMMON.INTERFACES_ALIAS, () => {
  logger.info(MESSAGES.CONNECT.LISTENING);
});
