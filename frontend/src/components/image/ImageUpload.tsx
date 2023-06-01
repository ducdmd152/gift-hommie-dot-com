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
import imageService from "../../services/image-service";
interface Props {
  defaultImageURL?: string;
  getImageURL?: (url: string) => void;
}
const ImageUpload = ({ defaultImageURL, getImageURL }: Props) => {
  const [image, setImage] = useState<File>({} as File);
  const [imageURL, setImageURL] = useState(
    defaultImageURL || utilService.getURLImageUploadPresent()
  );

  const handlePreviewImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageURL(utilService.getURLImageFromFile(e.target.files[0]));
      let urlFromAPI = await imageService.upload(e.target.files[0]);
      if (getImageURL) getImageURL(urlFromAPI);
    }
  };

  return (
    <VStack flex="1" h="100%" px="8" spacing="8">
      <Box>
        <Image
          boxSize="200px"
          borderRadius="8px"
          objectFit="cover"
          src={imageURL}
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
