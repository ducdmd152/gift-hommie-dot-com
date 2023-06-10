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
import React, { useEffect, useState } from "react";
import addressService from "../../services/address-service";
import ProvinceDTO from "../../type/ProvinceDTO";

const CheckoutDeliveryInfo = () => {
  const [provinces, setProvinces] = useState([] as ProvinceDTO[]);
  const [districts, setDistricts] = useState([] as DistrictDTO[]);
  const [wards, setWards] = useState([] as WardDTO[]);
  const [ward, setWard] = useState(0);
  const [district, setDistrict] = useState(0);
  const [province, setProvince] = useState(0);

  const loadDistricts = async (provinceID: number) => {
    // console.log("load.... " + provinceID);
    if (!provinceID) {
      setDistricts([] as DistrictDTO[]);
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

  return (
    <Card w="100%" paddingX="4" paddingY="4" border="1px lightgray solid">
      <Heading size="lg" textAlign="center" marginBottom="4">
        Thông tin nhận hàng
      </Heading>
      <VStack w="100%">
        <Card w="100%" p="4">
          <HStack justifyContent={"space-between"} w="100%">
            <FormControl>
              <FormLabel fontWeight="bold">Tên người nhận (*)</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Số điện thoại (*)</FormLabel>
              <Input type="number" />
              {/* <FormHelperText>We'll never share your number.</FormHelperText> */}
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
                  setProvince(provinceID);
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
                  setDistrict(districtID);
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
                placeholder="Phường/xã"
                size="md"
                onChange={(e) => {
                  let wardCode = parseInt(e.target.value);
                  setWard(wardCode);
                  console.log(
                    "ADDRESS : " + province + " " + district + " " + wardCode
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

            <Textarea
              className="placeholeder-italic"
              placeholder="Địa chỉ cụ thể..."
            />
          </VStack>
        </Card>
        <Card w="100%" p="4">
          <FormLabel fontWeight="bold">Lời chúc, nhắn gửi</FormLabel>
          <Textarea
            className="placeholeder-italic"
            placeholder="Gửi một lời chúc thân thương đến người thân yêu nào..."
          />
        </Card>
      </VStack>
    </Card>
  );
};

export default CheckoutDeliveryInfo;
