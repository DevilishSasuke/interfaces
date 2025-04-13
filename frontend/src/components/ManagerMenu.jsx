import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagerMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleNavigate = (path) => {
      navigate(path);
      handleMenuClose();
    };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleMenuClick}
      >
        Управление
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigate("/brands")}>Бренды</MenuItem>
        <MenuItem onClick={() => handleNavigate("/cats")}>Категории</MenuItem>
        <MenuItem onClick={() => handleNavigate("/products")}>Товары</MenuItem>
        <MenuItem onClick={() => handleNavigate("/purch")}>Покупки</MenuItem>
      </Menu>
      </>
  );
};

export default ManagerMenu;