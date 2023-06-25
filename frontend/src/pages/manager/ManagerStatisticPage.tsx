import { Box, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ManagerStatisticContainer from "../../components/manager/ManagerStatisticContainer";
import StatisticOverviewRevenue from "../../components/manager/StatisticOverviewRevenue";
import StatisticOverviewOrder from "../../components/manager/StatisticOverviewOrder";
import StatisticOverviewProduct from "../../components/manager/StatisticOverviewProduct";
import StatisticOverviewCustomer from "../../components/manager/StatisticOverviewCustomer";
import StatisticRevenue from "../../components/manager/StatisticRevenue";

const ManagerStatisticPage = () => {
  const [combo, setCombo] = useState(0);
  return (
    <ManagerStatisticContainer setCombo={setCombo}>
      {combo == 0 && (
        <Box>
          <HStack spacing="2">
            <Box flex="1">
              <StatisticOverviewRevenue />
            </Box>

            <Box flex="1">
              <StatisticOverviewOrder />
            </Box>
          </HStack>
          <HStack spacing="2" mt="4" alignItems={"flex-start"}>
            <Box flex="1">
              <StatisticOverviewCustomer />
            </Box>

            <Box flex="1">
              <StatisticOverviewProduct />
            </Box>
          </HStack>
        </Box>
      )}
      {combo == 1 && <StatisticRevenue />}
    </ManagerStatisticContainer>
  );
};

export default ManagerStatisticPage;
