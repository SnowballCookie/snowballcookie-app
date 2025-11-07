import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function ProfileInput() {
    const nav = useNavigate();
    const [f, setF] = useState({ age: '', height_cm: '', weight_kg: '' });
    const set = (k, v) => setF({ ...f, [k]: v });
    return (
        <div className="container card">
            <h2>기본 정보를 알려주세요</h2>
            <p className="help">추천 식단·영양 가이드가 더 정확해져요.</p>
            <label>나이<input className="input" type="number" value={f.age} onChange={e => set('age', e.target.value)} /></label>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <label style={{ flex: 1 }}>키(cm)<input className="input" type="number" value={f.height_cm} onChange={e => set('height_cm', e.target.value)} /></label>
                <label style={{ flex: 1 }}>몸무게(kg)<input className="input" type="number" value={f.weight_kg} onChange={e => set('weight_kg', e.target.value)} /></label>
            </div>
            <button className="btn" style={{ marginTop: 12 }} onClick={() => nav('/period')}>다음</button>
        </div>
    );
}
