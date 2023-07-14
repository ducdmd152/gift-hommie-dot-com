import {
  Select,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  field: string;
  selected?: string;
  choices: any[];
  onSelect: (id: number | string) => void;
}
const Selector = ({ field, selected, choices, onSelect }: Props) => {
  return (
    <Select
      variant="filled"
      onChange={(event) => {
        event.preventDefault();
        if (event.target)
          onSelect(parseInt(event.target.value) || event.target.value);
      }}
      placeholder={selected || field}
    >
      {choices.map((choice) => (
        <option key={choice.id} value={choice.id}>
          {choice.name}
        </option>
      ))}
    </Select>
  );
};

export default Selector;
