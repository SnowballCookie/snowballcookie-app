import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

export default function CravingQuickPick() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "bot", text: "안녕하세요! 오늘 어떤 상태인지 간단히 말해주시면 맞춤 조합을 제안해드릴게요 😊" },
        { role: "bot", text: "예) 피곤해요 / 배가 더부룩해요 / 따뜻한 게 끌려요 / 달달한 게 먹고 싶어요" },
    ]);
    const listRef = useRef(null);

    // 스크롤 하단 고정
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    // 아주 간단한 규칙 기반 봇 응답
    const reply = (userText) => {
        const t = userText.toLowerCase();
        const recs = [];

        if (t.includes("피곤") || t.includes("피로")) {
            recs.push("생강꿀차 + 저당 요거트 + 바나나");
        }
        if (t.includes("따뜻")) {
            recs.push("순두부 달걀탕 + 계란찜 + 김");
        }
        if (t.includes("달달") || t.includes("단")) {
            recs.push("약콩 요거트 + 딸기 / 다크초코 한 조각");
        }
        if (t.includes("더부룩") || t.includes("소화")) {
            recs.push("부드러운 현미죽 + 닭가슴살 보울 (저자극)");
        }

        if (recs.length === 0) {
            return "조금 더 알려줄래요? 예) '피곤하고 따뜻한 게 끌려요' 처럼요.";
        }
        return `오늘은 이런 조합을 추천해요:\n• ${recs.join("\n• ")}`;
    };

    const send = () => {
        const text = input.trim();
        if (!text) return;
        setMessages((m) => [...m, { role: "user", text }]);
        setInput("");

        setTimeout(() => {
            const botText = reply(text);
            setMessages((m) => [...m, { role: "bot", text: botText }]);
        }, 250);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <div style={s.wrap}>
            {/* 상단 헤더(선택) */}
            <div style={s.header}>
                <h3 style={s.headerTitle}>💬 챗봇 케어</h3>
                <p style={s.headerSub}>지금 느낌을 한 줄로 말해주면 더 정확히 도와줄게요.</p>
            </div>

            {/* 메시지 영역 */}
            <div ref={listRef} style={s.messages}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            ...s.bubble,
                            ...(m.role === "user" ? s.user : s.bot),
                        }}
                    >
                        {m.text.split("\n").map((line, idx) => (
                            <p key={idx} style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
                <div style={{ height: 8 }} />
            </div>

            {/* 입력창: 네비게이션 바로 위에 고정 */}
            <div style={s.inputBar}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="예) 피곤하고 따뜻한 게 끌려요"
                    style={s.input}
                    rows={1}
                />
                <button onClick={send} style={s.send}>보내기</button>
            </div>

            {/* 하단 네비게이션 */}
            <Navbar />
        </div>
    );
}

const NAV_HEIGHT = 56; // Navbar 높이 추정
const INPUT_HEIGHT = 54;

const s = {
    wrap: {
        position: "relative",
        height: "100vh",
        background: "#fff",
        color: "#2f2f2f",
        display: "flex",
        flexDirection: "column",
        // 입력바와 네비 영역만큼 아래 패딩
        paddingBottom: NAV_HEIGHT + INPUT_HEIGHT + 12,
        boxSizing: "border-box",
    },
    header: {
        padding: "14px 16px 8px",
        borderBottom: "1px solid #eee",
    },
    headerTitle: { margin: 0, color: "#333" },
    headerSub: { margin: "6px 0 0", color: "#666", fontSize: 13 },
    messages: {
        flex: 1,
        overflowY: "auto",
        padding: "12px 12px 8px",
    },
    bubble: {
        maxWidth: "78%",
        padding: "10px 12px",
        borderRadius: 12,
        margin: "6px 0",
        lineHeight: 1.45,
        fontSize: 15,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    bot: {
        background: "#f1f3f5",
        color: "#333",
        marginRight: "auto",
        borderTopLeftRadius: 4,
    },
    user: {
        background: "#e66ca8",
        color: "#fff",
        marginLeft: "auto",
        borderTopRightRadius: 4,
    },
    inputBar: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: NAV_HEIGHT, // 네비 위에 붙이기
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: "8px 10px",
        background: "#fff",
        borderTop: "1px solid #eee",
        zIndex: 101,
    },
    input: {
        flex: 1,
        resize: "none",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #e3e3e3",
        outline: "none",
        fontSize: 14,
    },
    send: {
        background: "#e66ca8",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 14,
        cursor: "pointer",
    },
};
