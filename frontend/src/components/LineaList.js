import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { local, server} from "../helpers/api"
import axios from "axios"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LineasList = () => {
  const [linea, setLineas] = useState([]);
  const navigate = useNavigate();

  const loadLineas = async () => {
    await axios.get(`${server}api/linea`).then((response) => {
      setLineas(response.data);
    });
    
  };

  useEffect(() => {
    loadLineas();
  }, []);

  return (
    <>
      <h1>Lineas</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">Marca</StyledTableCell>
              <StyledTableCell align="right">Linea</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {linea.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.marca}</StyledTableCell>
                <StyledTableCell align="right">{row.descripcion}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LineasList;
