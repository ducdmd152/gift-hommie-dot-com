import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  defaultText?: string;
}

const SearchInput = ({ onSearch, defaultText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
      onChange={(event) => {
        event.preventDefault();
        // if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          placeholder="Tìm kiếm..."
          fontStyle={"italic"}
          size="md"
          letterSpacing={1}
          value={defaultText}
          onBlur={() => {
            if (ref.current) onSearch(ref.current.value);
          }}
        />
        <Button type="submit" colorScheme="blue" marginLeft={2}>
          Tìm kiếm
        </Button>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
