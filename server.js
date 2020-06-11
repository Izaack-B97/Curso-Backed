const categoryRoutes = require('./routers/categorias_routes');
const taskRoutes = require('./routers/tasks_routes');
const registrationsRoutes = require('./routers/registrations_routes');
const sessionsRoutes = require('./routers/session_routes');


const findUserMiddleware = require('./middlewars/find_user');
const authUserMiddleware = require('./middlewars/auth_user');

const session = require('express-session');
const methodOverride = require('method-override');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const express = require('express');

const socketio = require('socket.io');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug')

app.use(session({
    secret: [ 'kfkdjfkdsjfkdjslkfds5fd454fds54fd5sfsfd', 'ds54a4d5sa4d5s4a5d4sa5d4sa54d5as4' ],
    saveUninitialized: false, 
    resave: false
}));
app.use(findUserMiddleware);
app.use(authUserMiddleware);

// Routes
app.use(categoryRoutes);
app.use(taskRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes)


app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

let server = app.listen(3000, () => {
    console.log('Server on port 3000');
});

// Enlazamos el servidor con el socket
let io = socketio(server);
let usersCount = 0;

io.on('connection', socket => { // Evento que se dispara cuando hay una conexion
    usersCount ++;

    io.emit('count_updated', { count: usersCount }); // Emite el evento que se mandara al cliente junto con los datos

    socket.on('disconnect',() => { // Se dispara cuando se desconecta
        usersCount--;
    }) 
});
