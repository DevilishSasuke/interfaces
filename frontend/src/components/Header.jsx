import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import AdminMenu from "./AdminMenu";
import ManagerMenu from "./ManagerMenu";


const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Магазин
        </Typography>
        <Box>
          {user && user.role === "admin" && <AdminMenu />}
          {user && user.role === "manager" && <ManagerMenu />}
          {!user && (<>
            <Button color="inherit" onClick={() => navigate("/login")}>Войти</Button>
            <Button color="inherit" onClick={() => navigate("/register")}>Регистрация</Button>
          </>)}
          {user && (<>
          <Button color="inherit">{user.username}</Button>
          <Button color="inherit" onClick={() => navigate("/logout")}>Выйти</Button>
          </>)}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;