import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const DeleteCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories/${categoryName}`)
      .then((response) => setCategory(response.data))
      .catch((error) => {
        console.error("Error loading category", error);
        navigate("/categories/");
      });
  }, [categoryName, navigate]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/categories/${categoryName}`)
      .then(() => {
        alert("Категория удалена");
        navigate("/categories/");
      })
      .catch((error) => {
        console.error("Error deleting category", error);
        alert("Ошибка при удалении категории");
      });
  };

  if (!category) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Удаление категории
      </Typography>
      <Typography>Вы действительно хотите удалить категорию <strong>{category.name}</strong>?</Typography>

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
        onClick={() => navigate("/categories/")}
      >
        Отмена
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Это действие необратимо. Удалить категорию <strong>{category.name}</strong>?
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

export default DeleteCategory;
