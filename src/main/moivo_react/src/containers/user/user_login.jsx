import React, { useState } from 'react';
import styles from '../../assets/css/user_login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const user_login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/api/auth/login", formData);
          localStorage.setItem("token", response.data); // JWT 저장
          alert("로그인 성공!");
          navigate("/mypage");
        } catch (error) {
          console.error("로그인 실패:", error);
          alert("로그인에 실패했습니다.");
        }
      };

    return (
        <div className={styles.loginMain}>
            <div className={styles.container} id="container">
                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <form action="#" onSubmit={handleSubmit}>
                        <Link to="/">
                        <h1>Moivo</h1>
                        </Link>
                            <div className={styles['social-container']}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>If you don't want to sign up,<br/>or use your account instead.</span>
                            <input type="ID" placeholder="ID" />
                            <input type="password" placeholder="Password" />
                            <a href="#">For got your password?</a>
                            <button>Sign In</button>
                    </form>
                </div>
                <div className={styles['overlay-container']}>
                    <div className={styles.overlay}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1>Hello, Style Icon!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/user_signup">
                                <button className={styles.ghost} id="signUp">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default user_login;
