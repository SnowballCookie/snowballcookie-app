import React from "react";
import Navbar from "./Navbar";

export default function Record() {
    return (
        <div style={styles.container}>
            <h2>📊 기록 보기</h2>
            <p>최근 입력한 몸 상태와 추천 기록을 한눈에 확인할 수 있습니다.</p>
            <div style={styles.box}>기록 통계 및 그래프는 추후 추가됩니다 📈</div>
            <Navbar />
        </div>
    );
}

const styles = {
    container: {
        padding: "16px",
        paddingBottom: "80px",
        textAlign: "center",
    },
    box: {
        marginTop: "20px",
        background: "#f9f9f9",
        padding: "30px",
        borderRadius: "12px",
        color: "#666",
    },
};
