import { Card } from "@chakra-ui/card";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack, Heading, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import addressService from "../../services/address-service";
import ProvinceDTO from "../../type/ProvinceDTO";
import shippingService from "../../services/shipping-service";
import CheckoutDTO from "../../type/CheckoutDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { DeliveryFormData } from "../../pages/customer/CustomerCheckoutPage";
import { UseFormReturn } from "react-hook-form";

interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
  useFormReturn: UseFormReturn<DeliveryFormData>;
}
const CheckoutDeliveryInfo = ({
  checkoutData,
  setCheckoutData,
  useFormReturn,
}: Props) => {
  const carts = checkoutData.carts;

  // ADDRESS HANDLING
  const [provinces, setProvinces] = useState([] as ProvinceDTO[]);
  const [districts, setDistricts] = useState([] as DistrictDTO[]);
  const [wards, setWards] = useState([] as WardDTO[]);
  const setWard = (wardCode: number, wardName: string) => {
    const replace = { ...checkoutData, wardCode, wardName };
    setCheckoutData(replace);
    return replace;
  };
  const setDistrict = (districtID: number, districtName: string) => {
    const replace = { ...checkoutData, districtID, districtName };
    setCheckoutData(replace);
    return replace;
  };
  const setProvince = (provinceID: number, provinceName: string) => {
    const replace = { ...checkoutData, provinceID, provinceName };
    setCheckoutData(replace);
    setDistricts([] as DistrictDTO[]);
    setWards([] as WardDTO[]);
    return replace;
  };

  const loadDistricts = async (provinceID: number) => {
    // console.log("load.... " + provinceID);
    if (!provinceID) {
      setDistricts([] as DistrictDTO[]);
      setWards([] as WardDTO[]);
      return;
    }

    const res = await addressService.getDistricts(provinceID);
    setDistricts(res);
  };

  const loadWards = async (districtID: number) => {
    // console.log("load.... " + districtID);
    if (!districtID) {
      setWards([] as WardDTO[]);
      return;
    }

    const res = await addressService.getWards(districtID);
    setWards(res);
  };

  useEffect(() => {
    const loadProvinces = async () => {
      setProvinces(await addressService.getProvinces());
    };
    loadProvinces();
  }, []);

  console.log(checkoutData.wardCode);

  // FORM HANDLING
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormReturn;
  // UI
  return (
    <Card
      background="gray.100"
      w="100%"
      paddingX="4"
      paddingY="4"
      border="1px lightgray solid"
    >
      <Heading size="lg" textAlign="center" marginBottom="4">
        Thông tin nhận hàng
      </Heading>
      <VStack w="100%">
        <Card w="100%" p="4">
          <HStack justifyContent={"space-between"} w="100%">
            <FormControl>
              <FormLabel fontWeight="bold">Tên người nhận (*)</FormLabel>
              <Input type="text" {...register("name")} />

              <p className="form-error-message">
                {errors.name?.message || "‎ "}
              </p>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Số điện thoại (*)</FormLabel>
              <Input {...register("phone")} />

              <p className="form-error-message">
                {errors.phone?.message || "‎ "}
              </p>
            </FormControl>
          </HStack>
        </Card>

        <Card w="100%" p="4">
          <VStack width="100%" alignItems={"flex-start"} spacing="2">
            <FormLabel fontWeight="bold">Địa chỉ nhận hàng (*)</FormLabel>

            <HStack w="100%" justifyContent="space-between">
              <Select
                placeholder="Tỉnh/thành phố"
                size="md"
                onChange={(e) => {
                  let provinceID = parseInt(e.target.value);
                  setProvince(
                    provinceID,
                    e.target.options[e.target.selectedIndex].text
                  );

                  loadDistricts(provinceID);
                }}
              >
                {provinces.map((province) => (
                  <option key={province.ProvinceID} value={province.ProvinceID}>
                    {province.ProvinceName}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Quận/huyện"
                size="md"
                onChange={(e) => {
                  let districtID = parseInt(e.target.value);
                  setDistrict(
                    districtID,
                    e.target.options[e.target.selectedIndex].text
                  );
                  loadWards(districtID);
                }}
              >
                {districts.map((district) => (
                  <option key={district.DistrictID} value={district.DistrictID}>
                    {district.DistrictName}
                  </option>
                ))}
              </Select>
              <Select
                {...register("ward")}
                placeholder="Phường/xã"
                size="md"
                onChange={(e) => {
                  let wardCode = parseInt(e.target.value);
                  // console.log(wardCode);
                  shippingService.getPreviewOrder(
                    setWard(
                      wardCode,
                      e.target.options[e.target.selectedIndex].text
                    ),
                    setCheckoutData
                  );
                }}
              >
                {wards.map((ward) => (
                  <option key={ward.WardCode} value={ward.WardCode}>
                    {ward.WardName}
                  </option>
                ))}
              </Select>
            </HStack>
            <p className="form-error-message">
              {(isNaN(checkoutData.wardCode) || checkoutData.wardCode == 0) &&
                errors.ward?.message}
            </p>

            <Textarea
              {...register("address")}
              className="placeholeder-italic"
              placeholder="Địa chỉ cụ thể..."
            />

            <p className="form-error-message">
              {errors.address?.message || "‎ "}
            </p>
          </VStack>
        </Card>
        <Card w="100%" p="4">
          <FormLabel fontWeight="bold">Lời chúc, nhắn gửi</FormLabel>
          <Textarea
            {...register("message")}
            className="placeholeder-italic"
            placeholder="Gửi một lời chúc thân thương đến người thân yêu của bạn..."
          />
        </Card>
      </VStack>
    </Card>
  );
};

export default CheckoutDeliveryInfo;
