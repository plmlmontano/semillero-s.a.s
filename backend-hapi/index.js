const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const laabr = require('laabr');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: true
        }
    })


    await server.register([
        Inert, Vision, {
            plugin: laabr,
            options: {}
        }
    ])

    await server.register([
        require('./routes/vehiculo')
    ])

    server.route({
        method: 'GET',
        path: '/api/index',
        handler: (request, h) => {
            return "Bienvenidos al API REST de Semillero S.A.S creada en Hapi.js"
        }
    })

    await server.start()
    console.log('Server on port', server.info.uri)
}

init()