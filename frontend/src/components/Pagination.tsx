import { Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import PageableDTO from "../type/PageableDTO";

export interface PaginationQuery {
  page: number | null;
  size: number | null;
}

interface Props {
  pageable: PageableDTO;
  onSelectPageIndex: (index: number) => void;
}
const Pagination = ({ pageable, onSelectPageIndex }: Props) => {
  const onIndex = (index: number) => {
    if (index < 0) return;
    if (index >= pageable.totalPages) return;
    onSelectPageIndex(index);
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  };

  const indexs = [];
  for (let i = 0; i < pageable.totalPages; i++) indexs.push(i);

  return (
    <HStack>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => onIndex(pageable.pageNumber - 1)}
      >
        {"<"}
      </Button>

      {indexs.map((index) => (
        <Button
          key={index}
          colorScheme="teal"
          variant={pageable.pageNumber == index ? "outline" : "ghost"}
          onClick={() => onIndex(index)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => onIndex(pageable.pageNumber + 1)}
      >
        {">"}
      </Button>
    </HStack>
  );
};

export default Pagination;
