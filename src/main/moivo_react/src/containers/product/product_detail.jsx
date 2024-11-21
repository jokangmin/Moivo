import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import products from "../../assets/dummydata/productDTO";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState("");
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.productseq === parseInt(id)
    );
    if (selectedProduct) {
      setProduct(selectedProduct);
      setMainImg(
        selectedProduct.productimg?.[0]?.fileurl || "/placeholder.jpg"
      );
      setReviews(selectedProduct.review || []);
      setRelatedProducts(
        products.filter(
          (product) =>
            product.categoryseq === selectedProduct.categoryseq &&
            product.productseq !== selectedProduct.productseq
        )
      );
    } else {
      setProduct(null); // 제품이 없는 경우 명시적으로 설정합니다.
    }
  }, [id]);
  

  const addToWishlist = async () => {
    try {
      const response = await axios.post("/api/wishlist", {
        productseq: product.productseq,
        userseq: 1, // 실제 로그인한 사용자의 userseq를 동적으로 받아와야 합니다.
      });
      if (response.data.success) {
        alert("위시리스트에 추가되었습니다.");
      } else {
        alert("위시리스트 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("위시리스트 추가 실패:", error);
      alert("위시리스트 추가에 실패했습니다.");
    }
  };

  const addToCart = async () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    if (quantity < 1) {
      alert("수량은 1개 이상이어야 합니다.");
      return;
    }
    try {
      const response = await axios.post("/api/cart", {
        productseq: product.productseq,
        userseq: 1, // 실제 로그인한 사용자의 userseq를 동적으로 받아와야 합니다.
        size: selectedSize,
        quantity: quantity,
      });
      if (response.data.success) {
        alert("장바구니에 추가되었습니다.");
      } else {
        alert("장바구니 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  const handleSubmitReview = async () => {
    if (reviewContent.trim() === "") {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/review", {
        productseq: product.productseq,
        userseq: 1, // 실제 로그인한 사용자의 userseq를 동적으로 받아와야 합니다.
        content: reviewContent,
        rating: reviewRating, // 별점 값 추가
      });
      if (response.data.success) {
        const newReview = { content: reviewContent, userseq: 1, reviewdate: new Date().toISOString() };
        setReviews([newReview, ...reviews]);
        alert("리뷰가 작성되었습니다.");
        setReviewContent("");
      } else {
        alert("리뷰 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Banner />
      
      <motion.div
        className={styles.detailContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {product ? (
          <>
            <div className={styles.productImages}>
              <div className={styles.thumbnails}>
                {product.productimg.map((img) => (
                  <img 
                    key={img.productimgseq}
                    src={img.fileurl} 
                    alt={product.name} 
                    onClick={() => setMainImg(img.fileurl)}
                  />
                ))}
              </div>
              <div className={styles.mainImage}>
                <img
                  src={mainImg || (product.productimg?.length > 0 ? product.productimg[0].fileurl : "/placeholder.jpg")}
                  alt={product.name || "이미지 없음"}
                />
              </div>
            </div>
            <div className={styles.infoSection}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productPrice}>{product.price?.toLocaleString()}원</p>
              <div className={styles.sizeSelector}>
                <label htmlFor="size">사이즈:</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">-- 사이즈 선택 --</option>
                  {product.productstock.map((stock) => (
                    <option key={stock.stockseq} value={stock.size}>
                      {stock.size} ({stock.count}개 남음)
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
              <div className={styles.actions}>
                <motion.button 
                  onClick={addToWishlist}
                  className={styles.actionButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart /> 위시리스트
                </motion.button>
                <motion.button 
                  onClick={addToCart}
                  className={styles.actionButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaShoppingCart /> 장바구니
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </motion.div>

      <motion.div className={styles.detailMenu}>
        <motion.div
          className={`${styles.menuItem} ${showDescription ? styles.active : ''}`}
          onClick={() => {
            setShowDescription(true);
            setShowReviews(false);
            setShowGuide(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          상품설명
        </motion.div>
        <motion.div
          className={`${styles.menuItem} ${showReviews ? styles.active : ''}`}
          onClick={() => {
            setShowDescription(false);
            setShowReviews(true);
            setShowGuide(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          리뷰
        </motion.div>
        <motion.div
          className={`${styles.menuItem} ${showGuide ? styles.active : ''}`}
          onClick={() => {
            setShowDescription(false);
            setShowReviews(false);
            setShowGuide(true);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          사이즈 가이드
        </motion.div>
      </motion.div>
      <motion.div className={styles.detailContent}>
        {showDescription && (
          <div className={styles.description}>
            <p>{product.content}</p>
          </div>
        )}
        {showReviews && (
          <div className={styles.reviews}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <span>{review.username || "익명 사용자"}</span>
                  <span>{review.createdAt || "날짜 없음"}</span>
                  <div className={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < review.rating ? "#ffc107" : "#e4e5e9"} 
                      />
                    ))}
                  </div>
                </div>
                <p>{review.content}</p>
                {review.reply && <p className={styles.reply}><strong>판매자 답변:</strong> {review.reply}</p>}
              </div>
            ))}
            <div className={styles.writeReview}>
              <h4>리뷰 작성</h4>
              <div className={styles.ratingInput}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < reviewRating ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setReviewRating(i + 1)}
                  />
                ))}
              </div>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSubmitReview}
              >
                리뷰 등록
              </motion.button>
            </div>
          </div>
        )}
        {showGuide && (
          <div className={styles.guide}>
            <h4>사이즈 가이드</h4>
            <table>
              <thead>
                <tr>
                  <th>사이즈</th>
                  <th>어깨너비</th>
                  <th>가슴둘레</th>
                  <th>소매길이</th>
                  <th>총기장</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S</td>
                  <td>43</td>
                  <td>47</td>
                  <td>59</td>
                  <td>68</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>45</td>
                  <td>49</td>
                  <td>60</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>47</td>
                  <td>51</td>
                  <td>61</td>
                  <td>70</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      <div className={styles.relatedProducts}>
        <h3>관련 상품</h3>
        <div className={styles.productList}>
          {relatedProducts.map((related) => (
            <motion.div 
              key={related.productseq} 
              className={styles.product}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/product/${related.productseq}`)}
            >
              <img src={related.productimg[0]?.fileurl} alt={related.name} />
              <h4>{related.name}</h4>
              <p>{related.price.toLocaleString()}원</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
