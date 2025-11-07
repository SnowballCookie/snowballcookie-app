import { useNavigate } from 'react-router-dom';
import { getPhaseSummary } from '../../api/mock';
export default function Home() {
    const nav = useNavigate();
    const phase = getPhaseSummary();
    const streak = Number(localStorage.getItem('streak') || '0');
    return (
        <div className="container">
            <div className="card"><b>{phase.summary}</b> (D-{phase.dday})</div>
            <div className="card">[생리주기 캘린더 · 단계 색상 · D-Day]</div>
            <button className="btn" onClick={() => nav('/daily')}>오늘 체크하기</button>
            <div className="card" style={{ marginTop: 8 }}>
                오늘까지 <b>{streak}</b>일 연속 몸 상태 체크 중 ✨ 이번 주 목표: 5일 채우기
            </div>
        </div>
    );
}
