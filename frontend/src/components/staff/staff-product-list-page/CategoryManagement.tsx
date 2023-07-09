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
// interface Props {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }
// const CategoryManagement = ({ isOpen, onOpen, onClose }: Props) => {
const CategoryManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories, setCategories } = useFetchCategories(query);
  const [newCate, setNewCate] = useState("");

  const onDelete = (id: number) => {
    // Swal.fire({
    //   title: "Đây là thao tác xóa vĩnh viễn?",
    //   text: "Đây là c!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "orange",
    //   cancelButtonColor: "gray",
    //   confirmButtonText: "Có",
    //   cancelButtonText: "Không",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     order.status = "CANCELLED";
    //     const orderDTO = await updateOrder(order);
    //     if (order === orderDTO) {
    //       alert("Không thể hủy đơn hàng.");
    //       order.status = "PENDING";
    //     } else {
    //       setOrder(orderDTO);
    //       Swal.fire({
    //         position: "center",
    //         icon: "info",
    //         title: "Đã hủy đơn hàng.",
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //     }
    //   }
    // });
    // alert("Delete " + id);
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
          <ModalCloseButton zIndex={4} />
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
                        {/* <Badge
                          fontSize={"sm"}
                          variant="outline"
                          className="badge-button none-text-transform"
                          colorScheme="red"
                          borderRadius={"4px"}
                          paddingX="4"
                          paddingY="4px"
                          fontWeight={"500"}
                          _hover={{
                            background: "red.200",
                          }}
                          onClick={() => onDelete(category.id)}
                        >
                          Xóa
                        </Badge> */}
                      </HStack>
                    </HStack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryManagement;
