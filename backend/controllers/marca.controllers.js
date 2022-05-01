import moment from 'moment'

import { connect } from "../database";


export const getAll = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(`SELECT * FROM marca;`);
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
        let save = {
            ...data,
            estado: 1
        }
        console.log("Entre aca ", save);
        const [results] = await connection.query("INSERT INTO marca SET ?", save);
        console.log(results);
        return res.status(201).json(results);
    } catch (error) {
        console.error(error);
    }
}