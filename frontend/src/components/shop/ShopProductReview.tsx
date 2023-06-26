import { Avatar } from "@chakra-ui/avatar";
import { Card } from "@chakra-ui/card";
import { Box, HStack, VStack, Text, Flex } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { GLOBAL_CONTEXT } from "../../App";
import shopProductService, {
  FeedBackResponseQuery,
} from "../../services/shop-product-service-additional";
import { FeedbackResponse } from "../../services/shop-product-service-additional";
import PageableDTO from "../../type/PageableDTO";
import Pagination from "../Pagination";
import FeedbackDTO from "../../type/FeedbackDTO";
const ShopProductReview = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const id = globalContext.productContext.getProductId();
  const [requestQuery, setRequestQuery] = useState({} as FeedBackResponseQuery);
  const [feedbackResponse, setFeedbackResponse] = useState({
    feedbacks: [] as FeedbackDTO[],
  } as FeedbackResponse);

  useEffect(() => {
    (async () => {
      const result = await shopProductService.getFeedbacks(id, requestQuery);
      setFeedbackResponse(result);
    })();
  }, []);

  return (
    <Box w="100%">
      <VStack w="100%" spacing={"2"}>
        {/* <Card w="100%" paddingX="4" paddingY="2">
          <HStack>
            <Avatar
              size="md"
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
            />

            <Box w="100%">
              <Box
                fontSize="md"
                mt="2"
                mb="0"
                textAlign={"left"}
                w="100%"
                display={"inline-block"}
              >
                @duyduc
              </Box>
              <Rating initialValue={5} readonly={true} size={18} />
            </Box>
          </HStack>

          <Text color="gray" p="2" maxH="100px" overflowY={"auto"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis
            hic aliquid harum consectetur iure dicta a mollitia totam? Voluptas.
          </Text>
        </Card> */}

        {feedbackResponse.feedbacks &&
          feedbackResponse.feedbacks.map((feedback) => (
            <Card w="100%" paddingX="4" paddingY="2" background={"gray.100"}>
              <HStack>
                <Avatar size="md" src={feedback.user.avatar} />

                <VStack
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  spacing="0"
                >
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

              <Text color="gray" p="2" fontStyle="italic" overflowY={"auto"}>
                Đã đánh giá vào{" "}
                {new Date(feedback.time).toLocaleDateString("en-GB")}
              </Text>
            </Card>
          ))}
      </VStack>
      {feedbackResponse.pageable?.pageNumber &&
      feedbackResponse.pageable?.pageNumber > 1 ? (
        <Pagination
          pageable={feedbackResponse.pageable}
          onSelectPageIndex={(index: number) =>
            setRequestQuery({ ...requestQuery, page: index })
          }
        />
      ) : (
        <Box />
      )}
    </Box>
  );
};

export default ShopProductReview;
