import React, { useState, useEffect } from 'react';
import styles from '../../css/Store_list.module.css';

const StoreList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API가 있을 경우 fetch 함수로 데이터 가져오기
    // 예시: fetchProducts();
    setProducts([
      { id: 1, title: '상품명 1', description: '상품 설명 1', image: 'https://via.placeholder.com/300' },
      { id: 2, title: '상품명 2', description: '상품 설명 2', image: 'https://via.placeholder.com/300' },
      { id: 3, title: '상품명 3', description: '상품 설명 3', image: 'https://via.placeholder.com/300' },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <h2>상품 리스트</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
