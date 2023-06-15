import { Box, HStack, VStack } from "@chakra-ui/layout";
import React, { useContext, useState } from "react";
import CheckoutDeliveryInfo from "../../components/checkout/CheckoutDeliveryInfo";
import CheckoutBillList from "../../components/checkout/CheckoutBillList";
import CheckoutPaymentSelector from "../../components/checkout/CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import CheckoutDTO from "../../type/CheckoutDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import checkoutService from "../../services/checkout-service";
import Swal from "sweetalert2";
import OrderDTO from "../../type/OrderDTO";
const schema = z.object({
  name: z
    .string({
      required_error: "Vui lòng nhập người nhận.",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập tên sản phẩm ít nhất 6 kí tự.",
    }),
  phone: z
    .string({
      required_error: "Vui lòng nhập số điện thoại nhận hàng.",
      invalid_type_error: "First name must be a string",
    })
    .regex(
      new RegExp(
        "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
      ),
      "Vui lòng kiểm tra lại số điện thoại."
    )
    .min(1, "Vui lòng nhập số điện thoại."),
  address: z
    .string({
      required_error: "Vui lòng nhập địa chỉ cụ thể (số nhà, tên đường,..).",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập địa chỉ cụ thể (số nhà, tên đường,..)",
    }),
  message: z.string({
    invalid_type_error: "First name must be a string",
  }),
  ward: z
    .string({
      required_error: "Vui lòng chọn đầy địa chỉ.",
      invalid_type_error: "Vui lòng chọn đầy địa chỉ.",
    })
    .regex(new RegExp("^[0-9]+$"), "Vui lòng chọn đầy địa chỉ."),
});

export type DeliveryFormData = z.infer<typeof schema>;
const CustomerCheckoutPage = () => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;
  let carts = selectedCartContext.getItems();
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    wardCode: 0,
    wardName: "",
    districtID: 0,
    districtName: "",
    provinceID: 0,
    provinceName: "",
    message: "",
    carts,
    paymentMethod: 1,
    shippingFee: 0,
    shippingMethod: 2,
  } as CheckoutDTO);

  // FORM HANDLING
  const useDisclosureReturn = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosureReturn;
  const navigate = useNavigate();
  const useFormReturn = useForm<DeliveryFormData>({
    resolver: zodResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormReturn;

  const onSubmit = (data: FieldValues) => {
    const checkoutInfo = data as CheckoutDTO;
    const submitData = {
      ...checkoutData,
      name: checkoutInfo.name,
      phone: checkoutInfo.phone,
      address: checkoutInfo.address,
      message: checkoutInfo.message,
    };

    if (submitData.paymentMethod == 1) {
      // COD
      // Call checkoutService
      console.log(" Call checkoutService : ", submitData);
      checkoutService
        .create(submitData)
        .then((response) => {
          const orderDTO = response.data as OrderDTO;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hệ thống gặp một vài lỗi trục trặc vui lòng thử lại!",
            footer: "<a>Liên hệ với shop để được hỗ trợ sớm nhất.</a>",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            console.log(window.location.pathname);
            navigate(window.location.pathname);
          }, 1900);
        });
    } else {
      setCheckoutData(submitData);
      onOpen(); // Call checkoutService inside Paypal Modal
    }

    // staffProductService
    //   .create(product)
    //   .then((res) => {
    //     setCurrentProductId(res.data.id);
    //     navigate("/product/detail");
    //   })
    //   .catch(() => {
    //     alert(
    //       `Không thể tạo mới sản phẩm "${product.name}". \n Vui lòng thử lại.`
    //     );
    //     navigate("/product/create");
    //   });
  };

  // UI
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p="2" marginBottom="8">
        <VStack spacing="4" paddingX="4">
          <HStack w="100%" spacing={"6"}>
            <Box flex="7">
              <CheckoutDeliveryInfo
                useFormReturn={useFormReturn}
                checkoutData={checkoutData}
                setCheckoutData={(data: CheckoutDTO) => {
                  setCheckoutData(data);
                }}
              />
            </Box>

            <Box flex="3" alignSelf={"flex-start"}>
              <CheckoutSummary
                useDisclosureReturn={useDisclosureReturn}
                useFormReturn={useFormReturn}
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
              />
            </Box>
          </HStack>

          <CheckoutBillList
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
          />
        </VStack>
      </Box>
    </form>
  );
};

export default CustomerCheckoutPage;
