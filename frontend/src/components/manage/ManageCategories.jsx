import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Button, TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/categories/")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error loading categories", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"}}>
        Управление категориями
        <Button variant="contained" onClick={() => navigate("/cats/add")}>Добавить</Button>
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/cats/upd/${category.name}`)}>Обновить</Button>
                <Button color="error" onClick={() => navigate(`/cats/del/${category.id}`)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageCategories;