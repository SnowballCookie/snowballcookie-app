import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // 현재 경로 active 처리: 홈은 "/" 와 매칭
    const isActive = (path) => pathname === path ? "active" : "";

    return (
        <nav className="navbar">
            <button
                className={isActive("/")}
                onClick={() => navigate("/")}
            >
                🏠
                <span>Home</span>
            </button>

            <button
                className={isActive("/dailycheck")}
                onClick={() => navigate("/dailycheck")}
            >
                📝
                <span>Check</span>
            </button>

            <button
                className={isActive("/recommend")}
                onClick={() => navigate("/recommend")}
            >
                🍱
                <span>추천</span>
            </button>

            <button
                className={isActive("/craving")}
                onClick={() => navigate("/craving")}
            >
                ⭐
                <span>Chat</span>
            </button>
        </nav>
    );
}

export default Navbar;
