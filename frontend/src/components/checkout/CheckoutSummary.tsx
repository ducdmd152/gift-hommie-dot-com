import { HStack, VStack, Text } from "@chakra-ui/layout";
import React from "react";
import CheckoutPaymentSelector from "./CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import CheckoutDTO from "../../type/CheckoutDTO";
import { Box } from "@chakra-ui/react";
import CheckoutPaymentModal from "./CheckoutPaymentModal";
import { UseFormReturn } from "react-hook-form";
import { DeliveryFormData } from "../../pages/customer/CustomerCheckoutPage";
export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

interface Props {
  useDisclosureReturn: UseDisclosureReturn;
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
  useFormReturn: UseFormReturn<DeliveryFormData>;
}
const CheckoutSummary = ({
  checkoutData,
  setCheckoutData,
  useFormReturn,
  useDisclosureReturn,
}: Props) => {
  let items = checkoutData.carts;

  let total = items.reduce((acc, item) => acc + item.total, 0);
  let shippingFee = checkoutData.shippingFee ? checkoutData.shippingFee : 0;
  let sum = total + shippingFee;

  // FORM HANDLING
  const { isOpen, onOpen, onClose } = useDisclosureReturn;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormReturn;

  // UI
  return (
    <Box>
      <Card p={2} background="gray.100">
        <CheckoutPaymentSelector
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
        <Box mt="2"></Box>
        <CheckoutShippingMethod
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
        <Card marginTop="2" p="4">
          {/* SUMMARY INFO */}
          <VStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Tổng tiền hàng
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(total / 1000).toFixed(3) + "đ"}
              </Text>
            </HStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Phí vận chuyển
                <br></br>
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(shippingFee / 1000).toFixed(3) + "đ"}
              </Text>
            </HStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Thành tiền
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(sum / 1000).toFixed(3) + "đ"}
              </Text>
            </HStack>
          </VStack>
        </Card>

        <HStack justifyContent={"center"}>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            marginTop="4"
            paddingX="8"
            w="100%"
          >
            Đặt hàng
          </Button>
        </HStack>
      </Card>
      <CheckoutPaymentModal
        checkoutData={checkoutData}
        setCheckoutData={setCheckoutData}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default CheckoutSummary;
