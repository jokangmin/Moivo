import React from 'react';
import styles from '../../assets/css/modal.module.css';

const Modal = ({ isOpen, onClose, title, items, onRemove, onQuantityChange }) => {
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <span className={styles.itemCount}>총 {items.length}개의 상품</span>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        {items.length > 0 ? (
          <>
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.id} className={styles.itemCard}>
                  <div className={styles.itemImageWrap}>
                    <img src={item.productimg[0].fileurl} alt={item.name} className={styles.itemImage} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemHeader}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => onRemove(item.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <p className={styles.itemPrice}>₩{item.price.toLocaleString()}</p>
                    {title === "장바구니" && (
                      <div className={styles.quantityControl}>
                        <button 
                          onClick={() => onQuantityChange && onQuantityChange(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                        >-</button>
                        <span>{item.quantity || 1}</span>
                        <button 
                          onClick={() => onQuantityChange && onQuantityChange(item.id, (item.quantity || 1) + 1)}
                        >+</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.modalFooter}>
              <div className={styles.totalPrice}>
                <span>총 금액</span>
                <strong>₩{getTotalPrice().toLocaleString()}</strong>
              </div>
              {title === "장바구니" && (
                <button className={styles.checkoutBtn}>
                  결제하기 <i className="fas fa-arrow-right"></i>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <i className={`fas ${title === "장바구니" ? "fa-shopping-cart" : "fa-heart"}`}></i>
            <p>{title === "장바구니" ? "장바구니가 비어있습니다." : "위시리스트가 비어있습니다."}</p>
            <button className={styles.shopBtn} onClick={onClose}>쇼핑 계속하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 