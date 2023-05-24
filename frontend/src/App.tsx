import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/staff/StaffProductListPage";
import { Route, Routes } from "react-router-dom";
import StaffProductList from "./pages/staff/StaffProductListPage";
import StaffProductListPage from "./pages/staff/StaffProductListPage";
import { HttpUser } from "./services/user-service";
import StaffPage from "./pages/staff/StaffPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<StaffProductListPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
