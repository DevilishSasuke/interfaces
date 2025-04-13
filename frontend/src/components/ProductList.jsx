import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  TextField, TablePagination, Box, Button,
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/products/", {
      params: {
        skip: (page - 1) * limit,
        limit: limit,
        name: search || undefined,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
      },
    })
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error loading products", error));
  }, [page, limit, search, minPrice, maxPrice]);

  const handlePurchase = async (productId) => {
    try {
      await axiosInstance.post("http://localhost:8000/purchases/", {
        product_id: productId,
        quantity: 1,
      });
      alert("Покупка успешно оформлена");
    } catch (error) {
      console.error("Error creating purchase ", error);
      alert("Ошибка при покупке");
    }
  }


  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Список товаров</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Поиск по названию"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <TextField
          label="Мин. цена"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
        />
        <TextField
          label="Макс. цена"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Изображение</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Бренд</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Категория</TableCell>
            <TableCell></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
              { product.images?.[0]?.path ?
              (<img width="150px" height="150px" src={`http://localhost:8000${product.images[0].path}`} alt="Error" />) :
              (<Button 
              onClick={() => {}}
              style={{
                width: "150px", height: "150px", border: "1px solid black",
                fontWeight: "bold", fontSize: "20px", color: "grey",
              }}>No image</Button>)}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>{product.desc}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>  
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePurchase(product.id)}>
                  Приобрести
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={1000}
        page={page - 1}
        onPageChange={(e, newPage) => setPage(newPage + 1)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(1);
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </TableContainer>
  );
};

export default ProductList; 