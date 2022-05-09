/* const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRESGL_ADDON_URI,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = { pool }; */

require("dotenv").config();
const { Pool } = require('pg')
const mysql = require('mysql2/promise')

const configuracion = {
    connectionString: process.env.POSTGRESGL_ADDON_URI,
    ssl: { rejectUnauthorized: false }
}

const pool = new Pool(configuracion)
try {
  console.log("Base de datos correctamente enlazada");
} catch (error) {
  console.log("Erro al conectar la DB");
  console.log(error);
}

// Conexion de mysql
const conexion_db = {
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    database: process.env.MYSQL_ADDON_DB,
    password: process.env.MYSQL_ADDON_PASSWORD,
    port: process.env.MYSQL_ADDON_PORT
};

function handleDisconnect(conexion_db) {
    connection = mysql.createPool(conexion_db);

    connection.getConnection((err) =>{
        if (err) {
            console.error('Error when connection to db', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', (err)=>{
        console.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    })
}

handleDisconnect(conexion_db);

module.exports = {pool, connection};