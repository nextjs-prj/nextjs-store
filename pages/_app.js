import "../styles/globals.css";
import Header from "../components/Header";
import Head from "next/head";
import React, { useCallback } from "react";

export const CartContext = React.createContext(null);

function MyApp({ Component, pageProps }) {
  const getCart = useCallback(() => {
    const state = window.localStorage.getItem("cart");
    return state ? JSON.parse(state) : [];
  });

  const addToCart = useCallback((product) => {
    var state = window.localStorage.getItem("cart");
    var arr = state ? [...JSON.parse(state), product] : [product];
    window.localStorage.setItem("cart", JSON.stringify(arr));
    window.location.reload();
  });

  const removeFromCart = useCallback((product) => {
    var state = window.localStorage.getItem("cart");
    var remProducts = JSON.parse(state).filter(
      (_prduct) => _prduct.id != product?.id
    );
    window.localStorage.setItem("cart", JSON.stringify(remProducts));
    window.location.reload();
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/cloudinary-video-player@1.5.3/dist/cld-video-player.min.css"
          rel="stylesheet"
        />
        <script
          src="https://unpkg.com/cloudinary-core@latest/cloudinary-core-shrinkwrap.min.js"
          type="text/javascript"
        ></script>
        <script
          src="https://unpkg.com/cloudinary-video-player@1.5.3/dist/cld-video-player.min.js"
          type="text/javascript"
        ></script>
      </Head>

      <Header />
      <CartContext.Provider value={{ getCart, addToCart, removeFromCart }}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </>
  );
}

export default MyApp;
