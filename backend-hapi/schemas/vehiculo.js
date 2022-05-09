const Joi = require('joi');

const bodySchemaVehiculo = Joi.object({
    nro_placa: Joi.string().max(6),
    id_linea: Joi.number().integer().required(),
    color: Joi.string().min(10).required(),
    modelo: Joi.number().max(4).required(),
    fecha_vencimiento_seguro: Joi.string().min(10).required(),
    fecha_vencimiento_tecnomecanica: Joi.string().min(10).required(),
    imagen_url: Joi.string().max(100),
})


const bodySchemaFvSeguro = Joi.object({
    fecha_inicio: Joi.string().min(10).required(),
    fecha_fin: Joi.string().min(10).required()
})

const bodySchemaModelo = Joi.object({
    modelo_inicio: Joi.number().min(4).required(),
    modelo_fin: Joi.number().min(4).required()
})

module.exports = { bodySchemaVehiculo, bodySchemaFvSeguro, bodySchemaModelo }