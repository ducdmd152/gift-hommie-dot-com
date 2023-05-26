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
interface Props {
  field: string;
  selected?: string;
  choices: any[];
  onSelect: (id: number) => void;
}
const Selector = ({ field, selected, choices, onSelect }: Props) => {
  return (
    <Select
      onChange={(event) => {
        event.preventDefault();
        if (event.target) onSelect(parseInt(event.target.value));
      }}
      placeholder={selected || field}
    >
      {choices.map((choice) => (
        <option value={choice.id}>{choice.name}</option>
      ))}
    </Select>
  );
};

export default Selector;
