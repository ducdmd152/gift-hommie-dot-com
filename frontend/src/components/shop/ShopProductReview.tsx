import { Avatar } from "@chakra-ui/avatar";
import { Card } from "@chakra-ui/card";
import { Box, HStack, VStack, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { GLOBAL_CONTEXT } from "../../App";
import shopProductService, {
  FeedBackResponseQuery,
} from "../../services/shop-product-service-additional";
import { FeedbackResponse } from "../../services/shop-product-service-additional";
import PageableDTO from "../../type/PageableDTO";
const ShopProductReview = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const id = globalContext.productContext.getProductId();
  const [pageable, setPageable] = useState({} as PageableDTO);
  const [requestQuery, setRequestQuery] = useState({} as FeedBackResponseQuery);
  const [feedbackResponse, setFeedbackResponse] = useState(
    {} as FeedbackResponse
  );

  useEffect(() => {
    (async () => {
      const { result: response, pageable: page } =
        await shopProductService.getFeedbacks(id, requestQuery);
      setFeedbackResponse(response);
      setPageable(page);
    })();
  }, []);

  return (
    <Box w="100%">
      <VStack w="100%" spacing={"2"}>
        <Card w="100%" paddingX="4" paddingY="2">
          <HStack>
            <Avatar
              size="md"
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
            />

            <VStack justifyContent={"flex-start"} spacing="0">
              <Text size="md" mt="2" mb="0">
                @username
              </Text>
              <Rating initialValue={5} readonly={true} size={18}></Rating>
            </VStack>
          </HStack>

          <Text color="gray" p="2" maxH="100px" overflowY={"auto"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis
            hic aliquid harum consectetur iure dicta a mollitia totam? Voluptas.
          </Text>
        </Card>

        {feedbackResponse.feedbacks.map((feedback) => (
          <Card w="100%" paddingX="4" paddingY="2">
            <HStack>
              <Avatar size="md" src={feedback.user.avatar} />

              <VStack justifyContent={"flex-start"} spacing="0">
                <Text size="md" mt="2" mb="0">
                  @{feedback.user.username}
                </Text>
                <Rating
                  initialValue={feedback.rating}
                  readonly={true}
                  size={18}
                ></Rating>
              </VStack>
            </HStack>

            <Text color="gray" p="2" maxH="100px" overflowY={"auto"}>
              {feedback.feedback}
            </Text>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default ShopProductReview;
