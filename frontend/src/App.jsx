import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx"


// all crud pages 
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/crud/AddProductPage";
import AddBrandPage from "./pages/crud/AddBrandPage";
import AddCategoryPage from "./pages/crud/AddCategoryPage";
import AddUserPage from "./pages/crud/AddUserPage";
import UpdateProductPage from "./pages/crud/UpdateProductPage";
import UpdateBrandPage from "./pages/crud/UpdateBrandPage";
import UpdateCategoryPage from "./pages/crud/UpdateCategoryPage";
import UpdateUserPage from "./pages/crud/UpdateUserPage";
import DeleteProductPage from "./pages/crud/DeleteProductPage";
import DeleteBrandPage from "./pages/crud/DeleteBrandPage";
import DeleteCategoryPage from "./pages/crud/DeleteCategoryPage";
import DeleteUserPage from "./pages/crud/DeleteUserPage";
import DeletePurchasePage from "./pages/crud/DeletePurchasePage";
import ManageProductsPage from "./pages/manage/ManageProductsPage.jsx";
import ManageBrandsPage from "./pages/manage/ManageBrandsPage.jsx";
import ManageCategoriesPage from "./pages/manage/ManagecategoriesPage.jsx";
import ManageUsersPage from "./pages/manage/ManageUsersPage.jsx";
import ManagePurchasesPage from "./pages/manage/ManagePurchasesPage.jsx";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ManageProductsPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/upd/:productId" element={<UpdateProductPage />} />
        <Route path="/products/del/:productId" element={<DeleteProductPage />} />
        <Route path="/brands" element={<ManageBrandsPage />} />
        <Route path="/brands/add" element={<AddBrandPage />} />
        <Route path="/brands/upd/:brandName" element={<UpdateBrandPage />} />
        <Route path="/brands/del/:brandName" element={<DeleteBrandPage />} />
        <Route path="/cats" element={<ManageCategoriesPage />} />
        <Route path="/cats/add" element={<AddCategoryPage />} />
        <Route path="/cats/upd/:categoryName" element={<UpdateCategoryPage />} />
        <Route path="/cats/del/:categoryName" element={<DeleteCategoryPage />} />
        <Route path="/users" element={<ManageUsersPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/users/upd/:username" element={<UpdateUserPage />} />
        <Route path="/users/del/:username" element={<DeleteUserPage />} />
        <Route path="/purch" element={<ManagePurchasesPage />} />
        <Route path="/purch/del/:purchaseId" element={<DeletePurchasePage />} />
      </Routes>
    </Router>
  );
}

export default App;