import { useEffect, useState } from 'react';
import { getRecommendation } from '../../api/mock';
export default function RecommendationScreen() {
    const [data, setData] = useState(null);
    useEffect(() => { (async () => setData(await getRecommendation({})))(); }, []);
    if (!data) return <div className="container card">로딩...</div>;
    return (
        <div className="container">
            <div className="card"><b>{data.summary}</b></div>
            {data.items.map(it => (
                <div key={it.id} className="card" style={{ marginTop: 8 }}>
                    <div>{it.verdict} <b>{it.title}</b></div>
                    <div className="help">효과: {it.effect.join(' / ')} · 난이도: {it.effort}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button className="btn">👍</button>
                        <button className="btn" style={{ background: 'transparent', color: 'var(--fg)' }}>👎</button>
                    </div>
                </div>
            ))}
            <div className="card" style={{ marginTop: 8 }}>[근거] {data.reason}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn">다른 추천 보기</button>
                <button className="btn" style={{ background: 'transparent', color: 'var(--fg)' }}>다시 끌리는 음식 선택</button>
            </div>
        </div>
    );
}
