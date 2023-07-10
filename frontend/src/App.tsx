import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Register from "./pages/guest/Register";
import Community from "./pages/staff/StaffProductListPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import StaffProductList from "./pages/staff/StaffProductListPage";
import StaffProductListPage from "./pages/staff/StaffProductListPage";
import { HttpUser } from "./services/user-service";
import StaffPage from "./pages/staff/StaffPage";
import UserDTO from "./type/UserDTO";
import GuestPage from "./pages/guest/GuestPage";
import ManagerPage from "./pages/manager/ManagerPage";
import CustomerPage from "./pages/customer/CustomerPage";
import utilService from "./services/util-service";
import CartDTO from "./type/CartDTO";
import authService from "./services/auth-service";

export interface GlobalContext {
  productContext: ProductContext;
  orderContext: OrderContext;
  rerender: () => void;
  selectedCartContext: SelectedCartContext;
  userContext: UserContext;
}

export interface ProductContext {
  getProductId: () => number;
  setProductId: (productId: number) => number;
}

export interface UserContext {
  getUserId: () => string;
  setUserId: (id: string) => string;
}

export interface OrderContext {
  getOrderId: () => number;
  setOrderId: (orderId: number) => number;
}

export interface SelectedCartContext {
  getItems: () => CartDTO[];
  addItem: (cart: CartDTO) => void;
  updateItem: (cart: CartDTO) => void;
  removeItem: (cart: CartDTO) => void;
  isChecked: (cartId: number) => boolean;
  clean: () => void;
}

export const GLOBAL_CONTEXT = createContext({} as GlobalContext);

function App() {
  const [productId, setProductId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<UserDTO | null>(null);
  const [hook, setHook] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([] as CartDTO[]);

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

  globalContext.orderContext = {
    getOrderId() {
      return orderId;
    },
    setOrderId(id: number) {
      setOrderId(id);
      return orderId;
    },
  } as OrderContext;

  globalContext.userContext = {
    getUserId() {
      return userId;
    },
    setUserId(id: string) {
      setUserId(id);
      return userId;
    },
  } as UserContext;

  globalContext.rerender = () => {
    setHook(!hook);
  };
  globalContext.selectedCartContext = {
    clean() {
      setSelectedCartItems([] as CartDTO[]);
    },
    getItems() {
      return selectedCartItems;
    },
    updateItem(item) {
      if (item.quantity <= 0)
        setSelectedCartItems([
          ...selectedCartItems.filter((cart) => cart.id !== item.id),
        ]);
      setSelectedCartItems([
        ...selectedCartItems.filter((cart) => cart.id !== item.id),
        item,
      ]);
    },
    addItem(item) {
      if (item.quantity <= 0) return;
      if (selectedCartItems.find((cart) => cart.id === item.id)) return;
      setSelectedCartItems([...selectedCartItems, item]);
    },
    removeItem(item) {
      if (!selectedCartItems.find((cart) => cart.id === item.id)) return;
      setSelectedCartItems(
        selectedCartItems.filter((cart) => cart.id !== item.id)
      );
    },
    isChecked(cartId: number) {
      if (selectedCartItems.find((cart) => cart.id === cartId)) return true;
      return false;
    },
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

  const navigate = useNavigate();

  if (user == null) {
    return <GuestPage />;
  }

  if (user != null) {
    const checkLogin = async () => {
      const { username, password } = { ...user };
      let res = await authService.enabled(
        username as string,
        password as string
      );
      if (res == false) {
        utilService.logout();
        setUser(null);
        navigate("/login");
      }
    };
    (async () => {
      await checkLogin();
    })();
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
