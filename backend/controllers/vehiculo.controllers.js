import { connect } from "../database";
import {dateFormat} from "../helpers/date"
// Listar vehiculos por medio de filtros entre marca y linea
export const getAll = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT a.nro_placa, c.descripcion marca, b.descripcion linea, a.color, a.modelo, DATE_FORMAT(a.fecha_vencimiento_seguro, '%d/%m/%Y') 'Fecha de vencimiento seguro', DATE_FORMAT(a.fecha_vencimiento_tecnomecanica, '%d/%m/%Y') 'Fecha de vencimiento tecnomecanica', a.estado 
        FROM vehiculos a
        LEFT JOIN linea b ON a.id_linea = b.id
        LEFT JOIN marca c ON b.id_marca = c.id;`);
        if (![results]) {
            return res.status(500).send("No se encontro ningun registro");
        } else {
            return res.status(200).json(results);
        }

    } catch (error) {
        console.error({ error });
        return res.status(500).json({ errorMessage: error.message })
    }

};

// Crear un vehiculo
export const save = async (req, res) => {
    try {
        const data = req.body;
        const connection = await connect();
        let save = {
            ...data,
            estado: 1
        }
        const [results] = await connection.query("INSERT INTO vehiculos SET ?", save);
        if (![results]) {
            return res.status(500).send("No se encontro ningun registro");
        } else {
            return res.status(200).json("¡Datos creados  con éxito!");
        }
    } catch (error) {
        console.error({ error });
        return res.status(500).json({ errorMessage: error.message })
    }
}

// Actulizar informacion de un vehiculo por medio de su placa
export const update = async (req, res) => {
    try {
        const placa = req.params.placa;
        const data = req.body;
        const connection = await connect();
        const [results] = await connection.query("UPDATE vehiculos SET ? WHERE nro_placa = ?;", [data, placa]);
        if (![results]) {
            return res.status(500).send("Error al actualizar los datos.");
        } else {
            return res.status(200).send("¡Datos actualizados con éxito!");
        }
    } catch (error) {
        console.error({ error });
        return res.status(500).json({ errorMessage: error.message })
    }
};

// Eliminar un vehiculo por medio de su placa
export const deleteByPlaca = async (req, res) => {
    try {
        const placa = req.params.placa;
        const connection = await connect();
        const [results] = await connection.query("DELETE FROM vehiculos WHERE nro_placa = ?;", [placa]);
        if (!results) {
            return res.status(500).send("Error al eliminar los datos.");
        } else {
            return res.status(200).send("¡Datos eliminados con éxito!");
        }

    } catch (error) {
        console.log({ error });
        return res.status(500).json({ errorMessage: error.message })
    }
};

// Lista de todos los vehiculos sin ninguna filtro.
export const all = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT * FROM vehiculos");
        const depureResult = dateFormat(results)
        if (![results]) {
            return res.status(500).send("No se encontro ningun registro");
        } else {
            return res.status(200).json(depureResult);
        }

    } catch (error) {
        console.error({ error });
        return res.status(500).json({ errorMessage: error.message })
    }

};

// Mostrar un vehiculo por medio de su placa
export const getByPlaca = async (req, res) => {
    try {
        const placa = req.params.placa;
        const connection = await connect();
        const [results] = await connection.query("SELECT * FROM vehiculos WHERE nro_placa = ?;", [placa]);
        const [depureResult] = dateFormat(results)
        if (!results) {
            return res.status(500).send("Error al eliminar los datos.");
        } else {
            return res.status(200).send(depureResult);
        }

    } catch (error) {
        console.log({ error });
        return res.status(500).json({ errorMessage: error.message })
    }
};