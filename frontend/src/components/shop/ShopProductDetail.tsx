import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcShipped } from "react-icons/fc";
import { SiFastify, SiGrab } from "react-icons/si";
import { BsFillCartPlusFill } from "react-icons/bs";
import { GLOBAL_CONTEXT } from "../../App";
import shopProductService, {
  ShopProductDTO,
} from "../../services/shop-product-service";
import utilService from "../../services/util-service";
import cartActionSerivce from "../../services/cart-action-service";
import Swal from "sweetalert2";
import ShopProductReview from "./ShopProductReview";
import shopProductServiceAdditional, {
  ProductAdditionalDTO,
} from "../../services/shop-product-service-additional";
import { Rating } from "react-simple-star-rating";
const ShopProductDetail = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const productContext = useContext(GLOBAL_CONTEXT).productContext;
  const id = productContext.getProductId();

  const [product, setProduct] = useState<ShopProductDTO>({} as ShopProductDTO);
  const [additional, setAdditional] = useState({} as ProductAdditionalDTO);

  const navigate = useNavigate();

  // fetch product from API
  useEffect(() => {
    if (id == null || id === undefined || id === 0) {
      navigate("/shop");
    }

    shopProductService
      .get(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        navigate("/shop");
      });
    (async () => {
      setAdditional(
        await shopProductServiceAdditional.getProductAdditional(id)
      );
    })();
  }, [id]);

  return (
    <Card paddingY="2" width="100%">
      <Box
        overflow="hidden"
        borderRadius="8"
        m="2"
        border="1px solid lightgray"
      >
        <Box p="2" objectFit="cover">
          <HStack alignItems="flex-start">
            <Box flex="4" minWidth="200px" padding="4">
              <Image
                minH="400px"
                maxH="500px"
                marginTop="4"
                boxSize="90%"
                objectFit="cover"
                borderRadius="8"
                src={product.avatar}
              />
            </Box>
            <VStack
              paddingTop="4"
              flex="6"
              h="100%"
              alignItems="flex-start"
              spacing="12"
            >
              <VStack spacing="2" paddingTop="4" alignItems="flex-start">
                <HStack
                  alignItems="flex-start"
                  flexGrow="false"
                  fontWeight="medium"
                >
                  <Heading fontSize="4xl" letterSpacing="1px">
                    {product.name}
                  </Heading>
                  <Badge colorScheme="red">Yêu thích</Badge>
                </HStack>
                <HStack mt="-1">
                  <Text mt="1">
                    <Rating
                      size={18}
                      allowFraction={true}
                      readonly={true}
                      initialValue={additional.rating}
                    />
                  </Text>

                  <Text>|</Text>
                  <Text>{additional.sold} đã bán</Text>
                  <Text>|</Text>
                  <Text>Bán chạy</Text>
                </HStack>
              </VStack>

              <HStack>
                <Badge
                  className="none-text-transform"
                  // variant="solid"
                  // colorScheme="gray"
                  fontSize="2xl"
                  fontWeight="light"
                  paddingX="2"
                >
                  Giá
                </Badge>
                <Badge
                  className="none-text-transform"
                  variant="subtle"
                  colorScheme="blue"
                  fontSize="2xl"
                >
                  {product.price / 1000 + ".000đ"}
                </Badge>
              </HStack>

              <HStack>
                <Badge
                  className="none-text-transform"
                  // variant="solid"
                  // colorScheme="gray"
                  fontSize="xl"
                  fontWeight="bold"
                  paddingX="2"
                >
                  {product.available > 0
                    ? product.available + " sản phẩm có sẵn sản phẩm có sẵn"
                    : "Sản phẩm tạm hết hàng"}
                </Badge>
              </HStack>

              <HStack spacing="4">
                <Badge
                  className="none-text-transform"
                  // variant="solid"
                  // colorScheme="gray"
                  fontSize="md"
                  fontWeight="light"
                  paddingX="2"
                >
                  Vận chuyển
                </Badge>
                <HStack>
                  <FcShipped size="32px" />
                  <SiGrab size="32px" color="green" />
                  <SiFastify size="32px" color="green" />
                </HStack>
              </HStack>
              <HStack>
                <Button
                  fontSize="xl"
                  colorScheme="blue"
                  variant="outline"
                  fontWeight="medium"
                  p="6"
                >
                  <HStack
                    spacing="1"
                    onClick={(e) => {
                      let x = window.screenX;
                      let y = window.screenY;
                      e.preventDefault();
                      if (!utilService.getCurrentUser()) navigate("/login");
                      else {
                        cartActionSerivce.addToCart(product.id);
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Đã thêm vào giỏ hàng",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      }
                      window.screenX = x;
                      window.screenY = y;
                    }}
                  >
                    <BsFillCartPlusFill size="24px" />
                    <Text>Thêm vào giỏ hàng</Text>
                  </HStack>
                </Button>

                <Button
                  p="6"
                  fontSize="xl"
                  colorScheme="blue"
                  fontWeight="medium"
                  isDisabled={product.available == 0}
                  onClick={async () => {
                    let cart = await cartActionSerivce.addToCart(product.id);

                    globalContext.selectedCartContext.addItem(cart);
                    navigate("/cart");
                  }}
                >
                  Mua ngay
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Box
          marginX="4"
          marginY="2"
          paddingY="4"
          paddingX="6"
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="8"
        >
          <Heading fontSize="lg" paddingY="2">
            Mô tả sản phẩm
          </Heading>
          <Text>{product.description}</Text>
        </Box>
      </Box>
      <Box borderRadius="8" m="2" border="1px solid lightgray" width="100%">
        <VStack width="100%" padding="4" spacing="4">
          <Heading fontSize="lg" textAlign="left" w="100%">
            ĐÁNH GIÁ SẢN PHẨM
          </Heading>
          <ShopProductReview />
        </VStack>
      </Box>
    </Card>
  );
};

export default ShopProductDetail;
