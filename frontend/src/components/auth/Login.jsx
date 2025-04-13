import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser_, setFlag } = useAuth(); 

  if (user) return <Navigate to="/" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    try { 
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const tokenResponse = await axiosInstance.post("http://localhost:8000/auth/token", params, { withCredentials: true });
      localStorage.setItem("access_token", tokenResponse.data.access_token);
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + tokenResponse.data.access_token;
      
      const userResponse = await axiosInstance.get("http://localhost:8000/users/me")
      setUser_(userResponse.data);
      setFlag(true);
      

      navigate("/");;
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
