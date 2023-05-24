import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/staff/StaffProductListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffProductList from "./pages/staff/StaffProductListPage";
import StaffProductListPage from "./pages/staff/StaffProductListPage";
import { HttpUser } from "./services/user-service";
import StaffPage from "./pages/staff/StaffPage";

function App() {
  const [user, setUser] = useState<HttpUser | null>(null);
  const [route, setRoute] = useState("home");

  if (route === "home") {
    return <StaffPage />;
  }
  if (route === "login") return <Login />;
  if (route === "register") return <Register />;

  return <div>Welcome to the community</div>;
}

export default App;
