import React from 'react';
import styles from '../../assets/css/user_login.module.css';
import { Link } from 'react-router-dom';

const user_login = () => {
    return (
        <div className={styles.loginMain}>
            <div className={styles.container} id="container">
                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <form action="#">
                        <h1>Sign In</h1>
                            <div className={styles['social-container']}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>If you don't want to sign up,<br/>or use your account instead.</span>
                            <input type="email" placeholder="ID" />
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
