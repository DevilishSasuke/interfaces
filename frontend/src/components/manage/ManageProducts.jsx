import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Button, TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/products/all")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error loading products", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"}}>
        Управление товарами
        <Button variant="contained" onClick={() => navigate("/products/add")}>Добавить</Button>
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Изображение</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Бренд</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Категория</TableCell>
            <TableCell>Действия</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
              { product.images?.[0]?.path ?
                (<img width="150px" height="150px" src={`http://localhost:8000${product.images[0].path}`} alt="Empty" />) :
                (<Button 
                onClick={() => navigate(`/img/add/${product.id}`)}
                style={{
                  width: "150px", height: "150px", border: "1px solid black",
                  fontWeight: "bold", fontSize: "100px", color: "grey",
                  }}>+</Button>)}
              { console.log(product.id) }
              { console.log(product.images.length) }
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>{product.desc}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/products/upd/${product.id}`)}>Обновить</Button>
                <Button color="error" onClick={() => navigate(`/products/del/${product.id}`)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageProducts;