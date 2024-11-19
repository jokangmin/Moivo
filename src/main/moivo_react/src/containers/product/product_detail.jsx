import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";

const ProductDetail = ({ productId }) => {
  const { state } = useLocation(); // useLocation으로 전달된 product 정보 가져오기
  const product = state?.product; // 상품 데이터
  const navigate = useNavigate();

  // 이후 DB 연결 및 Spring 연결시 적용
  // const [product, setProduct] = useState(null);
  // const [images, setImages] = useState([]);
  // const [mainImage, setMainImage] = useState(null);
  // const [subImages, setSubImages] = useState([]);
  // const [detailImages, setDetailImages] = useState([]);

  useEffect(() => {
    // Fetch product data
    axios.get(`/api/product/${productId}`).then((response) => {
      setProduct(response.data);
    });

    // Fetch images by layer
    axios.get(`/api/product/${productId}/images`).then((response) => {
      const allImages = response.data;
      setMainImage(allImages.find((img) => img.layer === 1));
      setSubImages(allImages.filter((img) => img.layer === 2));
      setDetailImages(allImages.filter((img) => img.layer === 3));
    });
  }, [productId]);

  // product 데이터가 없을 경우 처리
  if (!product) return <div>Loading...</div>;


  const [selectedSize, setSelectedSize] = useState(""); // 선택된 사이즈
  const [cartCount, setCartCount] = useState(0); // 장바구니 카운트
  const [mainImg, setMainImg] = useState(product?.image); // 메인 이미지
  const [showTopButton, setShowTopButton] = useState(false); // 상단 버튼 표시 여부

  // API 테스트용 함수
  const onTest = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/store/review/test");
      alert(`연결 성공: ${response.data.message}`);
    } catch (error) {
      console.error("API 테스트 실패:", error);
      alert(`연결 실패: ${error.response?.data?.message || "서버 오류"}`);
    }
  };

  // 장바구니 추가 함수
  const addToCart = () => {
    if (!selectedSize) {
      alert("옵션을 선택해주세요.");
      return;
    }
    setCartCount(cartCount + 1);
    alert(`장바구니에 추가됨! ${product.title}, 사이즈: ${selectedSize}`);
  };

  // 상단 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.content}>
        {/* 상품 정보 영역 */}
        <div className={styles.infoArea}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>카테고리: {product.category}</p>
          <p className={styles.price}>₩{product.price.toLocaleString()}</p>
          <p className={styles.stock}>재고: {product.stock}개</p>

          <div className={styles.options}>
            <label>사이즈:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={styles.select}
            >
              <option value="">사이즈 선택</option>
              {product.size.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {selectedSize && (
            <div className={styles.selectedOptions}>
              <p>선택한 옵션: 사이즈 - {selectedSize}</p>
            </div>
          )}
          <button className={styles.cartBtn} onClick={addToCart}>
            장바구니에 추가
          </button>
          <button className={styles.buyBtn} onClick={() => alert("구매 페이지로 이동")}>
            바로 구매하기
          </button>

          <details className={styles.details}>
            <summary className={styles.summary}>세부정보</summary>
            <div className={styles.detailsContent}>
              <p>
                <strong>SIZE(cm):</strong>
                <ul>
                  <li>M: 어깨 52 / 가슴 65.5 / 소매 62.5 / 총장 78</li>
                  <li>L: 어깨 54 / 가슴 68 / 소매 63.5 / 총장 80</li>
                  <li>XL: 어깨 56 / 가슴 70.5 / 소매 64.5 / 총장 82</li>
                </ul>
              </p>
              <p>
                <strong>모델 정보:</strong> 186cm / 65kg / Top (L size) / Bottom (M size)
              </p>
              <p>
                - 사이즈 측정 방법에 따라 1~2cm 오차가 생길 수 있습니다.
                <br />
                - 모니터 설정에 따라 색상이 다르게 보일 수 있습니다.
                <br />
                - 착장컷은 색감, 보정 및 조명으로 인해 결과가 상이할 수 있는 점 양해 바랍니다.
              </p>
            </div>
          </details>
        </div>

        {/* 이미지 갤러리 영역 */}
        <div className={styles.gallery}>
          <div className={styles.mainImgWrap}>
            <img src={mainImg} alt={product.title} className={styles.mainImg} />
          </div>
          <div className={styles.thumbs}>
            {[product.image, product.image, product.image, product.image].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`썸네일 ${idx}`}
                className={styles.thumb}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className={styles.description}>
        <h2>상품 설명</h2>
        <p>{product.description || "해당 상품에 대한 설명이 없습니다."}</p>
      </div>

      {/* 상품 상세 이미지 섹션 */}
      <div>
        상품 상세 이미지 섹션
        준비중...
      </div>

      {/* 리뷰 섹션 */}
      <div className={styles.reviewSection}>
        <h2>리뷰 섹션</h2>
        <button onClick={onTest}>API 테스트</button>
      </div>

      {/* 상단 이동 버튼 */}
      {showTopButton && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ⬆️
        </button>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
