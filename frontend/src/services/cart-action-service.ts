import CartDTO from "../type/CartDTO";
import cartService from "./cart-service";

const cartActionSerivce = {
  async addToCart(productId: number, quantity: number = 1) {
    let cart = {
      id: productId,
      productId: productId,
      quantity: quantity,
    } as CartDTO;

    let result = cart;

    await (async () => {
      await cartService
        .create(cart as CartDTO)
        .then((res) => {
          result = res.data as CartDTO;
        })
        .catch((err) => {
          // return cart;
        });
    })();

    return result;
  },

  removeOutCart(cartId: number) {
    return (async () => {
      return await cartService
        .delete(cartId)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    })();
  },

  async updateCart(cart: CartDTO) {
    let result = cart;
    await (async () => {
      return await cartService
        .update(cart)
        .then((res) => {
          result = res.data as CartDTO;
        })
        .catch((err) => {
          // return cart;
        });
    })();
    return result;
  },
};

export default cartActionSerivce;
