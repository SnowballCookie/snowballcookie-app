// src/components/ui/Home.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../../styles/globals.css";

export default function Home() {
    const navigate = useNavigate();

    // === 고정 단계 팔레트 (보여주기용) ===
    const PHASE = {
        MENSES: { name: "월경기", color: "#e57373" },
        FOLLICULAR: { name: "난포기", color: "#fbc02d" },
        OVULATION: { name: "배란기", color: "#64b5f6" },
        LUTEAL: { name: "황체기", color: "#81c784" },
    };

    // 오늘 요약 문구(데모 텍스트)
    const [phase] = useState("황체기");
    const [summary] = useState("몸이 붓기 쉬운 시기예요");

    // 달력 월 이동 상태
    const [current, setCurrent] = useState(() => {
        const d = new Date();
        return { y: d.getFullYear(), m: d.getMonth() }; // m: 0~11
    });

    // 이번 달 그리드
    const monthMatrix = useMemo(
        () => buildMonthMatrix(current.y, current.m),
        [current]
    );

    // 날짜 번호만으로 단계 결정(보여주기용 고정 규칙)
    // 1~5 MENSES, 6~13 FOLLICULAR, 14~15 OVULATION, 16~말일 LUTEAL
    const getPhaseByDayNum = (date) => {
        const day = date.getDate();
        // monthLength 필요 없지만, 말일까지 LUTEAL 표시를 위해 남겨둠
        if (day <= 5) return PHASE.MENSES;
        if (day <= 13) return PHASE.FOLLICULAR;
        if (day <= 15) return PHASE.OVULATION;
        return PHASE.LUTEAL;
    };

    return (
        <div style={styles.container}>
            {/* 상단 요약 */}
            <div style={styles.header}>
                <p style={styles.phaseText}>
                    지금은 <strong>{phase}</strong>, {summary}
                </p>
            </div>

            {/* 달력 */}
            <div style={styles.calendarBox}>
                <div style={styles.calHeader}>
                    <button
                        style={styles.navBtn}
                        onClick={() =>
                            setCurrent((prev) =>
                                prev.m === 0
                                    ? { y: prev.y - 1, m: 11 }
                                    : { y: prev.y, m: prev.m - 1 }
                            )
                        }
                    >
                        ‹
                    </button>
                    <div style={styles.calTitle}>
                        {current.y}년 {current.m + 1}월
                    </div>
                    <button
                        style={styles.navBtn}
                        onClick={() =>
                            setCurrent((prev) =>
                                prev.m === 11
                                    ? { y: prev.y + 1, m: 0 }
                                    : { y: prev.y, m: prev.m + 1 }
                            )
                        }
                    >
                        ›
                    </button>
                </div>

                <div style={styles.weekHeader}>
                    {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
                        <div key={w} style={styles.weekCell}>
                            {w}
                        </div>
                    ))}
                </div>

                <div style={styles.grid}>
                    {monthMatrix.map((week, wi) => (
                        <div key={wi} style={styles.weekRow}>
                            {week.map((cell, di) => {
                                const { date, inMonth } = cell;
                                const phaseInfo = inMonth ? getPhaseByDayNum(date) : null;

                                const bg = inMonth
                                    ? hexWithAlpha(phaseInfo.color, 0.16)
                                    : "transparent";
                                const border = inMonth
                                    ? `1px solid ${hexWithAlpha(phaseInfo.color, 0.45)}`
                                    : "1px dashed #eee";
                                const color = inMonth ? "#2f2f2f" : "#bbb";

                                return (
                                    <div
                                        key={di}
                                        style={{
                                            ...styles.dayCell,
                                            background: bg,
                                            border,
                                            color,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span style={{ fontWeight: 500 }}>{date.getDate()}</span>
                                        </div>
                                        <div style={{ fontSize: 10, marginTop: 6, color: "#555" }}>
                                            {inMonth ? phaseInfo.name : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* 레전드 */}
                <div style={styles.phaseLegend}>
                    <span style={{ color: PHASE.MENSES.color }}>● 월경기</span>
                    <span style={{ color: PHASE.FOLLICULAR.color }}>● 난포기</span>
                    <span style={{ color: PHASE.OVULATION.color }}>● 배란기</span>
                    <span style={{ color: PHASE.LUTEAL.color }}>● 황체기</span>
                </div>
            </div>

            {/* D-Day(데모용 문구) */}
            <div style={styles.ddayBox}>
                <p style={{ color: "#444" }}>
                    다음 생리 예정일까지 <strong>D-4</strong>
                </p>
            </div>

            {/* 오늘 체크 CTA (데모) */}
            <button style={styles.checkButton} onClick={() => navigate("/dailycheck")}>
                오늘 체크하기
            </button>

            <Navbar />
        </div>
    );
}

/* ===== 유틸 ===== */
function hexWithAlpha(hex, alpha = 0.2) {
    const m = hex?.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return hex;
    const r = parseInt(m[1], 16);
    const g = parseInt(m[2], 16);
    const b = parseInt(m[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function buildMonthMatrix(year, monthIndex) {
    const first = new Date(year, monthIndex, 1);
    const startDow = first.getDay(); // 0:일 ~ 6:토
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const prevMonthDays = startDow;
    const totalCells = Math.ceil((prevMonthDays + daysInMonth) / 7) * 7;

    const cells = [];
    for (let i = 0; i < totalCells; i++) {
        const dayNum = i - prevMonthDays + 1; // 1..daysInMonth면 inMonth
        let date,
            inMonth = false;
        if (dayNum < 1) {
            const d = new Date(year, monthIndex, 0);
            date = new Date(year, monthIndex - 1, d.getDate() + dayNum);
        } else if (dayNum > daysInMonth) {
            date = new Date(year, monthIndex + 1, dayNum - daysInMonth);
        } else {
            date = new Date(year, monthIndex, dayNum);
            inMonth = true;
        }
        cells.push({ date, inMonth });
    }

    const matrix = [];
    for (let i = 0; i < cells.length; i += 7) {
        matrix.push(cells.slice(i, i + 7));
    }
    return matrix;
}

/* ===== 스타일 ===== */
const styles = {
    container: {
        padding: "16px",
        paddingBottom: "80px",
        minHeight: "100vh",
        backgroundColor: "#fff",
        boxSizing: "border-box",
    },
    header: {
        textAlign: "center",
        marginTop: "16px",
    },
    phaseText: {
        fontSize: "18px",
        fontWeight: "500",
        color: "#444",
    },
    calendarBox: {
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        padding: "16px",
        marginTop: "16px",
        border: "1px solid #eee",
    },
    calHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    calTitle: { fontWeight: 600, color: "#333" },
    navBtn: {
        border: "1px solid #e6e6e6",
        background: "#fff",
        borderRadius: 8,
        padding: "6px 10px",
        cursor: "pointer",
    },
    weekHeader: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 6,
        margin: "8px 0 6px",
        fontSize: 12,
        color: "#666",
    },
    weekCell: {
        textAlign: "center",
    },
    grid: {
        display: "grid",
        gridTemplateRows: "repeat(6, 1fr)",
        gap: 6,
    },
    weekRow: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 6,
    },
    dayCell: {
        minHeight: 56,
        padding: "8px 10px",
        borderRadius: 10,
        boxSizing: "border-box",
    },
    phaseLegend: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-around",
        fontSize: "12px",
    },
    ddayBox: {
        textAlign: "center",
        marginTop: "16px",
    },
    checkButton: {
        display: "block",
        margin: "24px auto",
        padding: "12px 20px",
        backgroundColor: "#e66ca8",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
    },
};
