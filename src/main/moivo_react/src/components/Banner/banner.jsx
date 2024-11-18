import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // 현재 열린 서브메뉴 인덱스

  useEffect(() => {
    // 세션 값을 가져와 로그인 상태를 설정
    const sessionValue = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(sessionValue === 'true');
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    alert('너는 로그아웃 상태야.');
    navigate('/');
  };

  const navLinks = [
    {
      title: 'New',
      submenu: ['Latest Trends', 'Seasonal Picks', 'Editors\' Choice'],
      navigateTo: '/product',
    },
    {
      title: 'Best Things',
      submenu: ['Best Sellers', 'Customer Favorites', 'Highly Rated'],
      navigateTo: '/product-list'
    },
    {
      title: 'Shop All',
      submenu: ['All Products', 'New Arrivals', 'Exclusives'],
      navigateTo: '/product-list',
    },
  ];

  const utilityLinks = [
    {
      label: 'Search',
      href: '/product-search',
      onClick: () => navigate('/product-search'),
    },
    ...(isLoggedIn
      ? [
          { label: 'MyPage', href: '/mypage', onClick: () => navigate('/mypage') },
          { label: 'Logout', href: '#', onClick: handleLogout },
        ]
      : [{ label: 'Login', href: '/login', onClick: () => navigate('/login') }]),
    {
      label: 'WishList',
      href: '#',
      visible: isLoggedIn,
      onClick: () => setWishListActive(!wishListActive),
    },
    {
      label: 'FAQ',
      href: '/faq',
      onClick: () => navigate('/faq'),
    },
  ];

  const handleToggleMenu = (index) => {
    // 클릭한 메뉴의 인덱스만 열고 나머지는 닫음
    setOpenMenuIndex(openMenuIndex === index ? null : index);
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
                  onClick={() => handleToggleMenu(idx)} // 특정 서브메뉴 열기/닫기
                >
                  {link.title}
                </button>
                {openMenuIndex === idx && (
                  <div className={styles.subMenu}>
                    {link.submenu.map((item, subIdx) => (
                      <button
                        key={subIdx}
                        className={styles.subLink}
                        onClick={() => {
                          if (link.navigateTo) navigate(link.navigateTo);
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
          {utilityLinks.map(
            (link, idx) =>
              link.visible !== false && (
                <a
                  key={idx}
                  href={link.href}
                  className={styles.utilityLink}
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
              )
          )}
        </div>
      </div>
    </header>
  );
};

export default Banner;
