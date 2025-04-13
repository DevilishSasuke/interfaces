import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8000/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error("Error loading product", error);
        navigate("/products/");
      });
  }, [productId, navigate]);

  const handleDelete = () => {
    axiosInstance
      .delete(`http://localhost:8000/products/${productId}`)
      .then(() => {
        alert("Товар удалён");
        navigate("/products/");
      })
      .catch((error) => {
        console.error("Error deleting product", error);
        alert("Ошибка при удалении товара");
      });
  };

  if (!product) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Удаление товара
      </Typography>
      <Typography>Вы действительно хотите удалить товар <strong>{product.name}</strong>?</Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => setOpen(true)}
      >
        Удалить
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigate("/products/")}
      >
        Отмена
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Это действие необратимо. Удалить товар <strong>{product.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteProduct;
