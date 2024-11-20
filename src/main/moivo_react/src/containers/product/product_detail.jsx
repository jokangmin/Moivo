import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const [selectedSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState(product?.images[0]);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/");
    } else {
      setMainImg(product.images[0]);
    }
  }, [product, navigate]);

  const addToCart = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    // 장바구니에 추가하는 로직 구현
    alert(`장바구니에 추가됨! ${product.title}, 사이즈: ${selectedSize}, 수량: ${quantity}`);
  };

  const buyNow = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    // 바로 구매하는 로직 구현
    alert(`바로 구매! ${product.title}, 사이즈: ${selectedSize}, 수량: ${quantity}`);
  };

  if (!product) {
    return null;
  }

  return (
    <div>
      <Banner />
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <div className={styles.imageArea}>
            <img src={mainImg} alt={product?.title} className={styles.mainImage} />
            <div className={styles.thumbnails}>
              {product?.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={styles.thumbnail}
                  onClick={() => setMainImg(img)}
                />
              ))}
            </div>
          </div>
          <div className={styles.infoArea}>
            <h1 className={styles.title}>{product?.title}</h1>
            <p className={styles.price}>₩{product?.price.toLocaleString()}</p>
            <div className={styles.options}>
              <label>사이즈:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSize(e.target.value)}
                className={styles.select}
              >
                <option value="">사이즈 선택</option>
                {product?.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.quantity}>
              <label>수량:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className={styles.quantityInput}
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.cartBtn} onClick={addToCart}>
                장바구니
              </button>
              <button className={styles.buyBtn} onClick={buyNow}>
                바로 구매
              </button>
            </div>
          </div>
        </div>
        <div className={styles.detailInfo}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${showDescription ? styles.active : ""}`}
              onClick={() => {
                setShowDescription(true);
                setShowReviews(false);
                setShowGuide(false);
              }}
            >
              상품 설명
            </button>
            <button
              className={`${styles.tab} ${showReviews ? styles.active : ""}`}
              onClick={() => {
                setShowDescription(false);
                setShowReviews(true);
                setShowGuide(false);
              }}
            >
              리뷰
            </button>
            <button
              className={`${styles.tab} ${showGuide ? styles.active : ""}`}
              onClick={() => {
                setShowDescription(false);
                setShowReviews(false);
                setShowGuide(true);
              }}
            >
              사이즈 가이드
            </button>
          </div>
          {showDescription && (
            <div className={styles.description}>
              <h2>상품 설명</h2>
              <p>{product.description}</p>
            </div>
          )}
          {showReviews && product?.reviews && (
            <div className={styles.reviews}>
              <h2>리뷰</h2>
              <ul className={styles.reviewList}>
                {product.reviews.map((review, idx) => (
                  <li key={idx} className={styles.reviewItem}>
                    <p className={styles.reviewText}>{review.text}</p>
                    <p className={styles.reviewAuthor}>{review.author}</p>
                    <p className={styles.reviewDate}>{review.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showGuide && product?.sizeGuide && (
            <div className={styles.sizeGuide}>
              <h2>사이즈 가이드</h2>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>사이즈</th>
                    <th>어깨 너비</th>
                    <th>가슴 둘레</th>
                    <th>소매 길이</th>
                    <th>총장</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizeGuide.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.size}</td>
                      <td>{row.shoulder}</td>
                      <td>{row.chest}</td>
                      <td>{row.sleeve}</td>
                      <td>{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
