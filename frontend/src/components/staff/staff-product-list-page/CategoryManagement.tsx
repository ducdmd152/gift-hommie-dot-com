import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useFetchCategories, {
  CategoryQuery,
} from "../../../hooks/useFetchCategory";
import Swal from "sweetalert2";
import categoryService from "../../../services/category-service";
import CategoryDTO from "../../../type/CategoryDTO";
import { useNavigate } from "react-router-dom";
// interface Props {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }
// const CategoryManagement = ({ isOpen, onOpen, onClose }: Props) => {
const CategoryManagement = ({
  updateCategories,
  refresh,
}: {
  updateCategories: (categories: CategoryDTO[]) => void;
  refresh: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories, setCategories } = useFetchCategories(query);
  const [newCate, setNewCate] = useState("");
  const [updateCate, setUpdateCate] = useState({} as CategoryDTO);
  const navigate = useNavigate();

  const onUpdate = (id: number) => {
    categoryService
      .update(updateCate)
      .then(() => {
        setCategories(
          categories.map((c) => (c.id == updateCate.id ? updateCate : c))
        );
        onEditClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thành công.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Không thể chỉnh sửa. \n Vui lòng thử lại.",
          showConfirmButton: true,
        });
      });
  };
  const onStatus = (category: CategoryDTO, status: boolean) => {
    let cate = category;
    if (status == false)
      Swal.fire({
        title: "Bạn thực sự muốn \n ẩn danh mục?",
        text: "Các sản phẩm liên quan cũng sẽ được ẩn, \n khi danh mục ẩn.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "gray",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await categoryService
            .update({ ...category, status })
            .then((res) => {
              cate = res.data;
              setCategories(
                categories.map((ca) => (ca.id == cate.id ? cate : ca))
              );
              updateCategories(
                categories.map((ca) => (ca.id == cate.id ? cate : ca))
              );
              Swal.fire({
                title: "Đã ẩn danh mục " + category.name + ".",
                text: "Các sản phẩm liên quan cũng sẽ được ẩn, khi danh mục ẩn.",
                icon: "info",
                showConfirmButton: false,
                timer: 2200,
              });
            })
            .catch((error) => {
              alert("Không thể ẩn danh mục.");
            });
        }
      });
    else {
      (async () => {
        await categoryService
          .update({ ...category, status })
          .then((res) => {
            cate = res.data;
            setCategories(
              categories.map((ca) => (ca.id == cate.id ? cate : ca))
            );
            updateCategories(
              categories.map((ca) => (ca.id == cate.id ? cate : ca))
            );
            Swal.fire({
              title: "Đã hiện danh mục " + category.name + ".",
              text: "Các sản phẩm liên quan cũng sẽ được hiện trong cửa hàng.",
              icon: "info",
              showConfirmButton: false,
              timer: 2200,
            });
          })
          .catch((error) => {
            alert("Không thể ẩn danh mục.");
          });
      })();
    }
  };

  const onsubmit = () => {
    categoryService
      .create({ id: 0, name: newCate, status: true } as CategoryDTO)
      .then((res) => {
        const cate = res.data as CategoryDTO;
        setNewCate("");
        setCategories([cate, ...categories]);

        Swal.fire({
          title: "Đã thêm " + newCate + " vào danh mục sản phẩm.",
          icon: "info",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Không thể thêm danh mục " + newCate + ".",
          icon: "info",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
  return (
    <>
      <Button colorScheme="teal" size="md" onClick={() => onOpen()}>
        Quản lý danh mục
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={false}>
        <ModalOverlay />
        <ModalContent
          maxH="80vh"
          maxW="80vw"
          padding="8"
          style={{ overflowY: "scroll", height: "90vh" }}
        >
          {/* <ModalHeader>Chi tiết đơn hàng</ModalHeader> */}
          <ModalCloseButton zIndex={4} onClick={() => refresh()} />
          <ModalBody>
            <Box>
              <Heading size="xl">Quản lý danh mục</Heading>
              <SimpleGrid columns={2} spacing={6} mt="6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onsubmit();
                  }}
                >
                  <Card p="4" bg="teal.100">
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"stretch"}
                    >
                      <Input
                        value={newCate}
                        paddingX="2"
                        borderRadius={"6px"}
                        size="xl"
                        fontWeight={"bold"}
                        background={"white"}
                        color="black"
                        placeholder="Thêm danh mục..."
                        onChange={(e) => setNewCate(e.target.value)}
                      />
                      <Button type="submit" colorScheme="teal" size="sm">
                        Thêm
                      </Button>
                    </HStack>
                  </Card>
                </form>
                {categories.map((category) => (
                  <Card p="4" bg="teal.100">
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text size="xl" fontWeight={"bold"}>
                        {category.name}
                      </Text>
                      <HStack justifyContent={"space-between"} spacing={4}>
                        <Switch
                          size="lg"
                          isChecked={category.status}
                          onChange={(e) => onStatus(category, !category.status)}
                        />
                        <Badge
                          fontSize={"sm"}
                          variant="outline"
                          className="badge-button none-text-transform"
                          colorScheme="blue"
                          borderRadius={"4px"}
                          paddingX="4"
                          paddingY="4px"
                          fontWeight={"500"}
                          _hover={{
                            background: "blue.200",
                          }}
                          onClick={() => {
                            setUpdateCate(category);
                            onEditOpen();
                          }}
                        >
                          Sửa
                        </Badge>
                      </HStack>
                    </HStack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                refresh();
              }}
            >
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isEditOpen}
        onClose={onEditClose}
        preserveScrollBarGap={false}
      >
        <ModalOverlay />
        <ModalContent padding="2" mt="30vh">
          {/* <ModalHeader>Chi tiết đơn hàng</ModalHeader> */}
          <ModalCloseButton zIndex={4} onClick={() => refresh()} />
          <ModalBody>
            <Box w="100%">
              <Heading size="md">Chỉnh sửa danh mục</Heading>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdate(0);
                }}
              >
                <Card p="4" mt="2">
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"stretch"}
                  >
                    <Input
                      value={updateCate.name}
                      paddingX="2"
                      borderRadius={"6px"}
                      size="xl"
                      fontWeight={"bold"}
                      background={"white"}
                      color="black"
                      placeholder="Nhập tên mới..."
                      onChange={(e) =>
                        setUpdateCate({ ...updateCate, name: e.target.value })
                      }
                    />
                    <Button
                      type="submit"
                      colorScheme="teal"
                      size="sm"
                      fontWeight={"300"}
                    >
                      Hoàn tất
                    </Button>
                  </HStack>
                </Card>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryManagement;
