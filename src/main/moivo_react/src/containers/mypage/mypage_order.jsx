import React from 'react';
import { Link } from 'react-router-dom';  // Link 태그 import
import styles from "../../assets/css/Mypage_order.module.css";

const mypage_order = () => {
    return (
        <div className={styles.memberFrame}>
            <div className={styles.order}>ORDER</div>
            <div className={styles.instructions}>
                주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.<br />
                취소/교환/반품 신청은 배송완료일 기준 7일까지 가능합니다.
            </div>
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
                      <Link to="/mypage/orderDetails" className={styles.orderLink}>[20241115-0001256]</Link>
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
              <div className={styles.row}>
                  <div className={styles.column}>
                      2024-09-05 <br />
                      <Link to="/order/20240905-1560058" className={styles.orderLink}>[20240905-1560058]</Link>
                  </div>
                  <div className={styles.image}>
                      <img src="../image/order2.png" alt="order" />
                  </div>
                  <div className={styles.column}>Golgi cotton bolero <br />[옵션: white]</div>
                  <div className={styles.column}>KRW 65,000</div>
                  <div className={styles.column}>
                      구매확정
                      <button className={styles.reviewButton}>REVIEW</button>
                  </div>
              </div>
              <div className={styles.row}>
                  <div className={styles.column}>
                      2024-07-21 <br />
                      <Link to="/order/20240721-420558" className={styles.orderLink}>[20240721-420558]</Link>
                  </div>
                  <div className={styles.image}>
                      <img src="../image/order3.png" alt="order" />
                  </div>
                  <div className={styles.column}>Jewel tee <br />[옵션: pink S]</div>
                  <div className={styles.column}>KRW 39,000</div>
                  <div className={styles.column}>
                      구매확정
                      <button className={styles.reviewButton}>REVIEW</button>
                  </div>
              </div>
          </div>

            
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
}

export default mypage_order;
