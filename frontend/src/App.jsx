import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/crud/AddProductPage";
import AddBrandPage from "./pages/crud/AddBrandPage";
import AddCategoryPage from "./pages/crud/AddCategoryPage";
import AddUserPage from "./pages/crud/AddUserPage";
import UpdateUserPage from "./pages/crud/UpdateUserPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/brands/add" element={<AddBrandPage />} />
        <Route path="/categories/add" element={<AddCategoryPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/users/update/:username" element={<UpdateUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;