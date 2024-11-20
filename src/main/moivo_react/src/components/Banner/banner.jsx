import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../../assets/css/banner.module.css';
import axios from 'axios';

const Banner = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const navLinks = [
    {
      title: 'SHOP',
      submenu: [
        { name: 'NEW', navigateTo: '/product-list' },
        { name: 'BEST', navigateTo: '/product-list' },
        { name: 'ALL', navigateTo: '/product-list' },
        { name: 'BOARD', navigateTo: '/product' }
      ]
    },
    {
      title: 'COMMUNITY',
      submenu: [
        { name: 'NOTICE', navigateTo: '/' },
        { name: 'Q&A', navigateTo: '/qna' },
        { name: 'REVIEW', navigateTo: '/qna/review' }
      ]
    }
  ];

  const handleToggleMenu = (idx) => {
    setOpenMenuIndex(openMenuIndex === idx ? null : idx);
  };

  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <header className={styles.banner}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <a className={styles.logoLink} onClick={() => navigate('/')}>
            Moivo
          </a>
        </h1>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link, idx) => (
              <li key={idx} className={styles.navItem}>
                <button className={styles.navLink} onClick={() => handleToggleMenu(idx)}>
                  {link.title}
                </button>
                {openMenuIndex === idx && (
                  <div className={styles.subMenu}>
                    {link.submenu.map((item, subIdx) => (
                      <a
                        key={subIdx}
                        className={styles.subLink}
                        onClick={() => navigate(item.navigateTo)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utility}>
          {isLoggedIn ? (
            <>
              <a href="/mypage" className={styles.utilityLink}>My Page</a>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <>
              <a href="/user" className={styles.utilityLink}>Login</a>
              <a href="/user_signup" className={styles.utilityLink}>Sign Up</a>
            </>
          )}
          <a href='/product-search' className={styles.utilityLink}>Search</a>
          {isLoggedIn && <a href='/upload' className={styles.utilityLink}>Upload</a>}
          {isLoggedIn && <a href='/mypage' className={styles.utilityLink}>Mypage</a>}
        </div>
      </div>
    </header>
  );
};

export default Banner;
