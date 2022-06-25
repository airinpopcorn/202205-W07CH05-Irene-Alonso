import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 3200;

const onError = () => {};
const onListening = () => {
    console.log(`Listening on ${PORT}`);
};

app.set('port', PORT);
const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
