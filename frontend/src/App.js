import CarForm from "./components/CarForm";
import CarsList from "./components/CarList";
import Cars from "./components/Cars";
import Chat from "./components/Chat";
import Join from "./components/Join";
import MarcasList from "./components/MarcasList";
import LineaList from "./components/LineaList";
import Menu from "./components/Navbar";
import Index from "./components/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { ProtectedRoute } from "./helpers/protected";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu />
        <Container>
          <Routes>
            <Route index path="/" element={<Index />} />
            <Route path="/join-chat" exact element={<Join />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/cotizacion" element={<Cars />} />
            <Route path="/vehiculos" element={<ProtectedRoute><CarsList /></ProtectedRoute>} />
            <Route path="/vehiculo/new" element={<ProtectedRoute><CarForm /></ProtectedRoute>} />
            <Route path="/vehiculo/:nro_placa/edit" element={<ProtectedRoute><CarForm /></ProtectedRoute>} />
            <Route path="/marcas" element={<ProtectedRoute><MarcasList /></ProtectedRoute>} />
            <Route path="/lineas" element={<ProtectedRoute><LineaList /></ProtectedRoute>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
