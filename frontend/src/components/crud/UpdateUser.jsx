import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, 
  MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${username}`)
      .then((response) => {
        const user = response.data;
        setRole(user.role);
      })
      .catch((error) => console.error("Error loading user", error));
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      username: username,
      role,
    };

    updatedUser.password = password ? password : "";

    axios
      .put(`http://localhost:8000/users/`, updatedUser)
      .then((response) => {
        alert("Данные пользователя обновлены");
        navigate("/users/");
      })
      .catch((error) => console.error("Error, user not updated", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Обновление данных пользователя</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          InputProps={{
            readOnly: true,
          }}
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

        <Button type="submit" variant="contained">Обновить данные пользователя</Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
