import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, 
  MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories/${categoryName}`)
      .then((response) => {
        const category = response.data;
        setId(category.id);
        setName(category.name);
      })
      .catch((error) => console.error("Error loading category", error));
  }, [categoryName]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCategory = {
      id,
      name,
    };

    axios
      .put("http://localhost:8000/categories/", updatedCategory)
      .then((response) => {
        alert("Категория обновлена");
        navigate("/categories/")
      })
      .catch((error) => console.error("Error updating category", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Обновление категории</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название категории"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained">Обновить категорию</Button>
      </form>
    </Container>
  );
};

export default UpdateCategory;
