import React, { useState, useEffect } from "react";
import styles from "../../assets/css/upload.module.css";
import axios from "axios";
import Banner from "../../components/Banner/banner";

const Upload = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    content: ""
  });

  const [stock, setStock] = useState({
    S : 0,
    M : 0,
    L : 0
  });
  const [files, setFiles] = useState({ layer1: [], layer2: [], layer3: [] });
  const [progress, setProgress] = useState(0);

  // 상품 정보 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    
    if(name == "S" || name == "M" || name == "L") {
      setStock((prev) => ({ ...prev, [name]: value }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
    
  };

  // 파일 추가 핸들러 (파일 선택 및 드래그 앤 드롭 모두 처리)
  const handleFileChange = (newFiles, layer) => {
    setFiles((prev) => ({
      ...prev,
      [layer]: [...prev[layer], ...newFiles],
    }));
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, layer) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles, layer);
  };

  // 업로드 핸들러
  const handleUpload = async () => {
    if (!product.name || !product.price || !product.content || !stock.S || !stock.M || !stock.L) {
      alert("모든 상품 정보를 입력해주세요.");
      return;
    }
    if (!files.layer1.length || !files.layer2.length || !files.layer3.length) {
      alert("모든 레이어(layer)에 파일을 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("content", product.content);
    formData.append("S", stock.S);
    formData.append("M", stock.M);
    formData.append("L", stock.L);

    // 레이어별 파일 추가
    files.layer1.forEach((file) => formData.append("layer1", file));
    files.layer2.forEach((file) => formData.append("layer2", file));
    files.layer3.forEach((file) => formData.append("layer3", file));

    // 로그 추가: FormData 확인
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/admin/store/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
          console.log("Upload progress: " + percentCompleted + "%");
        },
      });

      // 로그 추가: 업로드 성공
      console.log("Upload successful:", response.data);
      alert("상품 업로드가 완료되었습니다.");
      resetForm();
    } catch (error) {
      // 로그 추가: 업로드 실패
      console.error("업로드 실패:", error.response || error);
      alert("업로드에 실패했습니다.");
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setProduct({ name: "", price: "", content: "", stock: "" });
    setFiles({ layer1: [], layer2: [], layer3: [] });
    setProgress(0);
  };

  return (
    <div className={styles.uploadContainer}>
      <Banner />
      <br/><br/><br/><br/>
      <div className={styles.uploadContent}>
        <h1 className={styles.title}>상품 업로드</h1>

        {/* 상품 정보 입력 */}
        <div className={styles.form}>
          <label>
            상품명:
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="상품명을 입력하세요"
              onChange={handleInputChange}
            />
          </label>
          <label>
            가격:
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="상품 가격을 입력하세요"
              onChange={handleInputChange}
            />
          </label>
          <label>
            설명:
            <textarea
              name="content"
              value={product.content}
              placeholder="상품 설명을 입력하세요"
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            재고 S:
            <input
              type="number"
              name="S"
              value={stock.S}
              placeholder="상품 재고를 입력하세요"
              onChange={handleInputChange}
            />
          </label>
          <label>
            재고 M:
            <input
              type="number"
              name="M"
              value={stock.M}
              placeholder="상품 재고를 입력하세요"
              onChange={handleInputChange}
            />
          </label>
          <label>
            재고 L:
            <input
              type="number"
              name="L"
              value={stock.L}
              placeholder="상품 재고를 입력하세요"
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* 파일 업로드 섹션 */}
        <div className={styles.fileSection}>
          {["layer1", "layer2", "layer3"].map((layer, index) => (
            <div
              key={index}
              className={styles.fileGroup}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, layer)}
            >
              <label>
                {`Layer ${index + 1} 파일 업로드:`}
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(Array.from(e.target.files), layer)}
                />
              </label>
              <div className={styles.fileList}>
                {files[layer].map((file, idx) => (
                  <span key={idx} className={styles.fileItem}>
                    {file.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* 업로드 진행률 */}
        {progress > 0 && (
          <div className={styles.progressContainer}>
            <progress value={progress} max="100" />
            <span>{progress}%</span>
          </div>
        )}
       
        {/* 업로드 버튼 */}
        <button className={styles.uploadButton} onClick={handleUpload}>
          업로드
        </button>
        
      </div>  
    </div>
  );
};

export default Upload;