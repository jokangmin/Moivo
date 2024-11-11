// Store.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import styles from '../css/Store.module.css'; // Importing CSS module

gsap.registerPlugin(Flip);

const Store = () => {
  const listContainerRef = useRef(null);
  const itemsRef = useRef([]);

  const handleItemClick = (item, itemContainer) => {
    const state = Flip.getState(item);
    const newContainer = item.parentNode === itemContainer ? listContainerRef.current : itemContainer;

    if (newContainer) {
      item.parentNode === itemContainer
        ? item.classList.add(styles.basket__item)
        : item.classList.remove(styles.basket__item);

      newContainer.appendChild(item);

      Flip.from(state, {
        duration: 1,
        ease: 'power1.inOut',
        scale: true,
        zIndex: 10,
      });
    }
  };

  useEffect(() => {
    const items = itemsRef.current;

    if (listContainerRef.current && items.length > 0) {
      items.forEach((item, index) => {
        if (item) {
          const itemContainer = item.parentNode;
          const boundHandleItemClick = () => handleItemClick(item, itemContainer);

          item.addEventListener('click', boundHandleItemClick);

          if ([0, 2, 5].includes(index)) {
            setTimeout(() => {
              boundHandleItemClick();
            }, (index + 1) * 1000);
          }

          item.boundHandleItemClick = boundHandleItemClick;
        }
      });
    }

    return () => {
      items.forEach((item) => {
        if (item && item.boundHandleItemClick) {
          item.removeEventListener('click', item.boundHandleItemClick);
        }
      });
    };
  }, []);

  const products = [
    { id: 1, name: 'Item 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item 3', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.header__logoContainer}>
          <a href="#" className={styles.header__logo}>Home</a>
        </div>
        <div className={styles.header__links}>
          <a href="#" className={styles.header__link}>New-In</a>
          <a href="#" className={styles.header__link}>Decorated</a>
          <a href="#" className={styles.header__link}>Customize</a>
          <a href="#" className={styles.header__link}>Sale</a>
        </div>
        <div className={styles.header__searchContainer}>
          <input className={styles.header__search} type="text" placeholder="Search" />
        </div>
      </header>

      <div className={styles.sidebar}>
        <h2 className={styles.sidebar__title}>패션/잡화 (354)</h2>
      </div>

      <div className={styles.main}>
        <h2 className={styles.main__title}>패션잡화 (354)</h2>
        <div className={styles.items}>
          {products.map((product, index) => (
            <div key={product.id} className={styles.item} ref={(el) => (itemsRef.current[index] = el)}>
              <div className={styles.item__position}>
                <img src={product.image} alt={product.name} className={styles.item__image} />
              </div>
              <div className={styles.item__detail}>
                <p>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={listContainerRef} className={styles.basket__list}>Basket</div>

      <footer className={styles.footer}>
        <p>Built with love by Developer</p>
      </footer>
    </div>
  );
};

export default Store;
