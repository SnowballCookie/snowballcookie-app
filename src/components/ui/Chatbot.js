import React from "react";
import Navbar from "./Navbar";

export default function Chatbot() {
    return (
        <div style={styles.container}>
            <h2>💬 챗봇 케어</h2>
            <p>오늘의 상태에 맞는 간단한 대화형 케어를 제공합니다.</p>
            <div style={styles.box}>챗봇 기능은 추후 연결됩니다 🤖</div>
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
