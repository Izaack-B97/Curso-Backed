const io = require('socket.io-client'); // Dependiencia que nos permitira convertir el servidor en un cliente

let socket = io.connect('http://localhost:3000', { reconnection: true }); // LA opcion recconnectiones para que intente reconectar en caso de que se esconecte

socket.on('connect', () => {
    console.log(`\n\n Sockect connected from NodeJS\n\n`); 
});

module.exports = socket;