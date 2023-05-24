import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../hooks/useFetchStaffProduct";
import Header from "../../components/header/Header";
import StaffProductMain from "../../components/staff/staff-product-list-page/StaffProductListMain";
import StaffProductListFilter from "../../components/staff/staff-product-list-page/StaffProductListAction";
import { PaginationQuery } from "../../components/Pagination";
import CategoryDTO from "../../type/CategoryDTO";

const HEADER_HEIGHT = "100px";

function StaffProductListPage({
  setRoute,
}: {
  setRoute: (route: string) => void;
}) {
  const [user, setUser] = useState<HttpUser | null>(null);
  const [staffProductQuery, setStaffProductQuery] = useState<StaffProductQuery>(
    {} as StaffProductQuery
  );

  useEffect(() => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) setUser(JSON.parse(userJSON));
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"header header" "aside-left main"`,
        // sm: `"header header" "aside-left main"`,
        // lg: `"header header" "aside-left main"`,
      }}
      templateColumns={{
        base: `280px 1fr`,
        // sm: `"1fr" "200px 1fr"`,
        // lg: `"1fr" "200px 1fr"`,
      }}
      h="100%"
    >
      <GridItem
        area="header"
        position="fixed"
        w="100%"
        backgroundColor="white"
        zIndex={999}
      >
        <Header />
      </GridItem>
      {/* <Show above="sm"> */}
      <GridItem
        area="aside-left"
        className="aside-left"
        marginTop={HEADER_HEIGHT}
      >
        <StaffProductListFilter />
      </GridItem>
      {/* </Show> */}
      <GridItem area="main" className="main" marginTop={HEADER_HEIGHT}>
        <StaffProductMain
          staffProductQuery={staffProductQuery}
          setStaffProductQuery={setStaffProductQuery}
        />
      </GridItem>
    </Grid>
  );
}

export default StaffProductListPage;
