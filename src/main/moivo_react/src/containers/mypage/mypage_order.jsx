import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../../assets/css/Mypage_order.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";

const mypage_order = () => {
    // 상품 데이터를 배열로 정의
    const orders = [
        {
            orderDate: "2024-11-15",
            orderNumber: "20241115-0001256",
            imageSrc: "../image/order1.png",
            productName: "Ballerina skirt",
            productOptions: "옵션: black M",
            price: "KRW 69,000",
            status: "구매확정"
        },
        {
            orderDate: "2024-09-05",
            orderNumber: "20240905-1560058",
            imageSrc: "../image/order2.png",
            productName: "Golgi cotton bolero",
            productOptions: "옵션: white",
            price: "KRW 65,000",
            status: "구매확정"
        },
        {
            orderDate: "2024-07-21",
            orderNumber: "20240721-420558",
            imageSrc: "../image/order3.png",
            productName: "Jewel tee",
            productOptions: "옵션: pink S",
            price: "KRW 39,000",
            status: "구매확정"
        }
    ];

    return (
        <div>
            <div className={styles.memberFrame}>
                <Banner />
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
                    {/* 반복문을 사용하여 주문 목록 표시 */}
                    {orders.map((order, index) => (
                        <div className={styles.row} key={index}>
                            <div className={styles.column}>
                                {order.orderDate} <br />
                                <Link to={`/mypage/orderDetails`} className={styles.orderLink}>
                                    [{order.orderNumber}]
                                </Link>
                            </div>
                            <div className={styles.image}>
                                <img src={order.imageSrc} alt="order" />
                            </div>
                            <div className={styles.column}>{order.productName} <br />[옵션: {order.productOptions}]</div>
                            <div className={styles.column}>{order.price}</div>
                            <div className={styles.column}>
                                {order.status}
                                <button className={styles.reviewButton}>REVIEW</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default mypage_order;
