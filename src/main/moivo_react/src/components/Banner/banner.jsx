import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/banner.module.css";
import axios from "axios"; // Spring Boot와 통신

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // 현재 열린 서브메뉴 인덱스

  // 로그인 상태 확인 (Spring Boot와 연결 시 활성화)
  /*
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/check", { withCredentials: true }); // 로그인 상태 확인 API
        setIsLoggedIn(response.data.isLoggedIn); // 서버로부터 로그인 상태 확인
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);
  */

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true }); // 로그아웃 API
      alert("로그아웃되었습니다.");
      navigate("/");
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

  // 유틸리티 링크 정의
  const utilityLinks = [
    // 로그인 상태에 따른 조건부 렌더링 주석 추가
    /*
    ...(isLoggedIn
      ? [
          {
            label: "MyPage",
            href: "/mypage",
            onClick: () => navigate("/mypage"),
          },
          {
            label: "Logout",
            href: "#",
            onClick: handleLogout,
          },
        ]
      : [
          {
            label: "Login",
            href: "/user",
            onClick: () => navigate("/user"),
          },
        ]),
    */
    {
      label: "Search",
      href: "/product-search",
      onClick: () => navigate("/product-search"),
    },
    {
      label: "Login", // 기본으로 보이도록 설정
      href: "/user",
      onClick: () => navigate("/user"),
    },
    {
      label: "Logout", // 기본으로 보이도록 설정
      href: "#",
      onClick: handleLogout,
    },
    {
      label: "MyPage",
      href: "/mypage",
      onClick: () => navigate("/mypage"),
    },
    {
      label: "WishList",
      href: "#",
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
