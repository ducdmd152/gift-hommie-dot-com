import {
  Badge,
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import staffProductService, {
  StaffProductDTO,
} from "../../services/staff-product-service";
import { FieldValues, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "../../components/image/ImageUpload";
import useFetchCategories, {
  CategoryQuery,
} from "../../hooks/useFetchCategory";
import Swal from "sweetalert2";
import CategoryManagement from "../../components/staff/staff-product-list-page/CategoryManagement";
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
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories, setCategories } = useFetchCategories(query);
  const [status, setStatus] = useState(true);

  // FORM HANDLING
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const product = data as StaffProductDTO;
    product.id = 0;
    product.avatar = productAvatarURL;

    product.status = status;

    staffProductService
      .create(product)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tạo mới thành công.",
          showConfirmButton: false,
          timer: 1500,
        });
        setCurrentProductId(res.data.id);
        navigate("/product/detail");
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Không thể tạo mới. \n Vui lòng thử lại.",
          showConfirmButton: false,
          timer: 1500,
        });
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
              <Button
                type="submit"
                colorScheme="blue"
                size="md"
                onClick={handleSubmit(onSubmit)}
              >
                Hoàn tất
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                size="md"
                onClick={() => {
                  Swal.fire({
                    title: "Bạn muốn hủy tạo mới, thông tin sẽ không được lưu.",
                    // text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "orange",
                    cancelButtonColor: "gray",
                    confirmButtonText: "Có",
                    cancelButtonText: "Không",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      navigate("/product");
                    }
                  });
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
                  <HStack
                    w="100%"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <FormLabel size="md" fontWeight="bold" mt="3">
                      Tên sản phẩm
                    </FormLabel>
                    <HStack alignItems="center">
                      <Switch
                        size="lg"
                        isChecked={status}
                        onChange={() => {
                          setStatus(!status);
                        }}
                      />
                      <Text color="gray">Hiển thị</Text>
                    </HStack>
                  </HStack>
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
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    marginBottom={2}
                  >
                    <FormLabel size="md" fontWeight="bold">
                      Danh mục sản phẩm
                    </FormLabel>
                    <CategoryManagement
                      small={true}
                      updateCategories={(categories) => {
                        setCategories(categories);
                      }}
                      refresh={() => {}}
                    />
                  </HStack>

                  <Select
                    {...register("categoryId", { valueAsNumber: true })}
                    color="black"
                    placeholder="Lựa chọn danh mục"
                  >
                    {categories
                      .filter((category) => category.status)
                      .map((category) => (
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
