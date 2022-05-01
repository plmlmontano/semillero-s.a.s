export const dateFormat = (data) => {
    return data.map(item => {
        return {
        nro_placa: item.nro_placa,
        id_linea: item.id_linea,
        color: item.color,
        modelo: item.modelo,
        fecha_vencimiento_seguro: item.fecha_vencimiento_seguro.toISOString().slice(0, 10),
        fecha_vencimiento_tecnomecanica: item.fecha_vencimiento_tecnomecanica.toISOString().slice(0, 10),
        estado: item.estado,
        date_create: item.date_create,
        date_update: item.date_update}
    })
}