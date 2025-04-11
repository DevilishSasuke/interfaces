import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, 
  MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${productId}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setDesc(product.desc);
        setPrice(product.price);
        setCategoryId(product.category_id);
        setBrandId(product.brand_id);
      })
      .catch((error) => console.error("Error loading product", error));

      axios.get("http://localhost:8000/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories", err));

    axios.get("http://localhost:8000/brands/")
      .then(res => setBrands(res.data))
      .catch(err => console.error("Error loading brands", err));

  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parseFloat(price.replace(",", ".")) < 0) {
      alert("Price can not be negative");
      return;
    }

    const updatedProduct = {
      name,
      desc,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
      brand_id: parseInt(brandId),
    };

    axios
      .put("http://localhost:8000/products/", updatedProduct)
      .then((response) => {
        alert("Товар обновлен");
        navigate("/products/");
      })
      .catch((error) => console.error("Error updating product", error));
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Обновление товара</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Описание"
          variant="outlined"
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
        <Button type="submit" variant="contained">Обновить товар</Button>
      </form>
    </Container>
  );
};

export default UpdateProduct;