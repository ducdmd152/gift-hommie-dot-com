import CartDTO from "../type/CartDTO";
import cartService from "./cart-service";

const cartActionSerivce = {
  addToCart(productId: number, quantity: number = 1) {
    let cart = {
      id: productId,
      productId: productId,
      quantity: quantity,
    };

    return (async () => {
      await cartService
        .create(cart as CartDTO)
        .then((res) => {
          return res.data as CartDTO;
        })
        .catch((err) => {
          return cart;
        });
    })();
  },

  removeOutCart(productId: number) {
    return (async () => {
      return await cartService
        .delete(productId)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    })();
    console.log("Remove out from cart: " + productId);
  },
};

export default cartActionSerivce;
