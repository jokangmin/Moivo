import React, { useState } from 'react';
import styles from "../../assets/css/Mypage_profile.module.css";

const MypageProfile = () => {
    const [formData, setFormData] = useState({
        id: "sumin",
        password: "bitcamp123!@#",
        confirmPassword: "bitcamp123!@#",
        name: "전수민",
        postalCode: "06134",
        address: "서울시 강남구 강남대로94길 20",
        detailedAddress: "6층 602호",
        phone1: "010",
        phone2: "4567",
        phone3: "0680",
        email: "ujstnal5@gmail.com",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("회원정보가 수정되었습니다.");
    };

    const handleCancel = () => {
        alert("수정이 취소되었습니다.");
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.pageName}>PROFILE</div>
            {/* 멤버십 박스 */}
            <div className={styles.membershipBox}>
                <div className={styles.membershipImage}>
                    <img src="../image/level5.png" alt="Profile" />
                </div>
                <div>
                    <div className={styles.membershipInfo}>
                        전수민님의 멤버십 등급은 [GOLD]입니다.<br />
                        VIP까지 남은 구매금액은 KRW 100,000원입니다.
                    </div>
                    <div className={styles.pointCoupon}>POINT : 5,000 | COUPON : 10</div>
                </div>
            </div>
            <form className={styles.profileForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <label>ID</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} disabled />
                </div>
                <div className={styles.formRow}>
                    <label>PASSWORD</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className={styles.formRow}>
                    <label>CONFIRM PASSWORD</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <div className={styles.formRow}>
                    <label>NAME</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className={styles.formRow}>
                    <label>ADDRESS</label>
                    <div className={styles.addressContainer}>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="우편번호"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="기본 주소"
                        />
                        <input
                            type="text"
                            name="detailedAddress"
                            value={formData.detailedAddress}
                            onChange={handleChange}
                            placeholder="상세 주소"
                        />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <label>PHONE</label>
                    <div className={styles.phoneRow}>
                        <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} maxLength="3" />
                        <span>-</span>
                        <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} maxLength="4" />
                        <span>-</span>
                        <input type="text" name="phone3" value={formData.phone3} onChange={handleChange} maxLength="4" />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <label>EMAIL</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.buttonRow}>
                    <button type="submit" className={styles.submitButton}>회원정보 수정</button>
                    <button type="button" className={styles.cancelButton} onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default MypageProfile;
