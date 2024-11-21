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

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setMainImg(selectedProduct.productimg[0].fileurl);
    } else {
      setProduct(null);
    }
  }, [id]);

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
      
      <motion.div
        className={styles.detailContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.productImages}>
          <div className={styles.mainImage}>
            <img
              src={mainImg || "/placeholder.jpg"}
              alt={product.name || "이미지 없음"}
            />
          </div>
          <div className={styles.thumbnails}>
            {product.productimg.map((img) => (
              <img 
                key={img.id}
                src={img.fileurl} 
                alt={product.name} 
                onClick={() => setMainImg(img.fileurl)}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>{product.price.toLocaleString()}원</p>
          <p className={styles.productDescription}>{product.content}</p>
          <div className={styles.sizeSelector}>
            <label htmlFor="size">사이즈:</label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">-- 사이즈 선택 --</option>
              {/* 사이즈 옵션 추가 */}
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
              onClick={() => {/* 위시리스트 추가 로직 */}}
              className={styles.actionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart /> 위시리스트
            </motion.button>
            <motion.button 
              onClick={() => {/* 장바구니 추가 로직 */}}
              className={styles.actionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart /> 장바구니
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className={styles.additionalImages}>
        {product.productimg.map((img, index) => (
          <img key={index} src={img.fileurl} alt={`Additional ${index + 1}`} className={styles.additionalImage} />
        ))}
      </div>

      <div className={styles.reviewSection}>
        <h2>리뷰 작성하기</h2>
        <button 
          onClick={() => navigate(`/review/${id}`)} 
          className={styles.reviewButton}
        >
          리뷰 작성하러 가기
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
