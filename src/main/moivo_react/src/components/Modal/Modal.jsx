import React from 'react';
import styles from '../../assets/css/modal.module.css';

const Modal = ({ isOpen, onClose, title, items }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <ul>
          {items.map((item) => (
            <li key={item.productseq}>
              <img src={item.productimg[0].fileurl} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>₩{item.price.toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal; 