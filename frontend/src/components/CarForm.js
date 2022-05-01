import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { local, server } from "../helpers/api"
import axios from "axios";
import Swal from "sweetalert2"
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

const CarForm = () => {
  const [car, setCar] = useState({
    nro_placa: "",
    id_linea: "",
    color: "",
    modelo: "",
    fecha_vencimiento_seguro: "",
    fecha_vencimiento_tecnomecanica: ""
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [linea, setLinea] = useState([]);


  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.nro_placa) {
      loadCar(params.nro_placa);
    }
    loadLinea();
  }, [params.nro_placa]);

  const loadCar = async (nro_placa) => {
    const res = await fetch(`${server}api/vehiculo/${nro_placa}`);
    const data = await res.json();
    console.log(data);
    setCar({ nro_placa: data.nro_placa, id_linea: data.id_linea, color: data.color, modelo: data.modelo, fecha_vencimiento_seguro: data.fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica: data.fecha_vencimiento_tecnomecanica });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${server}api/vehiculo/${params.nro_placa}`, car, { headers: { "Content-Type": "application/json" } }).then((response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 1500
        })
        });
      } else {
        await axios.post(`${server}api/vehiculo`, car, { headers: { "Content-Type": "application/json" } }).then((response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 1500
        })
        });
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setCar({ ...car, [e.target.name]: e.target.value });

  const loadLinea = async () => {
    const response = await fetch(`${server}api/linea`);
    const dataLinea = await response.json();
    setLinea(dataLinea);
  };

  const years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const listItems = years.map((year) =>
    <MenuItem value={year}>{year}</MenuItem>
  );
  const listLinea = linea.map((item) =>
    <MenuItem value={item.id}>{item.descripcion}</MenuItem>
  );
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Actualizar Vehiculo" : "Crear Vehiculo"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Numero de placa"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nro_placa"
                onChange={handleChange}
                value={car.nro_placa}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <InputLabel
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                id="linea-id"  >Linea</InputLabel>
              <Select
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                variant="filled"
                label="Linea"
                name="id_linea"
                labelId="linea-id"
                id="linea-id"
                value={car.id_linea}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listLinea}

              </Select>
              <TextField
                variant="filled"
                label="Color del vehiculo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="color"
                onChange={handleChange}
                value={car.color}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <InputLabel
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                id="demo-select-small"  >Modelo</InputLabel>
              <Select
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                variant="filled"
                label="Modelo"
                name="modelo"
                labelId="demo-select-small"
                id="demo-select-small"
                value={car.modelo}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listItems}

              </Select>
              <InputLabel
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                id="fecha_vencimiento_seguro"  >Fecha de vencimiento seguro</InputLabel>
              <TextField
                name="fecha_vencimiento_seguro"
                value={car.fecha_vencimiento_seguro}
                type="date"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <InputLabel
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                id="fecha_vencimiento_tecnomecanica"  >Fecha de vencimiento tecnomecanica</InputLabel>
              <TextField
                name="fecha_vencimiento_tecnomecanica"
                value={car.fecha_vencimiento_tecnomecanica}
                type="date"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />


              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!car.nro_placa || !car.modelo || !car.color || !car.id_linea || !car.fecha_vencimiento_seguro || !car.fecha_vencimiento_tecnomecanica}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CarForm;
