import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCategory = {
      name,
    };

    axios
      .post("http://localhost:8000/categories/", newCategory)
      .then((response) => {
        alert("Категория добавлена");
        setName("");
      })
      .catch((error) => console.error("Error, category not added", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Добавить новую категорию</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название категории"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained">Добавить категорию</Button>
      </form>
    </Container>
  );
};

export default AddCategory;
