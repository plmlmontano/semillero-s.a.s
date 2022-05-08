import { connect } from "../database";


export const getAll = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM usuarios;`);
        if (![results]) throw new Error('No se encontro ningun registro')
        return res.status(200).json(results);
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ errorMessage: error.message })
    }

};


export const save = async (req, res) => {
    try {
        const data = req.body;
        const connection = await connect();
        console.log("Entre aca ", data);
        const [results] = await connection.query("INSERT INTO usuarios SET ?", data);
        if (![results]) {
            return res.status(500).send("No se encontro ningun registro");
        } else {
            return res.status(200).json("¡Muy pronto nos estaremos contactando con ud!");
        }
    } catch (error) {
        console.error(error);
    }
}