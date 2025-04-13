import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); 

  if (user) return <Navigate to="/" />;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("http://localhost:8000/auth/register", {
        username,
        password,
      });
      alert("Пользователь зарегистрирован");
      navigate("/login");
    } catch (error) {
      alert("Ошибка регистрации");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>Регистрация</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Имя пользователя"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
};

export default Register;
