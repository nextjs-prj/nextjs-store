import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./_app";
import Link from "next/link";

export function createBroadcastChannel(name) {
  if (createBroadcastChannel.BroadcastChannel)
    return createBroadcastChannel.BroadcastChannel;
  else {
    const bd = new BroadcastChannel(name);
    createBroadcastChannel.BroadcastChannel = bd;
    return createBroadcastChannel.BroadcastChannel;
  }
}
export default function Home() {
  const [cld, setCld] = useState();
  const [cart, setCart] = useState([]);
  const { getCart } = useContext(CartContext);

  useEffect(() => {
    if (cloudinary) {
      var _cld = cloudinary.Cloudinary.new({ cloud_name: "demo" });
      setCld(_cld);
      setCart(getCart());
    }
  }, []);

  useEffect(() => {
    var cartAddedChannel = createBroadcastChannel("cartChange");
    cartAddedChannel.onmessage = function (e) {
      window?.location?.reload();
    };
  }, [cart]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <h2>Shopify Products</h2>
          <span></span>
        </div>

        <div className={styles.productscontainer}>
          <div className={styles.yourproducts}>
            <h3>Product Videos</h3>
            <span>
              <Link href="/cart">
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  Cart: <span>{cart?.length}</span>
                </span>
              </Link>
            </span>
          </div>
          <div>
            {cld &&
              ["rafting", "sea_turtle", "forest_bike"].map((product, i) => (
                <ProductCard cld={cld} product={product} key={i} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
