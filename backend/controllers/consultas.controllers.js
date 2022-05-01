import { connect } from "../database";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns results
 * 
 * En este espacio encontras todas las consultas que se mencionan en el siguiente archivo.
 * URL: https://docs.google.com/document/d/1o6GBIRZPNU-CZYMuantazmjiGd5VnKmq_EeEMPUhHS4/edit?usp=
 * 
 */

/* Consulta de Vehiculos */

// contar todos los registros de los vehiculos
export const count = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT count(*) FROM vehiculos");
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
 // Un servicio que me permita consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO.
export const rangeDate = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM vehiculos WHERE fecha_vencimiento_seguro BETWEEN '2020-10-09' AND '2021-04-23';
        `);
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

// Un servicio que me permita realizar una consulta única que tenga las siguientes columnas: NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traer todos los registros de la tabla donde almacenes los vehículos que se encuentren en el estado S en el campo activo de la tabla donde se almacene las líneas.
export const estate = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT nro_placa, modelo, b.descripcion 'Marca', c.descripcion 'Linea', IF(c.estado, 'Si','No') 'Estado de linea', IF(b.estado, 'Si', 'No') 'Estado de marca'
        FROM vehiculos a, marca b, linea c
        WHERE b.id=c.id_marca AND c.id=a.id_linea AND c.estado=TRUE AND b.estado=TRUE;`);
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

/* Consulta de lineas */
// Un servicio que me permita realizar una única consulta para saber cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas .
// Estado = SI
export const estateLineasTrue = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM linea a
        INNER JOIN vehiculos b ON b.id_linea = a.id
        WHERE a.estado = TRUE;`);
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
// Estado = NO
export const estateLineasFalse = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM linea a
        INNER JOIN vehiculos b ON b.id_linea = a.id
        WHERE a.estado = FALSE;`);
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


// Mostrar cuantas lineas estan en estado activa o inactivas
// Activas
export const countLineaTrue = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT COUNT(*) FROM linea WHERE estado = TRUE;");
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
// Desactivadas
export const countLineaFalse = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT COUNT(*) FROM linea WHERE estado = FALSE;");
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


/* Consulta de modelos */

// Un servicio que me permita saber cuál es el modelo máximo almacenado y el mínimo.
export const maxMin = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT MAX(modelo) AS 'Modelo maximo', MIN(modelo) AS 'modelo minimo' FROM vehiculos;`);
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

// -- Un servicio que me permita consultar todos los vehículos por un rango de modelos por el campo modelo.
// V1
export const rangeModeloV1 = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM vehiculos WHERE modelo >= '2000' AND modelo <= '2024';
        `);
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
// V2
export const rangeModeloV2 = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM vehiculos WHERE modelo BETWEEN '2000' AND '2009';
        `);
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

// Suma de los modelos 
export const sumModel = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT SUM(modelo) 'Suma de modelos' from vehiculos;");
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

// Promedio de los modelos
export const averageModel = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("SELECT AVG(modelo) 'Promedio' FROM vehiculos;");
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
