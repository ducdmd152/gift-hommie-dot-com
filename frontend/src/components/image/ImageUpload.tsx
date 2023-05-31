import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import utilService from "../../services/util-service";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);

  const handlePreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <VStack
      flex="1"
      h="100%"
      px="8"
      spacing="8"
      marginTop={utilService.HEADER_HEIGHT}
    >
      <Box>
        <Image
          borderRadius="8px"
          height="200px"
          objectFit="cover"
          src={utilService.getURLImageFromFile(image)}
        />
      </Box>
      <Button cursor="pointer">
        <Text cursor="pointer">Tải ảnh lên</Text>
        <Input
          onChange={(e) => {
            handlePreviewImage(e);
          }}
          cursor="pointer"
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept="image/*"
          color="gray"
          fontWeight="bold"
        />
      </Button>
    </VStack>
  );
};

export default ImageUpload;
