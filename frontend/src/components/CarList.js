import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { local, server} from "../helpers/api"
import moment from 'moment';
import axios from "axios"
import Swal from "sweetalert2"

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const loadCars = async () => {
    await axios.get(`${server}api/vehiculo/all`).then((response) => {
      setCars(response.data);
    });
  };

  const handleDelete = async (nro_placa) => {
    try {
      await axios.delete(`${server}api/vehiculo/${nro_placa}`).then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: response.data,
          showConfirmButton: false,
          timer: 1500
      })
      });;
      setCars(cars.filter((car) => car.nro_placa !== nro_placa));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <>
      <h1>Vehiculos</h1>
      {cars.map((car) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>Placa: {car.nro_placa}</Typography>
              <Typography>Vencimiento de seguro: {moment(car.fecha_vencimiento_seguro).format('DD/MM/yyyy')}</Typography>
              <Typography>Vencimiento de tecnomecanica: {moment(car.fecha_vencimiento_tecnomecanica).format('DD/MM/yyyy')}</Typography>

            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/vehiculo/${car.nro_placa}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(car.nro_placa)}
                style={{ marginLeft: ".5rem" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CarsList;
