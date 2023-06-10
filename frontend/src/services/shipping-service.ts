import axios from "axios";
import GHN from "../data/GHN";
import CheckoutDTO from "../type/CheckoutDTO";
import ShippingDTO from "../type/ShippingDTO";

let previewOrder = (checkoutDTO: CheckoutDTO) => {
  const data = {
    payment_type_id: 2,
    note: "",
    from_name: "Hommie Store",
    from_phone: "0934968393",
    from_address: " Lô E2a-7, Đường D1, Đ.01",
    from_ward_name: "Phường Long Thạnh Mỹ",
    from_district_name: "Quận 9",
    from_province_name: "TP Hồ Chí Minh",
    required_note: "CHOXEMHANGKHONGTHU",

    client_order_code: "",
    to_name: checkoutDTO.name || "Độ Mixi",
    to_phone: checkoutDTO.phone || "0909998877",
    to_address: checkoutDTO.address || "Streaming house",
    to_ward_code: checkoutDTO.wardCode.toString(),
    to_district_id: checkoutDTO.districtID.toString(),
    to_province_id: checkoutDTO.provinceID.toString(),
    // client_order_code: "",
    // to_name: "Độ Mixi",
    // to_phone: "0909998877",
    // to_address: "Streaming house",
    // to_ward_name: "Phường 14",
    // to_district_name: "Quận 10",
    // to_province_name: "TP Hồ Chí Minh",

    cod_amount:
      checkoutDTO.paymentMethod == 1
        ? checkoutDTO.carts.reduce((total, cart) => total + cart.total, 0)
        : 0,
    content: "HommieStore | Quà tặng đến bạn.",
    weight: 200,
    length: 10,
    width: 20,
    height: 10,
    pick_station_id: 1444,
    deliver_station_id: null,
    insurance_value: checkoutDTO.carts.reduce(
      (total, cart) => total + cart.total,
      0
    ),
    service_id: 0,
    service_type_id: 2,
    coupon: null,
    pick_shift: null,
    pickup_time: 1665272576,
    items: checkoutDTO.carts.map((cart) => ({
      name: cart.product.name,
      code: cart.product.id,
      quantity: cart.quantity,
      price: cart.product.price,
      length: 20,
      width: 200,
      height: 10,
      category: {
        level1: cart.product.categoryName,
      },
    })),
  };
  const url = GHN.orderUrls.preview;

  let result = {} as ShippingDTO;
  (async () => {
    await axios
      .post(url, data, {
        headers: { "Content-Type": "application/json", token: GHN.token },
      })
      .then((response) => {
        result = response.data as ShippingDTO;
      });
  })();

  return result;
};

export default {
  getPreviewOrder: previewOrder,
};
