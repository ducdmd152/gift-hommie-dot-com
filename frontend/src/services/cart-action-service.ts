import CartDTO from "../type/CartDTO";
import cartService from "./cart-service";

const cartActionSerivce = {
  addToCart(productId: number, quantity: number = 1) {
    (async () => {
      await cartService
        .create({
          id: productId,
          productId: productId,
          quantity: quantity,
        } as CartDTO)
        .then((res) => {
          console.log("OK");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
    console.log("Add to cart: " + productId + " " + quantity);
  },

  removeOutCart(productId: number) {
    (async () => {})();
    console.log("Remove out from cart: " + productId);
  },
};

export default cartActionSerivce;
