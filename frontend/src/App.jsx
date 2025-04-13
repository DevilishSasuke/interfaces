import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx"

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

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

import AuthRoute from "./components/auth/AuthRoute.jsx";
import ManagerRoute from "./components/auth/ManagerRoute.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";

const managerRoutes = [
  { path: "/products", element: <ManageProductsPage /> },
  { path: "/products/add", element: <AddProductPage /> },
  { path: "/products/upd/:productId", element: <UpdateProductPage /> },
  { path: "/products/del/:productId", element: <DeleteProductPage /> },

  { path: "/brands", element: <ManageBrandsPage /> },
  { path: "/brands/add", element: <AddBrandPage /> },
  { path: "/brands/upd/:brandName", element: <UpdateBrandPage /> },
  { path: "/brands/del/:brandName", element: <DeleteBrandPage /> },

  { path: "/cats", element: <ManageCategoriesPage /> },
  { path: "/cats/add", element: <AddCategoryPage /> },
  { path: "/cats/upd/:categoryName", element: <UpdateCategoryPage /> },
  { path: "/cats/del/:categoryName", element: <DeleteCategoryPage /> },

  { path: "/purch", element: <ManagePurchasesPage /> },
  { path: "/purch/del/:purchaseId", element: <DeletePurchasePage /> },
];

const adminRoutes= [
  { path: "/users", element: <ManageUsersPage /> },
  { path: "/users/add", element: <AddUserPage /> },
  { path: "/users/upd/:username", element: <UpdateUserPage /> },
  { path: "/users/del/:username", element: <DeleteUserPage /> },
];

const authRoutes = [];


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />

        {managerRoutes.map(({ path, element }) => (
          <Route path={path} element=
          {<ManagerRoute> {element} </ManagerRoute>}
          />))}

        {adminRoutes.map(({ path, element }) => (
          <Route path={path} element=
          {<AdminRoute> {element} </AdminRoute>}
          />))}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {authRoutes.map(({ path, element }) => (
          <Route path={path} element=
          {<AuthRoute> {element} </AuthRoute>}
          />))}

      </Routes>
    </Router>
  );
}

export default App;