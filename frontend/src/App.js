import CarForm from "./components/CarForm";
import CarsList from "./components/CarList";
import MarcasList from "./components/MarcasList";
import LineaList from "./components/LineaList";
import Menu from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route index path="/" element={<CarsList />} />
          <Route path="/vehiculo/new" element={<CarForm />} />
          <Route path="/vehiculo/:nro_placa/edit" element={<CarForm />} />
          <Route path="/marcas" element={<MarcasList />} />
          <Route path="/lineas" element={<LineaList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
