import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const DeleteBrand = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8000/brands/${brandName}`)
      .then((response) => setBrand(response.data))
      .catch((error) => {
        console.error("Error loading brand", error);
        navigate("/brands/");
      });
  }, [brandName, navigate]);

  const handleDelete = () => {
    axiosInstance
      .delete(`http://localhost:8000/brands/${brandName}`)
      .then(() => {
        alert("Бренд удалён");
        navigate("/brands/");
      })
      .catch((error) => {
        console.error("Error deleting brand", error);
        alert("Ошибка при удалении бренда");
      });
  };

  if (!brand) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Удаление бренда
      </Typography>
      <Typography>Вы действительно хотите удалить бренд <strong>{brand.name}</strong>?</Typography>

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
        onClick={() => navigate("/brands/")}
      >
        Отмена
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Это действие необратимо. Удалить бренд <strong>{brand.name}</strong>?
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

export default DeleteBrand;
