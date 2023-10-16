import { Server } from 'socket.io';
import COMMON from '../configs/common.js';

let io;

/**
 * function initiates socket connection
 * and binds to the express app port
 * @param {object} server
 * @returns {void}
 */
export const startSocket = (server, options = {}) => {
  io = new Server(server, options);
};

/**
 * function emits messages to the specified socket room
 * @param {string} alert
 * @returns {void}
 */
export const sendAlert = alert => {
  io.emit(COMMON.SOCKET.ROOMS.DEFAULT, alert);
};
