import { Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";

export interface PaginationQuery {
  page: number | null;
  size: number | null;
}

interface Props {
  currentIndex?: number;
  onSelectPageIndex: (index: number) => void;
}
const Pagination = ({ currentIndex, onSelectPageIndex }: Props) => {
  if (currentIndex === undefined) currentIndex = 0;

  const onIndex = (index: number) => {
    if (index < 0) index = 0;
    onSelectPageIndex(index);
    currentIndex = index;
  };

  return (
    <HStack>
      <Button
        colorScheme="teal"
        variant="outline"
        // onClick={() => onIndex(currentIndex - 1)}
      >
        {"<"}
      </Button>
      <Button colorScheme="teal" variant="outline">
        1
      </Button>
      <Button colorScheme="teal" variant="ghost">
        2
      </Button>

      <Button colorScheme="teal" variant="outline">
        {">"}
      </Button>
    </HStack>
  );
};

export default Pagination;
