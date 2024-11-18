import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 드롭다운 상태 관리

  useEffect(() => {
    // 여기서 세션 값을 가져와 로그인 상태를 설정
    const sessionValue = sessionStorage.getItem('isLoggedIn'); // 예: 세션에서 로그인 여부 확인
    setIsLoggedIn(sessionValue === 'true');
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    sessionStorage.removeItem('isLoggedIn'); // 세션 값 제거
    alert('You have been logged out.');
    navigate('/'); // 로그아웃 후 메인 페이지로 이동
  };

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
    { 
      label: 'Search', 
      href: '/product-search', // 검색 페이지로 연결
      onClick: () => navigate('/product-search') // Router를 통한 이동
    },
    // 로그인 상태에 따라 버튼이 달라짐
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
      onClick: () => setWishListActive(!wishListActive) 
    },
    { 
      label: 'FAQ', 
      href: '/faq', 
      onClick: () => navigate('/faq') // FAQ 페이지로 이동
    },
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
