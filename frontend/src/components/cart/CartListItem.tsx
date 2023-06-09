import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import imageService from "../../services/image-service";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { red } from "@cloudinary/url-gen/actions/adjust";
import CartDTO from "../../type/CartDTO";
import ProductDTO from "../../type/ProductDTO";
import shopProductService, {
  ShopProductDTO,
} from "../../services/shop-product-service";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import cartActionSerivce from "../../services/cart-action-service";
import Swal from "sweetalert2";
import { GLOBAL_CONTEXT } from "../../App";

interface Props {
  cart: CartDTO;
  onDelete: (id: number) => void;
}

const CartListItem = ({ cart, onDelete }: Props) => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;

  const product = cart.product;

  // QUANTITY CASE HANDLING
  const quantityRef = useRef<HTMLInputElement>(null);
  const [currentQuantity, setCurrentQuantity] = useState(cart.quantity + 0);
  const updateQuantity = async (quantity: number) => {
    cart.quantity = quantity;

    if (quantityRef.current) {
      quantityRef.current.value = cart.quantity.toString();
    }

    cart = await cartActionSerivce.updateQuantityOf(cart);

    if (cart.quantity != quantity) {
      if (quantityRef.current) {
        quantityRef.current.value = cart.quantity.toString();
      }
      outOfQuantity();
    }

    setCurrentQuantity(cart.quantity);
  };

  const outOfQuantity = () => {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `Bạn đã chọn đủ ${product.quantity} sản phẩm có sẵn của sản phẩm.`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // useEffect(() => {
  //   shopProductService
  //     .get(cart.productId)
  //     .then((res) => {
  //       setProduct(res.data);
  //     })
  //     .catch((err) => {
  //       navigate("/cart");
  //     });
  // }, []);

  return (
    <Card width="100%" paddingX="6" paddingY="4" border="1px solid #dddd">
      <HStack spacing={4}>
        <Box>
          <Checkbox
            isChecked={selectedCartContext.isChecked(cart.id)}
            colorScheme="green"
            iconSize="32"
            border="1px solid lightgreen"
            borderRadius="6px"
            onChange={(e) => {
              let selected = e.target.checked;
              if (selected) {
                selectedCartContext.addItem(cart);
              } else {
                selectedCartContext.removeItem(cart);
              }
            }}
          ></Checkbox>
        </Box>

        <Image
          boxSize="100px"
          objectFit="cover"
          src={product.avatar || imageService.getDefaultProductAvatarURL()}
        />
        <VStack flex="1" alignItems={"start"} spacing="4" paddingRight="6">
          <Heading fontSize="xl">{product.name}</Heading>

          <HStack
            justifyContent={"space-between"}
            width="100%"
            maxWidth="320px"
          >
            <VStack>
              <Text userSelect="none">Đơn giá</Text>
              <Badge
                fontSize="16px"
                colorScheme="blue"
                paddingX="2"
                paddingY="1"
                variant="outline"
                className="none-text-transform"
              >
                {product.price / 1000 + ".000đ"}
              </Badge>
            </VStack>
            <VStack>
              <Text userSelect="none">Số lượng</Text>
              <Badge
                colorScheme="blue"
                // paddingX="2"
                padding="0"
                variant="outline"
                className="none-text-transform"
              >
                <HStack alignItems={"center"} spacing={0}>
                  <Box
                    color={currentQuantity < 2 ? "gray" : "unset"}
                    className="cursor-pointer"
                    _hover={{
                      transform: "scale(1.02)",
                      color: currentQuantity < 2 ? "gray" : "teal",
                    }}
                  >
                    <AiOutlineMinusSquare
                      size="32px"
                      onClick={() => {
                        let quantity = Math.max(currentQuantity - 1, 1);
                        quantity = Math.min(quantity, product.quantity);
                        updateQuantity(quantity);
                      }}
                    />
                  </Box>

                  <Input
                    ref={quantityRef}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      if (!value) {
                        // e.target.value = currentQuantity.toString();
                        return;
                      }
                      console.log(value);

                      updateQuantity(value);
                    }}
                    onBlur={(e) => {
                      let value = parseInt(e.target.value);
                      if (!value) {
                        e.target.value = currentQuantity.toString();
                        return;
                      }
                      updateQuantity(value);
                    }}
                    border={"unset"}
                    type="number"
                    defaultValue={currentQuantity}
                    height="32px"
                    width="32px"
                    color="black"
                    fontSize={"20px"}
                    p="0"
                    m="0"
                    textAlign="center"
                  />
                  <Box
                    className="cursor-pointer"
                    color={
                      currentQuantity >= product.quantity ? "gray" : "unset"
                    }
                    _hover={{
                      transform: "scale(1.02)",
                      color:
                        currentQuantity >= product.quantity ? "gray" : "unset",
                    }}
                    onClick={() => {
                      if (currentQuantity >= product.quantity) {
                        outOfQuantity();
                        return;
                      }
                      let quantity = Math.min(
                        currentQuantity + 1,
                        product.quantity
                      );
                      updateQuantity(quantity);
                    }}
                  >
                    <AiOutlinePlusSquare size="32px" />
                  </Box>
                </HStack>
              </Badge>
            </VStack>
            <VStack>
              <Text userSelect="none">Thành tiền</Text>
              <Badge
                fontSize="16px"
                colorScheme="blue"
                paddingX="2"
                paddingY="1"
                variant="outline"
                className="none-text-transform"
              >
                {(product.price * cart.quantity) / 1000 + ".000đ"}
              </Badge>
            </VStack>
          </HStack>
          {/* <HStack>
            <Badge fontSize="10" colorScheme="gray" variant="outline">
              {product.categoryName}
            </Badge>

            <Badge fontSize="10" colorScheme="gray" variant="outline">
              Yêu thích
            </Badge>

            <Badge fontSize="10" colorScheme="gray" variant="outline">
              Bán chạy
            </Badge>
          </HStack> */}
        </VStack>

        <Box paddingLeft="4">
          <Button
            variant="outline"
            colorScheme="gray"
            _hover={{
              border: "1px red solid",
              color: "red",
            }}
            p="1"
            onClick={() => {
              onDelete(cart.id);
            }}
          >
            <BsTrash color="inherit" size="16" className="danger-hover" />
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};

export default CartListItem;
