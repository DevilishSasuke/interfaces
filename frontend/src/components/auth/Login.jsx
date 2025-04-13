import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); 

  if (user) return <Navigate to="/" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const tokenResponse = await axios.post("http://localhost:8000/auth/token", new URLSearchParams({
        username,
        password
      }), { withCredentials: true });
      localStorage.setItem("access_token", tokenResponse.data.access_token)
      console.log(tokenResponse.data.access_token)
      navigate("/");
    } catch (error) {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>Вход</Typography>
      <form onSubmit={handleLogin}>
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
          Войти
        </Button>
      </form>
    </Container>
  );
};

export default Login;
