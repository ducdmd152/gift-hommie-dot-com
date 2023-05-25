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
import { Link, useNavigate } from "react-router-dom";
import staffProductService, {
  StaffProductDTO,
} from "../../services/staff-product-service";
import CATEGORIES from "../../data/Categories";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  currentProductId: number | null;
}

interface FormData extends StaffProductDTO {}

const StaffProductEditPage = ({ currentProductId }: Props) => {
  const [product, setProduct] = useState<StaffProductDTO>(
    {} as StaffProductDTO
  );
  const navigate = useNavigate();
  useEffect(() => {
    let id = 0;
    if (currentProductId == null || currentProductId === undefined) {
      navigate("/product");
    } else {
      id = currentProductId;
    }

    staffProductService
      .get(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        navigate("/product");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const updateProduct = data as StaffProductDTO;
    updateProduct.id = product.id;
    staffProductService
      .update(updateProduct)
      .then(() => {})
      .catch(() => {});
    navigate("/product/detail");
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
                {"id >> " + product.id}
              </Badge>
              <HStack>
                <Heading size="lg" colorScheme="gray">
                  {product.name}
                </Heading>
                <Badge colorScheme="yellow" fontSize="md">
                  Edit
                </Badge>
              </HStack>
            </VStack>

            <HStack>
              <Button type="submit" colorScheme="blue" size="md">
                Cập nhật
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
                    ID
                  </FormLabel>
                  <Input
                    value={product.id}
                    isDisabled
                    color="blue"
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Tên sản phẩm
                  </FormLabel>
                  <Input
                    {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    defaultValue={product.name}
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
                    defaultValue={product.price}
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
                    defaultValue={product.quantity}
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
                    value={product.categoryId}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        categoryId: parseInt(e.target.value),
                      })
                    }
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
                    src={product.avatar}
                    alt={product.name}
                  />
                </Box>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    IMAGE URL
                  </FormLabel>
                  <Input
                    isReadOnly
                    {...register("avatar", {
                      required: true,
                    })}
                    color="black"
                    value={product.avatar}
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
                value={product.description}
              />
            </FormControl>
          </VStack>
        </Card>
      </form>
    </>
  );
};

export default StaffProductEditPage;
