import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import utilService from "../../services/util-service";
import imageService from "../../services/image-service";
interface Props {
  getImageURL?: (url: string) => void;
  imageURL: string;
  setImageURL: (url: string) => void;
}
const ImageUpload = ({ getImageURL, imageURL, setImageURL }: Props) => {
  const [image, setImage] = useState<File>({} as File);

  const [spinner, setSpinner] = useState(false);

  const handlePreviewImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageURL(utilService.getURLImageFromFile(e.target.files[0]));
      setSpinner(true);
      let urlFromAPI = await imageService.upload(e.target.files[0]);
      setImageURL(urlFromAPI);
      setSpinner(false);
      if (getImageURL) getImageURL(urlFromAPI);
    }
  };

  return (
    <VStack width="100%" h="100%" px="8" spacing="8" alignItems={"center"}>
      <Box>
        {spinner ? (
          <Spinner />
        ) : (
          <Image
            width="100%"
            height="200px"
            borderRadius="8px"
            objectFit="cover"
            src={imageURL}
          />
        )}
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
