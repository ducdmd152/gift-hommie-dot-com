import { Box, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ManagerStatisticContainer from "../../components/manager/ManagerStatisticContainer";
import StatisticOverviewRevenue from "../../components/manager/StatisticOverviewRevenue";
import StatisticOverviewOrder from "../../components/manager/StatisticOverviewOrder";
import StatisticOverviewProduct from "../../components/manager/StatisticOverviewProduct";
import StatisticOverviewCustomer from "../../components/manager/StatisticOverviewCustomer";
import StatisticRevenue from "../../components/manager/StatisticRevenue";
import StatisticOrder from "../../components/manager/StatisticOrder";
import StatisticProduct from "../../components/manager/StatisticProduct";
import StatisticCustomer from "../../components/manager/StatisticCustomer";

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
          <Box mt="2">
            <StatisticOrder />
          </Box>
          <Box mt="2">
            <StatisticRevenue />
          </Box>
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
      {combo == 2 && <StatisticOrder />}
      {combo == 3 && <StatisticProduct />}
      {combo == 4 && <StatisticCustomer />}
    </ManagerStatisticContainer>
  );
};

export default ManagerStatisticPage;
