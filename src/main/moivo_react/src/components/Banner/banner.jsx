import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 드롭다운 상태 관리

  const navLinks = [
    {
      title: 'New',
      submenu: ['Latest Trends', 'Seasonal Picks', 'Editors\' Choice'],
    },
    {
      title: 'Best Things',
      submenu: ['Best Sellers', 'Customer Favorites', 'Highly Rated'],
    },
    {
      title: 'Shop All',
      submenu: ['All Products', 'New Arrivals', 'Exclusives'],
      navigateTo: '/product-list',
    },
  ];

  const utilityLinks = [
    { label: 'Search', href: '#' }, // 예시로 검색 페이지 연결
    { label: isLoggedIn ? 'Logout' : 'Login', href: '#', onClick: () => setIsLoggedIn(!isLoggedIn) },
    { 
      label: 'WishList', 
      href: '#', 
      visible: isLoggedIn, 
      onClick: () => setWishListActive(!wishListActive),
    },
    { label: 'FAQ', href: '/faq' }, // FAQ 페이지 연결
  ];

  const handleToggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // 클릭 시 드롭다운 열기/닫기
  };

  return (
    <header className={styles.banner}>
      <div className={styles.inner}>
        {/* 로고 */}
        <h1 className={styles.logo}>
          <a className={styles.logoLink} onClick={() => navigate('/')}>
            Moivo
          </a>
        </h1>

        {/* 네비게이션 */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link, idx) => (
              <li key={idx} className={styles.navItem}>
                <button
                  className={styles.navLink}
                  onClick={() => handleToggleMenu(idx)}
                >
                  {link.title}
                </button>
                {openMenu === idx && (
                  <div className={styles.subMenu}>
                    {link.submenu.map((item, subIdx) => (
                      <button
                        key={subIdx}
                        className={styles.subLink}
                        onClick={() => {
                          if (link.navigateTo) navigate(link.navigateTo);
                          setOpenMenu(null); // 서브메뉴 선택 후 닫기
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 유틸리티 메뉴 */}
        <div className={styles.utility}>
          {utilityLinks.map((link, idx) => (
            link.visible !== false && ( // 로그인 여부에 따라 WishList 표시
              <a
                key={idx}
                href={link.href}
                className={styles.utilityLink}
                onClick={link.onClick}
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Banner;
