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
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import staffProductService, {
  StaffProductDTO,
} from "../../services/staff-product-service";
import { getCategoryName } from "../../data/Categories";

interface Props {
  currentProductId: number | null;
}
const StaffProductDetailPage = ({ currentProductId }: Props) => {
  const [product, setProduct] = useState<StaffProductDTO>(
    {} as StaffProductDTO
  );
  const navigate = useNavigate();

  // fetch product from API
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

  // delete product action
  const onDeleteProduct = (id: number) => {
    if (
      confirm(
        `Bạn có muốn xóa "${product.name}" khỏi danh sách sản phẩm không?`
      )
    ) {
      // Save it!
      staffProductService
        .delete(product.id)
        .then(() => {
          alert(`Đã xóa "${product.name}" khỏi danh sách sản phẩm.`);
          navigate("/product");
        })
        .catch(() => {
          alert(
            `Không thể xóa "${product.name}" khỏi danh sách sản phẩm. \n Vui lòng thử lại.`
          );
        });
    } else {
      // Do nothing!
    }
  };

  return (
    <>
      <Link to="/product">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách sản phẩm"}
        </Button>
      </Link>

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

            {/* <Button
              colorScheme="red"
              size="md"
              onClick={() => onDeleteProduct(product.id)}
            >
              Xóa
            </Button> */}
          </HStack>
        </HStack>
        <VStack mt={6} p="4">
          <Flex width="100%" gap="8">
            <VStack spacing="8" flex="1">
              {/* <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  ID
                </FormLabel>
                <Input
                  value={product.id}
                  isDisabled
                  color="blue"
                  fontWeight="bold"
                />
              </FormControl> */}

              <FormControl>
                <HStack
                  w="100%"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <FormLabel size="md" fontWeight="bold">
                    Tên sản phẩm
                  </FormLabel>
                  <HStack alignItems="center">
                    <Switch
                      isReadOnly={true}
                      size="lg"
                      isChecked={product.status}
                      onChange={() => {
                        setProduct({ ...product, status: !product.status });
                      }}
                    />
                    <Text color="gray">Hiển thị</Text>
                  </HStack>
                </HStack>

                <Input
                  isReadOnly
                  color="gray"
                  value={product.name}
                  fontWeight="bold"
                />
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
                    {getCategoryName(product.categoryId)}
                  </option>
                </Select>
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
                  value={product.available}
                  isReadOnly
                  color="gray"
                  min={0}
                >
                  <NumberInputField defaultValue={product.available} />
                </NumberInput>
              </FormControl>
            </VStack>
            <VStack flex="1" h="100%" px="8" spacing="8">
              <Box width="80%">
                <Image
                  width="100%"
                  borderRadius="8px"
                  height="280px"
                  objectFit="cover"
                  src={product.avatar}
                  alt={product.name}
                />
              </Box>
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
