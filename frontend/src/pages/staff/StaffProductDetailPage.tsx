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

interface Props {
  currentProductId: number | null;
}
const StaffProductDetailPage = ({ currentProductId }: Props) => {
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

  return (
    <>
      <Card m="12" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between">
          <VStack alignItems="start">
            <Badge variant="outline" display="inline-block">
              {"id >> 1"}
            </Badge>
            <HStack>
              <Heading size="lg" colorScheme="gray">
                {product.name}
              </Heading>
              <Badge colorScheme="green" fontSize="md">
                View
              </Badge>
            </HStack>
          </VStack>

          <HStack>
            <Link to={"/product/edit"}>
              <Button colorScheme="blue" size="md">
                Chỉnh sửa
              </Button>
            </Link>

            <Button colorScheme="red" size="md">
              Xóa
            </Button>
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
                  isReadOnly
                  color="gray"
                  value={product.name}
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Giá
                </FormLabel>
                <NumberInput
                  value={product.price}
                  isReadOnly
                  color="gray"
                  min={1000}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Số lượng
                </FormLabel>
                <NumberInput
                  value={product.quantity}
                  isReadOnly
                  color="gray"
                  min={0}
                >
                  <NumberInputField defaultValue={product.quantity} />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Danh mục sản phẩm
                </FormLabel>
                <Select
                  isDisabled
                  color="gray"
                  placeholder="Lựa chọn danh mục"
                  value={product.categoryId}
                >
                  <option value={product.categoryId}>
                    {product.categoryId}
                  </option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </VStack>
            <VStack flex="1" h="100%" px="8" spacing="8">
              <Box>
                <Image
                  borderRadius="8px"
                  boxSize="100%"
                  objectFit="cover"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
              </Box>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  IMAGE URL
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  value="P-001.png"
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
              isReadOnly
              color="gray"
              fontWeight="medium"
              fontStyle="italic"
              letterSpacing="1"
              value={product.description}
            />
          </FormControl>
        </VStack>
      </Card>
    </>
  );
};

export default StaffProductDetailPage;
