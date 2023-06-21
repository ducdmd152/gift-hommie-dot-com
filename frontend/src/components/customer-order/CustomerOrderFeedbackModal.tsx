import {
  Button,
  Card,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Box,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import OrderDTO from "../../type/OrderDTO";
import OrderDetailDTO from "../../type/OrderDetailDTO";
import { CheckoutBillItem } from "../checkout/CheckoutBillList";
import ProductDTO from "../../type/ProductDTO";
import { Link } from "react-router-dom";
import { GLOBAL_CONTEXT } from "../../App";
import { Rating } from "react-simple-star-rating";
interface Props {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const CustomerOrderFeedbackModal = ({
  isOpen,
  onOpen,
  onClose,
  order,
  setOrder,
}: Props) => {
  const [index, setIndex] = useState(0);
  const getCurrentOrderDetail = () => {
    // if (!order.orderDetails?.length) return null;
    // if (index > order.orderDetails.length) return null;
    return order.orderDetails[index];
  };

  //   const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    getCurrentOrderDetail().rating = rate;
  };

  const onChangeComment = (comment: string) => {
    getCurrentOrderDetail().comment = comment;
  };

  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={false}>
      <ModalOverlay />
      <ModalContent
        maxH="400px"
        maxW="600px"
        style={{ overflowY: "scroll", height: "90vh" }}
      >
        <ModalHeader>Đánh giá sản phẩm</ModalHeader>
        <ModalCloseButton zIndex={4} />
        <ModalBody>
          <Card p="2">
            <Card>
              <ProductItem product={getCurrentOrderDetail().product} />
            </Card>

            <VStack textAlign={"center"} w="100%" spacing="2" mt="4">
              <Rating
                transition
                onClick={handleRating}
                //   onPointerEnter={onPointerEnter}
                //   onPointerLeave={onPointerLeave}
                //   onPointerMove={onPointerMove}
              />

              <Textarea
                _placeholder={{
                  fontStyle: "italic",
                }}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                onChange={(e) => onChangeComment(e.target.value)}
              ></Textarea>
            </VStack>
          </Card>
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
          {index + 1 == order.orderDetails.length && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // update
                // inform success/fail
                // onClose();
              }}
            >
              Hoàn thành
            </Button>
          )}
          {index + 1 < order.orderDetails.length && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setIndex(index + 1);
              }}
            >
              Tiếp tục
            </Button>
          )}
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerOrderFeedbackModal;

const ProductItem = ({ product }: { product: ProductDTO }) => {
  const productContext = useContext(GLOBAL_CONTEXT).productContext;
  return (
    <Link
      to="/shop/detail"
      onClick={() => {
        productContext.setProductId(product.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <HStack>
        <HStack spacing="2" className="product-card">
          <Image
            borderRadius={"8px"}
            boxSize="50px"
            objectFit="cover"
            src={product.avatar}
          />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray"
            letterSpacing="2px"
          >
            {product.name.toUpperCase()}
          </Text>
        </HStack>
      </HStack>
    </Link>
  );
};
