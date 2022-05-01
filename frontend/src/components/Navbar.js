import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: '#eee'}}>
                Semillero S.A.S
              </Link>
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/lineas" style={{ textDecoration: "none", color: '#eee'}}>
                Lineas
              </Link>
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/marcas" style={{ textDecoration: "none", color: '#eee'}}>
                Marcas
              </Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/vehiculo/new")}
            >
              Crear nuevo vehiculo
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
