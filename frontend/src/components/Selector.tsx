import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const choices = [
  {
    id: 1,
    name: "Cốc sứ",
  },
  {
    id: 2,
    name: "Khung ảnh",
  },
  {
    id: 3,
    name: "Cái gì đấy",
  },
];
interface Props {
  field: string;
  selected?: string;
  onSelect?: (item: any) => void;
}
const Selector = ({ field, selected, onSelect }: Props) => {
  return (
    <Select placeholder={selected || field}>
      {/* {choices.map((choice) => (
            <MenuItem
              key={choice.id}
              // onClick={() => onSelectPlatform(platform)}
            >
              {choice.name}
            </MenuItem>
          ))} */}
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};

export default Selector;
