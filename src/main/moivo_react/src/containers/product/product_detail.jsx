import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 더미 리뷰 데이터 추가
  const [reviews] = useState([
    {
      id: 1,
      username: "user1",
      rating: 5,
      content: "정말 좋은 상품이에요!",
      date: "2024-03-20"
    },
    {
      id: 2,
      username: "user2",
      rating: 4,
      content: "배송이 빨라요",
      date: "2024-03-19"
    }
  ]);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setMainImg(selectedProduct.productimg[0].fileurl);
    } else {
      setProduct(null);
    }
  }, [id]);

  // 더미데이터 대신 api 데이터 가져오기
  // useEffect(() => {
  //   const fetchProductDetail = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/store/${id}`);
  //       if (response.data) {
  //         setProduct(response.data);
  //         setMainImg(response.data.productimg[0].fileurl);
  //       } else {
  //         setProduct(null);
  //       }
  //     } catch (error) {
  //       console.error('상품 상세 정보를 불러오는데 실패했습니다:', error);
  //       setProduct(null);
  //     }
  //   };

  //   fetchProductDetail();
  // }, [id]);
  

  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>해당 상품이 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Banner />
      
      <div className={styles.productDetailWrapper}>
        {/* 상단 섹션: 메인 이미지와 구매 정보 */}
        <div className={styles.topSection}>
          {/* 왼쪽: 메인 이미지 */}
          <div className={styles.mainImageSection}>
            <img
              src={mainImg || "/placeholder.jpg"}
              alt={product.name || "이미지 없음"}
              className={styles.mainImage}
            />
            <div className={styles.thumbnails}>
              {product.productimg.map((img) => (
                <img 
                  key={img.id}
                  src={img.fileurl} 
                  alt={product.name} 
                  onClick={() => setMainImg(img.fileurl)}
                  className={`${styles.thumbnail} ${mainImg === img.fileurl ? styles.activeThumbnail : ''}`}
                />
              ))}
            </div>
          </div>

          {/* 오른쪽: 상품 정보 및 구매 섹션 */}
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price.toLocaleString()}원</p>
            <div className={styles.description}>
              <p>{product.content}</p>
            </div>
            
            <div className={styles.purchaseOptions}>
              <div className={styles.optionItem}>
                <label htmlFor="size">사이즈</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  {/* 사이즈 옵션들 */}
                </select>
              </div>

              <div className={styles.optionItem}>
                <label htmlFor="quantity">수량</label>
                <div className={styles.quantityWrapper}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <motion.button 
                className={styles.cartButton}
                onClick={() => {/* 장바구니 추가 로직 */}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart /> 장바구니
              </motion.button>
              <motion.button 
                className={styles.wishlistButton}
                onClick={() => {/* 위시리스트 추가 로직 */}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaHeart /> 위시리스트
              </motion.button>
            </div>
          </div>
        </div>

        {/* 하단 섹션: 상세 이미지와 리뷰 */}
        <div className={styles.bottomSection}>
          {/* 상세 이미지 섹션 */}
          <div className={styles.detailImages}>
            {product.productimg.map((img) => (
              <img
                key={img.id}
                src={img.fileurl}
                alt={`${product.name} 상세이미지`}
                className={styles.detailImage}
              />
            ))}
          </div>

          {/* 리뷰 섹션 */}
          <div className={styles.reviewSection}>
            <div className={styles.reviewHeader}>
              <h2>상품 리뷰</h2>
              <motion.button 
                className={styles.writeReviewButton}
                onClick={() => navigate(`/review/${id}`)}
                whileHover={{ scale: 1.02 }}
              >
                리뷰 작성하기
              </motion.button>
            </div>
            
            <div className={styles.reviewList}>
              {reviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewInfo}>
                    <span className={styles.username}>{review.username}</span>
                    <span className={styles.rating}>{'★'.repeat(review.rating)}</span>
                    <span className={styles.date}>{review.date}</span>
                  </div>
                  <p className={styles.reviewContent}>{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
