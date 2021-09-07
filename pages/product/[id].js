import styles from "../../styles/ProductView.module.css";
import { useRouter } from "next/router";
import products_data from "./../../data/products_data";
import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { CartContext } from "./../_app";
import { createBroadcastChannel } from "..";

export default function Product(params) {
  const { getCart, removeFromCart, addToCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);
  const [product, setProduct] = useState(null);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    const _product = products_data.find((_product) => _product.id == id);
    const cart = getCart();
    const _cartFound = cart.find((_prdct) => _prdct.id == id);
    const inCart = _cartFound ? true : false;

    setProduct(_product);
    setInCart(inCart);
  }, [id]);

  function _addToCart() {
    addToCart(product);
    var cartAddedChannel = createBroadcastChannel("cartChange");
    cartAddedChannel.postMessage(null);
  }

  function _removeFromCart() {
    removeFromCart(product);
    cartAddedChannel.postMessage(null);
  }

  return (
    <div className={styles.productviewcontainer}>
      <div className={styles.productviewmain}>
        <div
          style={{ backgroundImage: `url(${product?.imageUrl})` }}
          className={styles.productviewimg}
        ></div>
        <div style={{ width: "100%", marginLeft: "15px" }}>
          <div className={styles.productviewname}>
            <h1>{product?.name}</h1>
          </div>
          <div className={styles.productviewminidet}>
            <div
              style={{
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                paddingTop: "18px",
                paddingBottom: "18px",
              }}
            >
              <span
                style={{
                  marginRight: "4px",
                  color: "rgb(142 142 142)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Price:{"  "}
                <span style={{ color: "black", fontSize: "2em" }}>
                  ${product?.price}
                </span>
              </span>
            </div>
            <div style={{ padding: "14px 0" }}>
              <span>
                {!inCart ? (
                  <button className="btn" onClick={_addToCart}>
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn-danger" onClick={_removeFromCart}>
                    Remove from Cart
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
