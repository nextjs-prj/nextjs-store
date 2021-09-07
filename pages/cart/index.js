import styles from "./../../styles/Home.module.css";
import { CartContext } from "./../_app";
import { useContext, useEffect, useState } from "react";
import CartCard from "./../../components/CartCard";
import Stripe from "stripe-checkout";
import { useRouter } from "next/router";

const stripe = Stripe({
  key: "pk_test_51IFOjZHIlBmDlQSwJPya9zMmjBLEJQ2XHzXGn56OcGZpLNe4nHo9XZOInZ6gYOPZGcy5Dio9Xa4h0Z7Xc3YLNRzh00KKJnD38U",
});

export default function Cart() {
  const { getCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cart = getCart();
    setCart(cart);
  }, []);

  function clearCart() {
    window.localStorage.clear();
  }

  const checkOutFn = async () => {
    const totalAmount = cart.reduce((pV, cV) => {
      return parseInt(pV?.price || pV) + parseInt(cV?.price);
    }, 0);
    const token = await stripe({
      locale: "en-US",
      name: "Shopify",
      description: "Shop with ease",
      amount: totalAmount,
      email: "test@test.com",
      allowRememberMe: false,
      currency: "usd",
    });
    if (!token) {
      console.log("user closed stripe checkout without filling in credentials");
      return;
    }
    console.log("send this token to the server", token);
    clearCart();
    router.push("/checkout");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <h2>Cart</h2>
          <span>
            <button
              className="btn"
              style={{ backgroundColor: "green", borderColor: "green" }}
              onClick={checkOutFn}
            >
              Checkout
            </button>
          </span>
        </div>

        <div className={styles.productscontainer}>
          <div>
            {cart.map((_cartItem, i) => (
              <CartCard cart={_cartItem} key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
