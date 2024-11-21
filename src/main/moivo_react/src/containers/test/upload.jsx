import React, { useState, useEffect } from "react";
import styles from "../../assets/css/upload.module.css";
import axios from "axios";
import Banner from "../../components/Banner/banner";

const Upload = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    content: "",
    categoryseq: "",
  });

  const [categories, setCategories] = useState([]);

  const [stock, setStock] = useState([
    { size: 'SIZE_1', count: 0 },
    { size: 'SIZE_2', count: 0 },
    { size: 'SIZE_3', count: 0 },
  ]);

  const [categoryName, setCategoryName] = useState("");

  const [files, setFiles] = useState({
    layer1: null,
    layer2: null,
    layer3: null,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 카테고리 정보 가져오기
    axios.get("/api/categories").then((res) => {
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error("카테고리 데이터는 배열이 아닙니다 ? :", res.data);
      }
    });
  }, []);

  // 상품 정보 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 재고 입력 핸들러
  const handleStockChange = (index, field, value) => {
    const updatedStock = [...stock];
    updatedStock[index][field] = value;
    setStock(updatedStock);
  };

  // 카테고리 이름 입력 핸들러
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // 파일 추가 핸들러
  const handleFileChange = (e, layer) => {
    setFiles((prev) => ({ ...prev, [layer]: e.target.files[0] }));
  };

  // 업로드 핸들러
  const handleUpload = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.content ||
      !product.categoryseq
    ) {
      alert("모든 상품 정보를 입력해주세요.");
      return;
    }

    if (!files.layer1 && !files.layer2 && !files.layer3) {
      alert("모든 레이어의 이미지를 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("content", product.content);
    formData.append("categoryseq", product.categoryseq);

    if (categoryName) {
      formData.append("categoryName", categoryName);
    }

    // 재고 데이터 추가
    stock.forEach((item, index) => {
      formData.append(`stock[${index}][size]`, item.size);
      formData.append(`stock[${index}][count]`, item.count);
    });

    // 파일 추가 (layer 정보와 함께)
    for (let i = 1; i <= 3; i++) {
      const file = files[`layer${i}`];
      if (file) {
        formData.append(`files`, file);
        formData.append(`layers`, i);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/store/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      alert("상품 업로드가 완료되었습니다.");
      resetForm();
    } catch (error) {
      console.error("업로드 실패:", error.response.data);
      alert(`업로드에 실패했습니다: ${error.response.data.message}`);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setProduct({ name: "", price: "", content: "", categoryseq: "" });
    setStock([
      { size: 'SIZE_1', count: 0 },
      { size: 'SIZE_2', count: 0 },
      { size: 'SIZE_3', count: 0 },
    ]);
    setFiles({
      layer1: null,
      layer2: null,
      layer3: null,
    });
    setProgress(0);
  };

  // 사이즈 문자열 변환 함수
  const getSizeString = (sizeEnum) => {
    switch (sizeEnum) {
      case 'SIZE_1':
        return 'S';
      case 'SIZE_2':
        return 'M';
      case 'SIZE_3':
        return 'L';
      default:
        return '';
    }
  };

  return (

    <div className={styles.uploadContainer}>
          <div>
        <Banner />
      </div>
      <h1>상품 업로드</h1>
      <div className={styles.form}>
        <label>
          상품명:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          가격:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          설명:
          <textarea
            name="content"
            value={product.content}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          카테고리:
          <select
            name="categoryseq"
            value={product.categoryseq}
            onChange={handleInputChange}
          >
            <option value="">카테고리 선택</option>
            {categories && categories.map((category) => (
              <option key={category.categoryseq} value={category.categoryseq}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          카테고리 이름:
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </label>
      </div>

      {/* 재고 관리 섹션 */}
      <div className={styles.stockSection}>
        <h2>재고 관리</h2>
        {stock.map((item, index) => (
          <div key={index} className={styles.stockItem}>
            <label>
              사이즈:
              <input type="text" value={getSizeString(item.size)} disabled />
            </label>
            <label>
              수량:
              <input
                type="number"
                value={item.count}
                onChange={(e) =>
                  handleStockChange(index, 'count', e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>

      {/* 파일 업로드 */}
      <div className={styles.fileSection}>
        {[1, 2, 3].map((layer) => (
          <div key={layer} className={styles.fileItem}>
            <label>
              Layer {layer} 이미지:
              <input
                type="file"
                onChange={(e) => handleFileChange(e, `layer${layer}`)}
              />
            </label>
            {files[`layer${layer}`] && (
              <span>{files[`layer${layer}`].name}</span>
            )}
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

      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default Upload;