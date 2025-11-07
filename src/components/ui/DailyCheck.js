import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function DailyCheck() {
    const nav = useNavigate();
    const [today, setToday] = useState({ appetite: '보통', symptoms: [], sleep: '보통', stress: '보통' });
    const toggle = v => { const s = new Set(today.symptoms); s.has(v) ? s.delete(v) : s.add(v); setToday({ ...today, symptoms: [...s] }); };
    const submit = () => {
        const streak = Number(localStorage.getItem('streak') || '0') + 1;
        localStorage.setItem('streak', String(streak));
        localStorage.setItem('today', JSON.stringify(today));
        nav('/craving');
    };
    return (
        <div className="container card">
            <h2>오늘 몸 상태 (10초)</h2>
            <p>식욕</p><div className="chips">{['감소', '보통', '증가'].map(v =>
                <button key={v} className={'chip' + (today.appetite === v ? ' active' : '')} onClick={() => setToday({ ...today, appetite: v })}>{v}</button>)}</div>
            <p>증상</p><div className="chips">{['붓기', '메스꺼움', '피로', '복통', '예민', '수면질↓'].map(v =>
                <button key={v} className={'chip' + (today.symptoms.includes(v) ? ' active' : '')} onClick={() => toggle(v)}>{v}</button>)}</div>
            <p>수면</p><div className="chips">{['낮음', '보통', '좋음'].map(v =>
                <button key={v} className={'chip' + (today.sleep === v ? ' active' : '')} onClick={() => setToday({ ...today, sleep: v })}>{v}</button>)}</div>
            <p>스트레스</p><div className="chips">{['낮음', '보통', '높음'].map(v =>
                <button key={v} className={'chip' + (today.stress === v ? ' active' : '')} onClick={() => setToday({ ...today, stress: v })}>{v}</button>)}</div>
            <button className="btn" onClick={submit}>다음</button>
        </div>
    );
}
