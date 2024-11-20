// src/components/Slider/Slider.jsx
import React, { useEffect, useState } from 'react';
import styles from "../../assets/css/Slider.module.css";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://static.zara.net/assets/public/367c/3a7e/8f13446db501/6375e147fa9e/image-landscape-8b3ed02c-d286-4182-afd5-137c7958ad3d-default_0/image-landscape-8b3ed02c-d286-4182-afd5-137c7958ad3d-default_0.jpg?ts=1730907764587&w=1775",
    "https://static.zara.net/assets/public/b567/b1ff/c40a4eafae24/693cc78ba17e/image-landscape-7589e724-ce17-4083-acfe-e1dcf345fdea-default_0/image-landscape-7589e724-ce17-4083-acfe-e1dcf345fdea-default_0.jpg?ts=1731590140965&w=1920",
    "https://static.zara.net/assets/public/d241/4ae3/4e3145d182c6/942a76f830af/image-landscape-5b432a32-f01f-45d2-9726-5d66ff8aed41-default_0/image-landscape-5b432a32-f01f-45d2-9726-5d66ff8aed41-default_0.jpg?ts=1731516447084&w=1920",
    "https://artifacts.co.kr/artfinger/main/main01.jpg",
    "https://artifacts.co.kr/artfinger/main/main02.jpg",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4590);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className={`${styles.carouselItem} ${index === activeIndex ? styles.active : ''}`}>
            <img src={image} alt={`슬라이드 이미지 ${index + 1}`} className={styles.carouselImage} />
          </div>
        ))}
      </div>
      <div className={styles.carouselNav}>
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`${styles.carouselNavItem} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
      <button className={styles.carouselControlPrev} onClick={goToPrevious}>❮</button>
      <button className={styles.carouselControlNext} onClick={goToNext}>❯</button>
    </div>
  );
};

export default Slider;
