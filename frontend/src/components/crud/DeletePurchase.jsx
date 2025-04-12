import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const DeletePurchase = () => {
  const { purchaseId } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/purchases/${purchaseId}`)
      .then((response) => {
        setPurchase(response.data)
      })
      .catch((error) => {
        console.error("Error loading purchase", error);
        navigate("/");
      });
  }, [purchaseId, navigate]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/purchases/${purchaseId}`)
      .then(() => {
        alert("Запись о покупке удалена");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting purchase", error);
        alert("Ошибка при удалении записи о покупке");
      });
  };

  if (!purchase) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Удаление записи о покупке
      </Typography>
      <Typography>Вы действительно хотите удалить запись о покупке 
        <strong> номер "{purchase.id}" 
        (Товар: {purchase.product.name}, 
        приобретший пользователь {purchase.user.username} 
        )
        </strong>?</Typography>

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
        onClick={() => navigate("/")}
      >
        Отмена
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Это действие необратимо. Удалить запись о покупке <strong>{purchase.id} (
              Товар: {purchase.product.name}, 
              приобретший пользователь {purchase.user.username} 
              )</strong>?
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

export default DeletePurchase;
