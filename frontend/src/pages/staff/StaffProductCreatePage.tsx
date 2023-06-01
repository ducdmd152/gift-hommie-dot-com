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
import imageService from "../../services/image-service";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "../../components/image/ImageUpload";
const schema = z.object({
  name: z
    .string({
      required_error: "Vui lòng nhập tên sản phẩm.",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập tên sản phẩm ít nhất 6 kí tự.",
    }),
  avatar: z.string({
    required_error: "Vui lòng cập nhật ảnh sản phẩm.",
    invalid_type_error: "First name must be a string",
  }),
  description: z.string({
    required_error: "Vui lòng nhập thông tin mô tả sản phẩm.",
    invalid_type_error: "First name must be a string",
  }),
  price: z
    .number({
      required_error: "Vui lòng nhập giá sản phẩm.",
      invalid_type_error: "Vui lòng nhập giá sản phẩm.",
    })
    .min(0, {
      message: "Giá sản phẩm phải lớn hớn hoặc bằng 0",
    }),
  quantity: z
    .number({
      required_error: "Vui lòng nhập số lượng có sẵn.",
      invalid_type_error: "Vui lòng nhập số lượng có sẵn.",
    })
    .min(0, {
      message: "Số lượng sản phẩm phải lớn hớn hoặc bằng 0",
    }),
  categoryId: z
    .number({
      required_error: "Vui lòng chọn danh mục sản phẩm",
      invalid_type_error: "Vui lòng chọn danh mục sản phẩm",
    })
    .min(1, {
      message: "Vui lòng chọn danh mục sản phẩm",
    }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  setCurrentProductId: (id: number) => void;
}
const StaffProductCreatePage = ({ setCurrentProductId }: Props) => {
  const navigate = useNavigate();
  const [productAvatarURL, setProductAvatarURL] = useState<string>("");

  // FORM HANDLING
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const product = data as StaffProductDTO;
    console.log(product);
    product.id = 0;
    product.avatar = productAvatarURL;

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
                  {"Tạo mới sản phẩm"}
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
              <Button
                colorScheme="red"
                variant="outline"
                size="md"
                onClick={() => {
                  if (
                    confirm(
                      `Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.`
                    )
                  ) {
                    navigate("/product");
                  }
                }}
              >
                Hủy
              </Button>
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
                    {...register("name")}
                    color="black"
                    placeholder="Tên sản phẩm..."
                    fontWeight="bold"
                  />
                  {errors.name && (
                    <p className="form-error-message">{errors.name?.message}</p>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Giá
                  </FormLabel>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    color="black"
                    type="number"
                    placeholder="Giá..."
                    fontWeight="bold"
                  />
                  {errors.price && (
                    <p className="form-error-message">
                      {errors.price?.message}
                    </p>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Số lượng
                  </FormLabel>
                  <Input
                    {...register("quantity", { valueAsNumber: true })}
                    color="black"
                    type="number"
                    min={0}
                    placeholder="Số lượng..."
                    fontWeight="bold"
                  />
                  {errors.quantity && (
                    <p className="form-error-message">
                      {errors.quantity?.message}
                    </p>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Danh mục sản phẩm
                  </FormLabel>
                  <Select
                    {...register("categoryId", { valueAsNumber: true })}
                    color="black"
                    placeholder="Lựa chọn danh mục"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <p className="form-error-message">
                      {errors.categoryId?.message}
                    </p>
                  )}
                </FormControl>
              </VStack>
              <VStack flex="1" align="center" h="100%" pt="8" spacing="8">
                <ImageUpload
                  imageURL={productAvatarURL}
                  setImageURL={setProductAvatarURL}
                  getImageURL={(url) => {
                    setProductAvatarURL(url);
                  }}
                />
                <Input
                  hidden
                  {...register("avatar")}
                  value={productAvatarURL}
                />
                {/* <Box>
                  <Image
                    borderRadius="8px"
                    boxSize="240px"
                    objectFit="cover"
                    src={productAvatarURL}
                  />
                </Box>
                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    IMAGE URL
                  </FormLabel>
                  <Input
                    {...register("avatar")}
                    color="black"
                    value={productAvatarURL}
                    onChange={(event) => {
                      setProductAvatarURL(event.target.value);
                    }}
                    fontWeight="bold"
                  />
                </FormControl> */}
              </VStack>
            </Flex>
            <FormControl>
              <FormLabel size="md" fontWeight="bold" mt="4">
                Mô tả sản phẩm
              </FormLabel>
              <Textarea
                {...register("description")}
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
