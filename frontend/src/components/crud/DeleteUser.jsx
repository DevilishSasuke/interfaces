import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const DeleteUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${username}`)
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error("Error loading user", error);
        navigate("/users/");
      });
  }, [username, navigate]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/users/${user.id}`)
      .then(() => {
        alert("Пользователь удалён");
        navigate("/users/");
      })
      .catch((error) => {
        console.error("Error deleting user", error);
        alert("Ошибка при удалении пользователя");
      });
  };

  if (!user) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Удаление пользователя
      </Typography>
      <Typography>Вы действительно хотите удалить пользователя <strong>{user.username}</strong>?</Typography>

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
        onClick={() => navigate("/users")}
      >
        Отмена
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Это действие необратимо. Удалить пользователя <strong>{user.username}</strong>?
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

export default DeleteUser;
