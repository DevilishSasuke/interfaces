import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { TextField, Button, Container, Typography, 
  MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  // Например, роль пользователя (admin, user и т.д.)

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      username,
      password,
      role,
    };

    axiosInstance
      .post("http://localhost:8000/users/", newUser)
      .then((response) => {
        alert("Пользователь добавлен!");
        setUsername("");
        setPassword("");
        setRole("");
      })
      .catch((error) => console.error("Error, user not added", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Добавить нового пользователя</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Роль</InputLabel>
          <Select
            value={role}
            label="Роль"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Администратор</MenuItem>
            <MenuItem value="manager">Менеджер</MenuItem>
            <MenuItem value="user">Пользователь</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Добавить пользователя</Button>
      </form>
    </Container>
  );
};

export default AddUser;
