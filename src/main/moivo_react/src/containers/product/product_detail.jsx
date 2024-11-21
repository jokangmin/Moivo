import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";

const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product;

  const [selectedSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState(product?.images.main);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const addToCart = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    // 장바구니에 추가하는 로직 구현
    alert(`장바구니에 추가됨! ${product.name}, 사이즈: ${selectedSize}, 수량: ${quantity}`);
  };

  const buyNow = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    // 바로 구매하는 로직 구현
    alert(`바로 구매! ${product.name}, 사이즈: ${selectedSize}, 수량: ${quantity}`);
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
            <img src={mainImg} alt={product?.name} className={styles.mainImage} />
            <div className={styles.thumbnails}>
              {product?.images.thumbnails.map((img, idx) => (
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
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.price}>₩{product?.price.toLocaleString()}</p>
            <div className={styles.options}>
              <label>사이즈:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSize(e.target.value)}
                className={styles.select}
              >
                <option value="">사이즈 선택</option>
                {product?.productstock.map((stock) => (
                  <option key={stock.stockseq} value={stock.size}>
                    {stock.size}
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
            {/* 상품 설명, 리뷰, 사이즈 가이드 들어갈 공간 */}
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
              <p>{product?.content}</p>
              <div className={styles.detailImages}>
                {product?.images.details.map((img, idx) => (
                  <img key={idx} src={img} alt={`Detail ${idx}`} className={styles.detailImage} />
                ))}
              </div>
            </div>
          )}
          {showReviews && product?.reviews && (
            <div className={styles.reviews}>
              <h2>리뷰</h2>
              <ul className={styles.reviewList}>
                {product.reviews.map((review) => (
                  <li key={review.reviewseq} className={styles.reviewItem}>
                    <p className={styles.reviewText}>{review.content}</p>
                    <p className={styles.reviewAuthor}>작성자: {review.userseq}</p>
                    <p className={styles.reviewDate}>{review.reviewdate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showGuide && (
            <div className={styles.sizeGuide}>
              <h2>사이즈 가이드</h2>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>사이즈</th>
                    <th>재고</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.productstock.map((stock) => (
                    <tr key={stock.stockseq}>
                      <td>{stock.size}</td>
                      <td>{stock.stock}</td>
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
