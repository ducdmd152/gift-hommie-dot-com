import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import staffProductService, {
  StaffProductDTO,
} from "../../services/staff-product-service";
import CATEGORIES from "../../data/Categories";
import { FieldValues, set, useForm } from "react-hook-form";

interface FormData extends StaffProductDTO {}
interface Props {
  setCurrentProductId: (id: number) => void;
}
const StaffProductCreatePage = ({ setCurrentProductId }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const product = data as StaffProductDTO;
    product.id = 0;
    staffProductService
      .create(product)
      .then((res) => {
        setCurrentProductId(res.data.id);
        navigate("/product/detail");
      })
      .catch(() => {
        alert(
          `Không thể tạo mới sản phẩm "${product.name}". \n Vui lòng thử lại.`
        );
        navigate("/product/create");
      });
  };

  return (
    <>
      <Link to="/product">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách sản phẩm"}
        </Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card marginX="12" marginY="8" p="8" border="1px lightgray solid">
          <HStack justifyContent="space-between">
            <VStack alignItems="start">
              <Badge variant="outline" display="inline-block">
                {"id >> " + "new"}
              </Badge>
              <HStack>
                <Heading size="lg" colorScheme="gray">
                  {"Create new product"}
                </Heading>
                <Badge colorScheme="blue" fontSize="md">
                  CREATE
                </Badge>
              </HStack>
            </VStack>

            <HStack>
              <Button type="submit" colorScheme="blue" size="md">
                Hoàn tất
              </Button>
              <Link to={"/product/detail"}>
                <Button colorScheme="red" variant="outline" size="md">
                  Hủy
                </Button>
              </Link>
            </HStack>
          </HStack>
          <VStack mt={6} p="4">
            <Flex width="100%" gap="8">
              <VStack spacing="8" flex="1">
                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Tên sản phẩm
                  </FormLabel>
                  <Input
                    {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="Tên sản phẩm..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Giá
                  </FormLabel>
                  <Input
                    {...register("price", { required: true, min: 1000 })}
                    color="black"
                    type="number"
                    min={1000}
                    placeholder="Giá..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Số lượng
                  </FormLabel>
                  <Input
                    {...register("quantity", {
                      required: true,
                      min: 0,
                    })}
                    color="black"
                    type="number"
                    min={0}
                    placeholder="Số lượng..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Danh mục sản phẩm
                  </FormLabel>
                  <Select
                    {...register("categoryId", {
                      required: true,
                    })}
                    required
                    color="black"
                    placeholder="Lựa chọn danh mục"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack flex="1" h="100%" px="8" spacing="8">
                <Box>
                  <Image
                    borderRadius="8px"
                    boxSize="100%"
                    objectFit="cover"
                    // src={product.avatar}
                  />
                </Box>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    IMAGE URL
                  </FormLabel>
                  <Input
                    isReadOnly
                    {...register("avatar", {
                      // required: true,
                    })}
                    color="black"
                    // value={product.avatar}
                    fontWeight="bold"
                  />
                </FormControl>
              </VStack>
            </Flex>
            <FormControl>
              <FormLabel size="md" fontWeight="bold" mt="4">
                Mô tả sản phẩm
              </FormLabel>
              <Textarea
                {...register("description", {
                  required: true,
                })}
                color="black"
                fontWeight="medium"
                fontStyle="italic"
                letterSpacing="1"
                placeholder="Mô tả sản phẩm..."
              />
            </FormControl>
          </VStack>
        </Card>
      </form>
    </>
  );
};

export default StaffProductCreatePage;
