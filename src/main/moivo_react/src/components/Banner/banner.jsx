import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/banner.module.css";
import axios from "axios";

const Banner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishListActive, setWishListActive] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLoggedIn(false);

      try {
        const response = await axios.get("http://localhost:8080/api/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(response.data);
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const navLinks = [
    { title: "New", submenu: ["Latest Trends", "Seasonal Picks", "Editors' Choice"], navigateTo: "/product" },
    { title: "Best Things", submenu: ["Best Sellers", "Customer Favorites", "Highly Rated"], navigateTo: "/product-list" },
    { title: "Shop All", submenu: ["All Products", "New Arrivals", "Exclusives"], navigateTo: "/product-list" },
  ];

  const utilityLinks = !isLoggedIn
    ? [ 
        { label: "Search", href: "/product-search", action: () => navigate("/product-search") },
        { label: "Login", href: "/user", action: () => navigate("/user") },
        { label: "FAQ", href: "/faq", action: () => navigate("/faq") },
        { label: "임시DB업로드", href: "/upload", action: () => navigate("/upload") },
      ] 
      // 비로그인 상태
    : [
        { label: "Search", href: "/product-search", action: () => navigate("/product-search") },
        { label: "Logout", href: "#", action: handleLogout },
        { label: "MyPage", href: "/mypage", action: () => navigate("/mypage") },
        { label: "WishList", href: "#", action: () => setWishListActive(!wishListActive) },
        { label: "FAQ", href: "/faq", action: () => navigate("/faq") },
        //  로그인 상태
      ];

  const handleToggleMenu = (index) => setOpenMenuIndex(openMenuIndex === index ? null : index);

  return (
    <header className={styles.banner}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <a className={styles.logoLink} onClick={() => navigate("/")}>
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
                      <button
                        key={subIdx}
                        className={styles.subLink}
                        onClick={() => navigate(link.navigateTo)}>
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utility}>
          {utilityLinks.map((link, idx) => (
            <a key={idx} href={link.href} className={styles.utilityLink} onClick={link.action}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Banner;
