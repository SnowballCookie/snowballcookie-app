import React, { useState } from "react";
import Navbar from "./Navbar";

export default function RecommendationScreen() {
  // 각 카드별 좋아요/싫어요 상태 저장
  const [reactions, setReactions] = useState({
    card1: null,
    card2: null,
    card3: null,
  });

  // 클릭 이벤트 핸들러
  const handleClick = (card, value) => {
    setReactions({ ...reactions, [card]: value });
    console.log(`${card} → ${value === "like" ? "👍 좋아요" : "👎 싫어요"}`);
  };

  return (
    <div style={styles.container}>
      <h2>🍱 음식 추천</h2>
      <p>오늘의 몸 상태에 맞춘 맞춤 음식 추천을 제공합니다.</p>

      {/* 1️⃣ 닭개장 보울 */}
      <div style={styles.card}>
        <h4>닭개장 보울</h4>
        <p>따뜻함 + 포만감</p>
        <div style={styles.btnGroup}>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card1 === "like" ? "#ffe47aff" : "white",
            }}
            onClick={() => handleClick("card1", "like")}
          >
            👍
          </button>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card1 === "dislike" ? "#ffb4b4" : "white",
            }}
            onClick={() => handleClick("card1", "dislike")}
          >
            👎
          </button>
        </div>
      </div>

      {/* 2️⃣ 순두부 달걀탕 세트 */}
      <div style={styles.card}>
        <h4>순두부 달걀탕 세트</h4>
        <p>소화 편안 + 저자극</p>
        <div style={styles.btnGroup}>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card2 === "like" ? "#ffe47aff" : "white",
            }}
            onClick={() => handleClick("card2", "like")}
          >
            👍
          </button>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card2 === "dislike" ? "#ffb4b4" : "white",
            }}
            onClick={() => handleClick("card2", "dislike")}
          >
            👎
          </button>
        </div>
      </div>

      {/* 3️⃣ 연어 아보카도 덮밥 */}
      <div style={styles.card}>
        <h4>연어 아보카도 덮밥</h4>
        <p>건강한 지방 + 기분 안정</p>
        <div style={styles.btnGroup}>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card3 === "like" ? "#ffe47aff" : "white",
            }}
            onClick={() => handleClick("card3", "like")}
          >
            👍
          </button>
          <button
            style={{
              ...styles.btn,
              background:
                reactions.card3 === "dislike" ? "#ffb4b4" : "white",
            }}
            onClick={() => handleClick("card3", "dislike")}
          >
            👎
          </button>
        </div>
      </div>

      {/* 근거 설명 */}
      <div style={styles.reasonBox}>
        <h4>[근거 설명]</h4>
        <p>"예민 + 식욕 감소일 때는 자극 낮추고 몸을 데우는 것이 좋아요."</p>
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  container: {
    padding: "16px",
    paddingBottom: "100px",
    textAlign: "center",
    color: "#444444ff",
  },
  card: {
    background: "#fffd9bff",
    margin: "12px auto",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  btn: {
    fontSize: "18px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  reasonBox: {
    marginTop: "30px",
    background: "#f6f6f6",
    borderRadius: "10px",
    padding: "16px",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
};
