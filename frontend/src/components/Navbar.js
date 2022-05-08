import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "../helpers/alert";

export default function ButtonAppBar() {
  const { loginWithGoogle, logout, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/vehiculos");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      {
        !user ? <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent">
            <Container>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/" style={{ textDecoration: "none", color: '#eee' }}>
                    Semillero S.A.S
                  </Link>
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/join-chat" style={{ textDecoration: "none", color: '#eee' }}>
                    Chat
                  </Link>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/cotizacion" style={{ textDecoration: "none", color: '#eee' }}>
                    Nuestros vehiculos
                  </Link>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoogleSignin}
                >
                  Iniciar sesion con google
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        </> : <><Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent">
            <Container>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/" style={{ textDecoration: "none", color: '#eee' }}>
                    Semillero S.A.S
                  </Link>
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/lineas" style={{ textDecoration: "none", color: '#eee' }}>
                    Lineas
                  </Link>
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/marcas" style={{ textDecoration: "none", color: '#eee' }}>
                    Marcas
                  </Link>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/join-chat" style={{ textDecoration: "none", color: '#eee' }}>
                    Chat
                  </Link>
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/vehiculo/new")}
                >
                  Crear nuevo vehiculo
                </Button>
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Cerrar sesion
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        </>
      }
    </div>
  );
}
