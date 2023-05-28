interface MyNavLink {
  label: string;
  link: string;
}
type tplotOptions = {
  [key: string]: Array<MyNavLink>;
};

const ROLE_NAV_LINKS: tplotOptions = {
  ROLE_STAFF: [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Quản lí sản phẩm",
      link: "/product",
    },
    {
      label: "Quản lí đơn hàng",
      link: "/order",
    },
  ],
  ROLE_MANAGER: [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Quản lí nhân viên",
      link: "/staff",
    },
    {
      label: "Thống kê",
      link: "/statistics",
    },
  ],
  GUEST: [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Cửa hàng",
      link: "/shop",
    },
    {
      label: "Đăng nhập",
      link: "/login",
    },
    {
      label: "Thông tin cửa hàng",
      link: "/about",
    },
  ],
};

export default ROLE_NAV_LINKS;
