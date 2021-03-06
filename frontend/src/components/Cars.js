import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageListItem, ImageList, ImageListItemBar, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { local, server } from "../helpers/api"
import axios from "axios"
import Swal from "sweetalert2"

const Cars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    const loadCars = async () => {
        await axios.get(`${local}api/vehiculo`).then((response) => {
            setCars(response.data);
        });
    };

    const successAlert = (placa) => {
        Swal.fire({
            title: "este",
            html: `
                <input class="swal2-input" id="fullname" type="text" placeholder="Ingrese su nombre completo" /><br />
                <input class="swal2-input" id="email" type="text" placeholder="Ingrese su correo" /><br />
                <input class="swal2-input" id="mobile" type="text" placeholder="Ingrese su numero celular" />
            `,
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputPlaceholder: "Input",
            showCancelButton: true,
            confirmButtonText: "Cotizar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                let full_name = document.getElementById('fullname').value
                let email = document.getElementById('email').value
                let mobile = document.getElementById('mobile').value
                await axios.post(`${server}api/usuario`, {
                    full_name,
                    email,
                    mobile,
                    placa
                }).then((result) => {
                    console.log("Entre al final del resultado", result.data);
                })
            },
            allowOutsideClick: () => Swal.isLoading()
        }).then((result) => {
            console.log("Entre al final del resultado", result);
            if (result.isConfirmed) {
                Swal.fire({
                    title: '??Muy pronto nos estaremos contactando con ud!'
                })
            }
        })

    }

    useEffect(() => {
        loadCars();
    }, []);

    return (
        <>
            <h1>NUESTROS VEH??CULOS</h1>
            <p>Selecciona el veh??culo de tu inter??s y cotizalo.</p>
            {/*<!--con??celo por completo-->*/}
            <ImageList cols={4} >
                {cars.map((car) => (
                    <ImageListItem key={car.imagen_url}>
                        <img
                            src={`${car.imagen_url || 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/test-and-target/segment-car.png?imwidth=960'}?w=248&fit=crop&auto=format`}
                            srcSet={`${car.imagen_url || 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/test-and-target/segment-car.png?imwidth=960'}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={car.nro_placa}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={car.marca}
                            subtitle={<span>modelo: {car.modelo}</span>}
                            position="below"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${car.marca}`}
                                    onClick={() => successAlert(car.nro_placa)}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default Cars;
