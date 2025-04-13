import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Button, TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageBrands = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/brands/")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error loading brands", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"}}>
        Управление брендами
        <Button variant="contained" onClick={() => navigate("/brands/add")}>Добавить</Button>
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/brands/upd/${brand.name}`)}>Обновить</Button>
                <Button color="error" onClick={() => navigate(`/brands/del/${brand.id}`)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageBrands;