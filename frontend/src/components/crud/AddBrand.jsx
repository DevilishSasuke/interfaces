import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const AddBrand = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBrand = {
      name,
    };

    axios
      .post("http://localhost:8000/brands/", newBrand)
      .then((response) => {
        alert("Бренд добавлен");
        setName("");
      })
      .catch((error) => console.error("Error, brand not added", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Добавить новый бренд</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название бренда"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained">Добавить бренд</Button>
      </form>
    </Container>
  );
};

export default AddBrand;
