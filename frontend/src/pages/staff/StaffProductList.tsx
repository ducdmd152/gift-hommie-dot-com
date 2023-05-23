import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import useFetchStaffProduct from "../../hooks/useFetchStaffProduct";
import Header from "../../components/header/Header";
import StaffProductMain from "../../components/staff/StaffProductMain";

function StaffProductList({ setRoute }: { setRoute: (route: string) => void }) {
  const [user, setUser] = useState<HttpUser | null>(null);
  const { products, isLoading, error } = useFetchStaffProduct(null);

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
        base: `200px 1fr`,
        // sm: `"1fr" "200px 1fr"`,
        // lg: `"1fr" "200px 1fr"`,
      }}
      h="100%"
    >
      <GridItem area="header" height="100px">
        <Header />
      </GridItem>
      {/* <Show above="sm"> */}
      <GridItem area="aside-left" className="aside-left" background={"green"}>
        Category
      </GridItem>
      {/* </Show> */}
      <GridItem area="main" className="main">
        <StaffProductMain products={products} />
      </GridItem>
    </Grid>
  );
}

export default StaffProductList;
