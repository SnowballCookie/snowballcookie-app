import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function CravingQuickPick() {
    const nav = useNavigate();
    const [tastes, setTastes] = useState([]); const [cats, setCats] = useState([]);
    const toggle = (arr, setArr, v) => { const s = new Set(arr); s.has(v) ? s.delete(v) : s.add(v); setArr([...s]); };
    return (
        <div className="container card">
            <h2>지금 당기는 맛과 음식</h2>
            <p className="help">선택해주면 오늘의 추천이 더 정교해져요.</p>
            <p>맛</p><div className="chips">{['달달', '짭짤', '따뜻한', '시원한'].map(v =>
                <button key={v} className={'chip' + (tastes.includes(v) ? ' active' : '')} onClick={() => toggle(tastes, setTastes, v)}>{v}</button>)}</div>
            <p>음식 카테고리</p><div className="chips">{['국/탕', '샐러드', '빵/디저트', '라면', '커피/티', '과일', '도시락/간편식', '요거트', '견과/스낵'].map(v =>
                <button key={v} className={'chip' + (cats.includes(v) ? ' active' : '')} onClick={() => toggle(cats, setCats, v)}>{v}</button>)}</div>
            <button className="btn" onClick={() => nav('/recommend')}>오늘 추천 보기</button>
        </div>
    );
}
