import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { Box, Typography, Button, Paper, Alert, Input, } from "@mui/material";


const AddImage = () => {
  const { productId } = useParams();
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`http://localhost:8000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить информацию о товаре");
      });
  }, [productId]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Выберите файл перед загрузкой");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      await axiosInstance.post("http://localhost:8000/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при загрузке изображения");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Загрузка изображения
      </Typography>

      {product && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1" sx={{ my: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Цена: {product.price} ₽
          </Typography>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={handleChange}
          inputProps={{ accept: "image/*" }}
          sx={{ mb: 2 }}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Загрузить
        </Button>
      </form>
    </Box>
  );

};

export default AddImage;
