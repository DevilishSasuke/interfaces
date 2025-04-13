import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import {
  TextField, Button, Container, Typography,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);


  useEffect(() => {
    axiosInstance.get("http://localhost:8000/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories", err));

    axiosInstance.get("http://localhost:8000/brands/")
      .then(res => setBrands(res.data))
      .catch(err => console.error("Error loading brands", err));

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parseFloat(price.replace(",", ".")) < 0) {
      alert("Price can not be negative");
      return;
    }

    const newProduct = {
      name,
      desc,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
      brand_id: parseInt(brandId),
    };

    axiosInstance
      .post("http://localhost:8000/products/", newProduct)
      .then((response) => alert("Товар добавлен"))
      .catch((error) => console.error("Error, product not added ", error));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Добавить новый товар</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <TextField
          label="Описание"
          fullWidth
          sx={{ mb: 2 }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <TextField
          label="Цена"
          type="number"
          fullWidth
          inputProps={{ min: 0, step: "1" }}
          sx={{ mb: 2 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            value={categoryId}
            label="Категория"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="brand-label">Бренд</InputLabel>
          <Select
            labelId="brand-label"
            value={brandId}
            label="Бренд"
            onChange={(e) => setBrandId(e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">Добавить товар</Button>
      </form>
    </Container>
  );
};

export default AddProduct;
