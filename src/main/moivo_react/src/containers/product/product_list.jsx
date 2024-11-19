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

  // 로그인 여부 확인
  const isLoggedIn = localStorage.getItem("token"); // 예: JWT 토큰이 localStorage에 저장되어 있는지 확인

  // 장바구니 추가
  const addToCart = async (product) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    try {
      // 서버에 장바구니 추가 요청
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoggedIn}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        setCart(cart + 1);
        const cartIcon = document.getElementById("crt");
        cartIcon.classList.add(styles.shake);
        setTimeout(() => cartIcon.classList.remove(styles.shake), 300);
        alert(`${product.title}이(가) 장바구니에 추가되었습니다.`);
      } else {
        alert("장바구니 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  // 위시리스트 추가
  const addToWish = async (product) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    try {
      // 서버에 위시리스트 추가 요청
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoggedIn}`,
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      if (response.ok) {
        setWish(wish + 1);
        const heartIcon = document.getElementById("wsh");
        heartIcon.classList.add(styles.shake);
        setTimeout(() => heartIcon.classList.remove(styles.shake), 300);
        alert(`${product.title}이(가) 위시리스트에 추가되었습니다.`);
      } else {
        alert("위시리스트 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("위시리스트 추가 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  // 상세 페이지로 이동
  const goToDetail = (product) => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  return (
    <div>
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
                    onClick={() => goToDetail(prod)}
                  >
                    {prod.title}
                  </h3>
                  <p className={styles.ovrCat}>{prod.category}</p>
                </div>
              </div>
              <div className={styles.ovrLnk}>
                <button className={styles.actBtn} onClick={() => addToWish(prod)}>
                  <i className="fa fa-heart"></i>
                </button>
                <button className={styles.actBtn} onClick={() => addToCart(prod)}>
                  <i className="fa fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>

        </div>  
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
