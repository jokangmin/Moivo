import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/banner.module.css";
import axios from "axios"; // Spring Boot와 통신

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // 현재 열린 서브메뉴 인덱스

  useEffect(() => {
    // JWT 토큰 확인 및 로그인 상태 설정
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  const handleLogout = async () => {
    try {
      // Spring Boot 서버로 로그아웃 요청
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "/api/logout", // 로그아웃 API 엔드포인트
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰 추가
            },
          }
        );
        // 토큰 제거 및 상태 업데이트
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        alert("로그아웃되었습니다.");
        navigate("/");
      } else {
        alert("이미 로그아웃 상태입니다.");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const navLinks = [
    {
      title: "New",
      submenu: ["Latest Trends", "Seasonal Picks", "Editors' Choice"],
      navigateTo: "/product",
    },
    {
      title: "Best Things",
      submenu: ["Best Sellers", "Customer Favorites", "Highly Rated"],
      navigateTo: "/product-list",
    },
    {
      title: "Shop All",
      submenu: ["All Products", "New Arrivals", "Exclusives"],
      navigateTo: "/product-list",
    },
  ];

  const utilityLinks = [
    {
      label: "Search",
      href: "/product-search",
      onClick: () => navigate("/product-search"),
    },
    ...(isLoggedIn
      ? [
          { label: "MyPage", href: "/mypage", onClick: () => navigate("/mypage") },
          { label: "Logout", href: "#", onClick: handleLogout },
        ]
      : [{ label: "Login", href: "/login", onClick: () => navigate("/login") }]),
    {
      label: "WishList",
      href: "#",
      visible: isLoggedIn,
      onClick: () => setWishListActive(!wishListActive),
    },
    {
      label: "FAQ",
      href: "/faq",
      onClick: () => navigate("/faq"),
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
          <a className={styles.logoLink} onClick={() => navigate("/")}>
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
