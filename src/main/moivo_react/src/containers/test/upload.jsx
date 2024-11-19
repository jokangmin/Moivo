import React, { useState } from "react";
import styles from "../../assets/css/upload.module.css";
import axios from "axios";
import Banner from "../../components/Banner/banner";

const Upload = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    content: "",
  });
  const [files, setFiles] = useState({ layer1: [], layer2: [], layer3: [] });
  const [progress, setProgress] = useState(0);

  // 상품 정보 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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
    if (!product.name || !product.price || !product.category || !product.content) {
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
    formData.append("category", product.category);
    formData.append("content", product.content);

    // 각 레이어 파일 추가
    files.layer1.forEach((file) => formData.append("layer1", file));
    files.layer2.forEach((file) => formData.append("layer2", file));
    files.layer3.forEach((file) => formData.append("layer3", file));

    try {
      await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
      alert("상품 업로드가 완료되었습니다.");
      resetForm();
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다.");
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setProduct({ name: "", price: "", category: "", content: "" });
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
            카테고리:
            <input
              type="text"
              name="category"
              value={product.category}
              placeholder="카테고리를 입력하세요"
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
