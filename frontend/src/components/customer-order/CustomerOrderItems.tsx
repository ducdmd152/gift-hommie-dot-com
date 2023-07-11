import {
  VStack,
} from "@chakra-ui/react";
import React from "react";


import CustomerOrderItem from "./CustomerOrderItem";
import OrderDetailDTO from "../../type/OrderDetailDTO";
interface Props {
  orderDetails: OrderDetailDTO[];
}
const CustomerOrderItems = ({ orderDetails }: Props) => {
  // //CODE FAKE DATA (TEMPORARY)
  // const [cartQuery, setCartQuery] = useState({} as CartQuery);
  // const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = orderDetails;
  return (
    <VStack spacing={"4"} w="100%">
      {items.map((item) => {
        return <CustomerOrderItem key={item.id} item={item} />;
      })}
    </VStack>
  );
};

export default CustomerOrderItems;
