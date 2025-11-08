import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';

export default function DailyCheck() {
    const nav = useNavigate();

    // 기본 상태 + '지금 당기는 맛/카테고리' 추가
    const [today, setToday] = useState({
        appetite: '보통',
        symptoms: [],
        sleep: '보통',
        stress: '보통',
        tastes: [],          // ← 추가
        categories: []       // ← 추가
    });

    // 증상 토글
    const toggleSymptom = (v) => {
        const s = new Set(today.symptoms);
        s.has(v) ? s.delete(v) : s.add(v);
        setToday({ ...today, symptoms: [...s] });
    };

    // 취향/카테고리 토글 (공용)
    const toggleList = (key, v) => {
        const s = new Set(today[key]);
        s.has(v) ? s.delete(v) : s.add(v);
        setToday({ ...today, [key]: [...s] });
    };

    const submit = () => {
        const streak = Number(localStorage.getItem('streak') || '0') + 1;
        localStorage.setItem('streak', String(streak));
        localStorage.setItem('today', JSON.stringify(today)); // tastes/categories 포함 저장
        nav('/recommend');
    };

    return (
        <div className="container card" style={{ paddingBottom: 80 }}>
            <h2>오늘 몸 상태</h2>

            {/* 식욕 */}
            <p>식욕</p>
            <div className="chips">
                {['감소', '보통', '증가'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.appetite === v ? ' active' : '')}
                        onClick={() => setToday({ ...today, appetite: v })}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* 증상 */}
            <p>증상</p>
            <div className="chips">
                {['붓기', '메스꺼움', '피로', '복통', '예민', '수면질↓'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.symptoms.includes(v) ? ' active' : '')}
                        onClick={() => toggleSymptom(v)}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* 수면 */}
            <p>수면</p>
            <div className="chips">
                {['낮음', '보통', '좋음'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.sleep === v ? ' active' : '')}
                        onClick={() => setToday({ ...today, sleep: v })}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* 스트레스 */}
            <p>스트레스</p>
            <div className="chips">
                {['낮음', '보통', '높음'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.stress === v ? ' active' : '')}
                        onClick={() => setToday({ ...today, stress: v })}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* ===== 여기부터 CravingQuickPick 내용 합침 ===== */}

            <h2 style={{ marginTop: 24 }}>지금 당기는 맛과 음식</h2>
            <p className="help">선택해주면 오늘의 추천이 더 정교해져요.</p>

            {/* 맛 */}
            <p>맛</p>
            <div className="chips">
                {['달달', '짭짤', '따뜻한', '시원한'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.tastes.includes(v) ? ' active' : '')}
                        onClick={() => toggleList('tastes', v)}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* 음식 카테고리 */}
            <p>음식 카테고리</p>
            <div className="chips">
                {['국/탕', '샐러드', '빵/디저트', '라면', '커피/티', '과일', '도시락/간편식', '요거트', '견과/스낵'].map(v => (
                    <button
                        key={v}
                        className={'chip' + (today.categories.includes(v) ? ' active' : '')}
                        onClick={() => toggleList('categories', v)}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* 제출 */}
            <button className="btn" onClick={submit}>오늘 추천 보기</button>

            <Navbar />
        </div>
    );
}
