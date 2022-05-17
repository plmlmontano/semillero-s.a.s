'use strict'
const { pool, connection } = require('../db/config')
const { handleFileUpload, deleteFile } = require('../cloud/storage')

module.exports = {
    name: 'vehiculos',
    version: '1.0.0',
    register: server => {
        // Crear
        server.route({
            method: 'POST',
            path: '/api/vehiculo',
            handler: async (request, h) => {
                const data = request.payload
                const urlImage = await handleFileUpload(data.imagen_url, data.nro_placa)
                const cliente = await pool.connect()
                let save = {
                    ...data,
                    imagen_url: urlImage,
                    estado: 1
                }
                try {
                    const query = await cliente.query('INSERT INTO vehiculos (nro_placa, modelo, color, fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica, id_linea, estado, imagen_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
                        data.nro_placa, data.modelo, data.color, data.fecha_vencimiento_seguro, data.fecha_vencimiento_tecnomecanica, data.id_linea, true, urlImage
                    ]);
                    const [results] = await connection.query("INSERT INTO vehiculos SET ?", save);
                    if ([results] && query.rowCount > 0) {
                        return h.response("¡Datos creados  con éxito!").code(200);
                    } else {
                        return h.response("No se encontro ningun registro").code(500);
                    }
                } catch (error) {
                    console.log(error.message)
                    return { "message": "Internal Server Error" }
                } finally {
                    cliente.release(true)
                }
            },
            options: {
                payload: {
                    multipart: true
                },
                tags: ['api', 'Vehiculo'],
                description: 'Crear un vehiculo',
            }
        })
        // Crear
        server.route({
            method: 'PUT',
            path: '/api/vehiculo/{nro_placa}',
            handler: async (request, h) => {
                const {nro_placa} = request.params;
                const data = request.payload
                console.log(data);
                const urlImage = ""
                if (data.urlImage) {
                    urlImage = await handleFileUpload(data.imagen_url, nro_placa)
                }
                else{
                    return urlImage
                }
                let save = {
                    ...data,
                    imagen_url: urlImage 
                }
                const cliente = await pool.connect()
                console.log(save);
                try {
                   /*  const query = await cliente.query('UPDATE vehiculos SET (modelo, color, fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica, id_linea, imagen_url) VALUES ($1, $2, $3, $4, $5, $6)', [
                        data.modelo, data.color, data.fecha_vencimiento_seguro, data.fecha_vencimiento_tecnomecanica, data.id_linea, urlImage
                    ]); */
                    const query = await cliente.query("UPDATE vehiculos SET ? WHERE nro_placa = ?;", [save, nro_placa]);
                    console.log(query);

                    const [results] = await connection.query("UPDATE vehiculos SET ? WHERE nro_placa = ?;", [save, nro_placa]);
                    console.log(results);
                    if ([results] && query.rowCount > 0) {
                        return h.response("¡Datos actualizados con éxito!").code(200);
                    } else {
                        return h.response("Error al actualizar los datos.").code(500);
                    }
                } catch (error) {
                    console.log(error.message)
                    return { "message": "Internal Server Error" }
                } finally {
                    cliente.release(true)
                }
            },
            options: {
                payload: {
                    multipart: true
                },
                tags: ['api', 'Vehiculo'],
                description: 'Crear un vehiculo',
            }
        })
        // Eliminar
        server.route({
            method: 'DELETE',
            path: '/api/vehiculo/{nro_placa}',
            handler: async (request, h) => {
                const { nro_placa } = request.params
                const cliente = await pool.connect()
                try {
                    const vehiculo = await cliente.query('SELECT imagen_url FROM vehiculos WHERE nro_placa = $1', [nro_placa])
                    const imagen_url = vehiculo.rows[0].imagen_url
                    const name_file = imagen_url.split('/')[imagen_url.split('/').length - 1]
                    const query = await cliente.query('DELETE FROM vehiculos WHERE nro_placa = $1', [nro_placa])
                    const [results] = await connection.query("DELETE FROM vehiculos WHERE nro_placa = ?;", [nro_placa]);
                    if (results && query.rowCount > 0) {
                        const deleteFileVehiculo = await deleteFile(name_file)
                        if (deleteFileVehiculo) {
                            return h.response("¡Datos eliminados con éxito!").code(200);
                        }
                    } else {
                        return h.response("Error al eliminar los datos.").code(500);
                    }
                } catch (error) {
                    console.log(error)
                    return { "message": "Internal Server Error" }
                } finally {
                    cliente.release(true)
                }
            },
        })
    }
}