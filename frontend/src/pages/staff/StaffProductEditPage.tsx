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
import CATEGORIES from "../../data/Categories";
import { FieldValues, useForm } from "react-hook-form";
import ImageUpload from "../../components/image/ImageUpload";
import imageService from "../../services/image-service";
import useFetchCategories, {
  CategoryQuery,
} from "../../hooks/useFetchCategory";

interface Props {
  currentProductId: number | null;
}

interface ProductFormErrors {
  id: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
  categoryId: string;
  categoryName: string;
  avatar: string;

  available: string;
}
interface FormData extends StaffProductDTO {}

const StaffProductEditPage = ({ currentProductId }: Props) => {
  // FETCH DATA
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories, setCategories } = useFetchCategories(query);
  const [product, setProduct] = useState<StaffProductDTO>(
    {} as StaffProductDTO
  );
  const [errors, setErrors] = useState<ProductFormErrors>(
    {} as ProductFormErrors
  );
  const [productAvatarURL, setProductAvatarURL] = useState<string>(
    product.avatar
  );
  const navigate = useNavigate();
  const [name, setName] = useState("Product Name");
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
        setProductAvatarURL(res.data.avatar);
        setName(res.data.name);
      })
      .catch((err) => {
        navigate("/product");
      });
  }, []);

  // FORM HANDLING
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<FormData>();

  const onValid = () => {
    console.log(product);

    let isErrors = false;
    let tmpErrors = {} as ProductFormErrors;
    if (product.name.length == 0) {
      isErrors = true;
      tmpErrors.name = "Vui lòng nhập tên sản phẩm.";
    } else if (product.name.length < 6) {
      isErrors = true;
      tmpErrors.name = "Vui lòng nhập tên sản phẩm ít nhất 6 kí tự";
    }
    // if (product.description.length == 0) {
    // isErrors = true;
    //   setErrors({
    //     ...errors,
    //     description: "Vui lòng nhập thông tin mô tả sản phẩm.",
    //   });
    // } else else tmpErrors.description = "";

    if (product.price < 0) {
      isErrors = true;
      tmpErrors.price = "Vui lòng nhập giá sản phẩm hợp lệ.";
    } else tmpErrors.price = "";

    if (product.available < 0) {
      isErrors = true;
      tmpErrors.available = "Vui lòng nhập số lượng hợp lệ.";
    } else tmpErrors.available = "";
    if (product.categoryId < 0) {
      isErrors = true;
      tmpErrors.categoryId = "Vui lòng chọn danh mục.";
    } else tmpErrors.categoryId = "";
    setErrors(tmpErrors);
    if (isErrors) {
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    if (onValid()) {
      staffProductService
        .update(product)
        .then(() => {
          navigate("/product/detail");
        })
        .catch(() => {
          alert(
            `Không thể sửa thông của "${product.name}".\n Vui lòng thử lại.`
          );
        });
    }
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
          onSubmit();
        }}
      >
        <Card marginX="12" marginY="8" p="8" border="1px lightgray solid">
          <HStack justifyContent="space-between">
            <VStack alignItems="start">
              <Badge variant="outline" display="inline-block">
                {"id >> " + product.id}
              </Badge>
              <HStack>
                <Heading size="lg" colorScheme="gray">
                  {name}
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
                    navigate("/product/detail");
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

                {/* <HStack w="100%" justifyContent={"space-between"}> */}
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
                        isChecked={product.status}
                        onChange={() => {
                          setProduct({ ...product, status: !product.status });
                        }}
                      />
                      <Text color="gray">Hiển thị</Text>
                    </HStack>
                  </HStack>

                  <Input
                    onChange={(e) => {
                      // console.log(e.target.value.trim());

                      setProduct({
                        ...product,
                        name: e.target.value.trim(),
                      });
                      // console.log(product);
                      onValid();
                    }}
                    color="black"
                    defaultValue={product.name}
                    fontWeight="bold"
                  />
                  {errors.name && (
                    <p className="form-error-message">{errors.name}</p>
                  )}
                </FormControl>
                {/* <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Hiển thị
                  </FormLabel>
                  <Switch
                    size="lg"
                    isChecked={product.status}
                    onChange={() => {
                      setProduct({ ...product, status: !product.status });
                    }}
                  />
                </FormControl> */}
                {/* </HStack> */}
                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Danh mục sản phẩm
                  </FormLabel>
                  <Select
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      setProduct({
                        ...product,
                        categoryId: !value || value == 0 ? -1 : value,
                      });
                      onValid();
                    }}
                    // required
                    color="black"
                    placeholder="Lựa chọn danh mục"
                    value={product.categoryId}
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
                    <p className="form-error-message">{errors.categoryId}</p>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Giá
                  </FormLabel>
                  <Input
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      setProduct({
                        ...product,
                        price: !value ? -1 : value,
                      });
                      onValid();
                    }}
                    color="black"
                    type="number"
                    min={1000}
                    defaultValue={product.price}
                    fontWeight="bold"
                  />
                  {errors.price && (
                    <p className="form-error-message">{errors.price}</p>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Số lượng
                  </FormLabel>
                  <Input
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      setProduct({
                        ...product,
                        available: !value ? -1 : value,
                      });
                      onValid();
                    }}
                    color="black"
                    type="number"
                    min={0}
                    defaultValue={product.available}
                    fontWeight="bold"
                  />
                  {errors.available && (
                    <p className="form-error-message">{errors.available}</p>
                  )}
                </FormControl>
              </VStack>
              <VStack flex="1" h="100%" px="8" spacing="8">
                <ImageUpload
                  imageURL={productAvatarURL}
                  setImageURL={(url) => {
                    setProductAvatarURL(url);
                    setProduct({ ...product, avatar: url });
                  }}
                  getImageURL={(url) => {
                    setProductAvatarURL(url);
                    setProduct({ ...product, avatar: url });
                  }}
                />
                <Input hidden value={productAvatarURL} />
              </VStack>
            </Flex>
            <FormControl>
              <FormLabel size="md" fontWeight="bold" mt="4">
                Mô tả sản phẩm
              </FormLabel>
              <Textarea
                onChange={(e) => {
                  setProduct({
                    ...product,
                    description: e.target.value,
                  });
                  onValid();
                }}
                color="black"
                fontWeight="medium"
                fontStyle="italic"
                letterSpacing="1"
                defaultValue={product.description}
              />
              {errors.description && (
                <p className="form-error-message">{errors.description}</p>
              )}
            </FormControl>
          </VStack>
        </Card>
      </form>
    </>
  );
};

export default StaffProductEditPage;
