import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import useFetchStaffProduct from "../../hooks/useFetchStaffProduct";

function StaffProductList({ setRoute }: { setRoute: (route: string) => void }) {
  const [user, setUser] = useState<HttpUser | null>(null);
  const { products, isLoading, error } = useFetchStaffProduct(null);

  console.log(products);

  useEffect(() => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) setUser(JSON.parse(userJSON));
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"main aside-right"`,
        sm: `"aside-left main aside-right"`,
        lg: `"aside-left main aside-right"`,
      }}
      templateColumns={{
        base: `1fr 60px`,
        sm: `60px 1fr 180px`,
        md: `80px 1fr 200px`,
        lg: "240px 1fr 240px",
      }}
      h="100%"
    >
      <Show above="sm">
        <GridItem area="aside-left" className="aside-left">
          <h1>Hello</h1>
          {products.map((product) => (
            <h1>{product.name}</h1>
          ))}
        </GridItem>
      </Show>

      <GridItem area="main" className="main"></GridItem>
      <GridItem area="aside-right" className="aside-right"></GridItem>
    </Grid>
  );
}

export default StaffProductList;
