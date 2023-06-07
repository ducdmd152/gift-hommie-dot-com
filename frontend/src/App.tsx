import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Register from "./pages/guest/Register";
import Community from "./pages/staff/StaffProductListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffProductList from "./pages/staff/StaffProductListPage";
import StaffProductListPage from "./pages/staff/StaffProductListPage";
import { HttpUser } from "./services/user-service";
import StaffPage from "./pages/staff/StaffPage";
import UserDTO from "./type/UserDTO";
import GuestPage from "./pages/guest/GuestPage";
import ManagerPage from "./pages/manager/ManagerPage";
import CustomerPage from "./pages/customer/CustomerPage";
import utilService from "./services/util-service";

export interface GlobalContext {
  productContext: ProductContext;
  rerender: () => void;
}

export interface ProductContext {
  getProductId: () => number;
  setProductId: (productId: number) => number;
}

export const GLOBAL_CONTEXT = createContext({} as GlobalContext);

function App() {
  const [productId, setProductId] = useState(0);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [hook, setHook] = useState(false);

  const globalContext = useContext(GLOBAL_CONTEXT);
  globalContext.productContext = {
    getProductId() {
      return productId;
    },
    setProductId(id: number) {
      setProductId(id);
      return productId;
    },
  } as ProductContext;
  globalContext.rerender = () => {
    setHook(!hook);
  };

  // if (user == null) {
  //   const userJSON = sessionStorage.getItem("USER");
  //   if (userJSON) setUser(JSON.parse(userJSON) as UserDTO);
  // }

  const _userInStorage = utilService.getCurrentUser();
  if (user?.id != _userInStorage?.id || (_userInStorage?.id && user == null)) {
    setUser(_userInStorage);
  }

  // console.log(user?.authority);

  if (user == null) {
    return <GuestPage />;
  }

  if (user.authority == "ROLE_CUSTOMER") {
    return <CustomerPage />;
  }
  if (user.authority == "ROLE_STAFF") {
    return <StaffPage />;
  }

  if (user.authority == "ROLE_MANAGER") {
    return <ManagerPage />;
  }

  return <div>Welcome to the community</div>;
}

export default App;
