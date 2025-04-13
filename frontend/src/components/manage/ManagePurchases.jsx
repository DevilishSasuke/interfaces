import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Button, TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/purchases/")
      .then(response => setPurchases(response.data))
      .catch(error => console.error("Error loading purchases", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"}}>
        Управление покупками
        <Button variant="contained" onClick={() => navigate("/purch/add")}>Добавить</Button>
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Купленный продукт</TableCell>
            <TableCell>Приобретший пользователь</TableCell>
            <TableCell>Количество товара</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.id}</TableCell>
              <TableCell>{purchase.product.name}</TableCell>
              <TableCell>{purchase.user.username}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => navigate(`/purch/del/${purchase.id}`)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManagePurchases;