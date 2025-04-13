import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBrand = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8000/brands/${brandName}`)
      .then((response) => {
        const brand = response.data;
        setId(brand.id);
        setName(brand.name);
      })
      .catch((error) => console.error("Error loading brand", error));
  }, [brandName]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBrand = {
      id,
      name,
    };

    axiosInstance
      .put("http://localhost:8000/brands/", updatedBrand)
      .then((response) => {
        alert("Бренд обновлен");
        navigate("/brands/")
      })
      .catch((error) => console.error("Error updating brand", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Обновление бренда</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название бренда"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained">Обновить бренд</Button>
      </form>
    </Container>
  );
};

export default UpdateBrand;
