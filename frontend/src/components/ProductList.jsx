import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/products/")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error loading products:", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Список товаров</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Изображение</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Бренд</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Категория</TableCell>
            <TableCell>{/* button space */}</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>*coming soon*</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>{product.desc}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{/* button space */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList; 