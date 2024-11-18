import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/product_list.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";

const ProductList = () => {
  const [cart, setCart] = useState(0);
  const [wish, setWish] = useState(0);
  const navigate = useNavigate();

  const addToCart = () => {
    setCart(cart + 1);
    const cartIcon = document.getElementById("crt");
    cartIcon.classList.add(styles.shake);
    setTimeout(() => cartIcon.classList.remove(styles.shake), 300);
  };

  const addToWish = () => {
    setWish(wish + 1);
    const heartIcon = document.getElementById("wsh");
    heartIcon.classList.add(styles.shake);
    setTimeout(() => heartIcon.classList.remove(styles.shake), 300);
  };

  const goToDetail = (product) => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles.cntr}>
      <Banner />
      <br />
      <br />
      <br />
      <div id="crt" className={styles.cart} data-totalitems={cart}>
        <i className="fas fa-shopping-cart"></i>
      </div>
      <div id="wsh" className={styles.wish} data-totalitems={wish}>
        <i className="fas fa-heart"></i>
      </div>
      <h2 className={styles.ttl}>Product List</h2>
      <div className={styles.grid}>
        {products.map((prod) => (
          <div key={prod.id} className={styles.card}>
            {prod.badge && <div className={styles.badge}>{prod.badge}</div>}
            <div className={styles.imgWrap}>
              <img src={prod.image} alt={prod.title} className={styles.img} />
              <div className={styles.ovr}>
                <h3
                  className={styles.ovrTtl}
                  onClick={() => goToDetail(prod)}>
                  {prod.title}
              </h3> 
                {/*  상품명 클릭 시 이동 */}
                <p className={styles.ovrCat}>{prod.category}</p>
              </div>
            </div>
            <div className={styles.ovrLnk}>
              <button className={styles.actBtn} onClick={addToWish}>
                <i className="fa fa-heart"></i>
              </button>
              <button className={styles.actBtn} onClick={addToCart}>
                <i className="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
