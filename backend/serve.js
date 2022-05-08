// Dependence 
import express from "express";
import morgan from "morgan";
import cors from "cors";
import socket from "socket.io";
import http from "http";

import indexRoutes from "./routes/index.routes";
import vehiculoRoutes from "./routes/vehiculo.routes";
import marcaRoutes from "./routes/marca.routes";
import lineaRoutes from "./routes/linea.routes";
import usuarioRoutes from "./routes/usuario.routes";
import consultasRoutes from "./routes/consultas.routes";
import { addUser, getUser, getUsersInRoom, removeUser } from "./controllers/chat.controllers"


import './database';

const app = express();
const server = http.createServer(app)
const io = socket(server, { cors: { origin: '*' } })

// settings
app.set("port", process.env.PORT);

// connection control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use of route
app.use("/api/index", indexRoutes); //Initial
app.use("/api/vehiculo", vehiculoRoutes); //Initial
app.use("/api/linea", lineaRoutes); //Initial
app.use("/api/marca", marcaRoutes); //Initial
app.use("/api/usuario", usuarioRoutes); //Initial
app.use("/api/consultas", consultasRoutes); //Initial

// chat
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, bienvenido/a.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} ¡se ha unido!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

// starting the server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});