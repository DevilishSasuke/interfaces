import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/users/")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error loading users", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"}}>
        Управление пользователями
        <Button variant="contained" onClick={() => navigate("/users/add")}>Добавить</Button>
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Роль пользователя</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/users/upd/${user.username}`)}>Обновить</Button>
                <Button color="error" onClick={() => navigate(`/users/del/${user.username}`)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsers;