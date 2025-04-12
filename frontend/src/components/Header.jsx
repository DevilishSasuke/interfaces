import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AdminMenu from "./AdminMenu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Магазин
        </Typography>
        <Box>
          <AdminMenu />

          <Button color="inherit" onClick={() => navigate("/login")}>Войти</Button>
          <Button color="inherit" onClick={() => navigate("/register")}>Регистрация</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;