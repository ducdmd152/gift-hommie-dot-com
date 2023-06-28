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
    <ManagerStatisticContainer setCombo={setCombo} combo={combo}>
      {combo == 0 && (
        <Box>
          {/* <HStack spacing="2">
            <Box flex="1">
              <StatisticOverviewRevenue />
            </Box>

            <Box flex="1">
              <StatisticOverviewOrder />
            </Box>
          </HStack> */}
          <Box mt="2">
            <StatisticRevenue overview={true} />
          </Box>
          <Box mt="2">
            <StatisticOrder overview={true} />
          </Box>
          <HStack spacing="2" mt="4" alignItems={"stretch"}>
            <Box flex="1">
              <StatisticCustomer overview={true} />
            </Box>

            <Box flex="1">
              <StatisticProduct overview={true} />
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
