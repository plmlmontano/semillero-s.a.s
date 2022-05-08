// Dependence 
import express from "express";
import morgan from "morgan";
import cors from 'cors';

import indexRoutes from "./routes/index.routes";
import vehiculoRoutes from "./routes/vehiculo.routes";
import marcaRoutes from "./routes/marca.routes";
import lineaRoutes from "./routes/linea.routes";
import usuarioRoutes from "./routes/usuario.routes";
import consultasRoutes from "./routes/consultas.routes";


import './database';

const app = express();

// settings
app.set("port", process.env.PORT);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connection control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//use of route
app.use("/api/index", indexRoutes); //Initial
app.use("/api/vehiculo", vehiculoRoutes); //Initial
app.use("/api/linea", lineaRoutes); //Initial
app.use("/api/marca", marcaRoutes); //Initial
app.use("/api/usuario", usuarioRoutes); //Initial
app.use("/api/consultas", consultasRoutes); //Initial

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});