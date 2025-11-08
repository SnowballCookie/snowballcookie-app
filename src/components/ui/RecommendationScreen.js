import React from "react";
import Navbar from "./Navbar";

export default function RecommendationScreen() {
  return (
    <div style={styles.container}>
      <h2>🍱 음식 추천</h2>
      <p>오늘의 몸 상태에 맞춘 맞춤 음식 추천을 제공합니다.</p>

      <div style={styles.card}>
        <h4>닭개장 보울</h4>
        <p>따뜻함 + 포만감</p>
      </div>

      <div style={styles.card}>
        <h4>순두부 달걀탕 세트</h4>
        <p>소화 편안 + 저자극</p>
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  container: {
    padding: "16px",
    paddingBottom: "80px", // 하단 네비 공간
    textAlign: "center",
    color:"#444",
  },
  card: {
    background: "#969696ff",
    margin: "10px auto",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};
