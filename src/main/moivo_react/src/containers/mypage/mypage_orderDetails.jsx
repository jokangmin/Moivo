import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../../assets/css/Mypage_orderDetails.module.css";

const MypageOrderDetails = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/mypage/order'); // 이동할 경로 설정
    };
    return (
        <div className={styles.orderDetailsContainer}>
            {/* 헤더 섹션 */}
            <header className={styles.header}>
                <h1>ORDER DETAILS</h1>
            </header>

            {/* 주문 및 배송 정보 */}
            <section className={styles.infoSection}>
                <div className={styles.orderInfo}>
                    <p className={styles.label2} style={{ color: '#2F2E2C' }}>주문정보</p>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>주문번호:</p>
                        <p className={styles.value}>20241115-0001256</p>
                    </div>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>주문일자:</p>
                        <p className={styles.value}>2024-11-15 15:56:26</p>
                    </div>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>주문자:</p>
                        <p className={styles.value} style={{ color: '#2F2E2C' }}>전수민</p>
                    </div>
                </div>
                <div className={styles.shippingInfo}>
                    <p className={styles.label2} style={{ color: '#2F2E2C' }}>배송지정보</p>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>우편번호:</p>
                        <p className={styles.value} style={{ color: '#2F2E2C' }}>06134</p>
                    </div>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>주소:</p>
                        <p className={styles.value} style={{ color: '#2F2E2C' }}>서울시 강남구 강남대로94길 20 6층 602호</p>
                    </div>
                    <hr className={styles.dottedLine} />
                    <div className={styles.rowInfo}>
                        <p className={styles.label}>휴대전화:</p>
                        <p className={styles.value} style={{ color: '#2F2E2C' }}>010 - 4567 - 0680</p>
                    </div>
                </div>
            </section>
            <hr className={styles.solidLine} />

            {/* 주문 상품 정보 */}
            <section className={styles.tableSection}>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={styles.column2}>주문일자<br />[주문번호]</div>
                        <div className={styles.column2}>이미지</div>
                        <div className={styles.column2}>상품정보</div>
                        <div className={styles.column2}>상품금액</div>
                        <div className={styles.column2}>주문처리상태</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            2024-11-15 <br />
                            <Link to="/order/20241115-0001256" className={styles.orderLink}>[20241115-0001256]</Link>
                        </div>
                        <div className={styles.image}>
                            <img src="../image/order1.png" alt="order" />
                        </div>
                        <div className={styles.column}>Ballerina skirt <br />[옵션: black M]</div>
                        <div className={styles.column}>KRW 69,000</div>
                        <div className={styles.column}>
                        구매확정
                        <button className={styles.reviewButton}>REVIEW</button>
                  </div>
                    </div>
                </div>
            </section>

            <hr className={styles.solidLine} />

            {/* 결제 정보 */}
            <section className={styles.paymentSummary}>
                <div className={styles.paymentDetails}>
                    <p>상품구매금액 69,000
                    - 할인금액 5,000
                    + 배송비 3,000</p>
                </div>
                <p className={styles.totalPrice}>합계: <span>KRW 67,000</span></p>
            </section>


            {/* 주문 목록 버튼 */}
            <button className={styles.backToOrders} onClick={handleButtonClick}>
            주문목록
            </button>
            {/* Footer */}
            <footer id="main-footer" className={styles.mainFooter}>
                <div className="container">
                    <div className={styles.footerGridContainer}> 

                        <div>
                            <section className={styles.navLogo}>
                                Moivo
                            </section>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque provident labore suscipit, id illo magni odit?
                            </p>
                        </div>
                        <div>
                            <h2>PRIVACY & TERMS</h2>
                            <ul className={styles.anchorLinks}>
                                <li><a href="#">Privacy & Security</a></li>
                                <li><a href="#">Terms and Conditions</a></li>
                                <li><a href="#">Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2>GET NOTIFIED FOR NEW PRODUCTS</h2>
                            <form>
                                <input type="email" placeholder="Email" />
                                <input type="submit" className={styles.btn} value="Submit" />
                            </form>
                        </div>
                        <div> 
                            <h2>SITE LINKS</h2>
                            <ul className={styles.anchorLinks}>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Help & Support</a></li>
                                <li><a href="#">Career</a></li>
                                <li><a href="#">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
  );
};;

export default MypageOrderDetails;
