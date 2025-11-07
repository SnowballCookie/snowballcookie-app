import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PeriodSetup() {
    const nav = useNavigate();

    // 시작/종료일을 "제어 컴포넌트"로 묶어줌
    const [cycles, setCycles] = useState([
        { start: '', end: '' },
        { start: '', end: '' },
        { start: '', end: '' },
    ]);

    const upd = (i, key, val) => {
        const next = cycles.map((c, idx) => idx === i ? { ...c, [key]: val } : c);
        setCycles(next);
    };

    const validate = () => {
        // 입력된 회차만 검사: start < end
        for (const c of cycles) {
            if (!c.start && !c.end) continue;
            if (!c.start || !c.end) return false;
            if (new Date(c.start) >= new Date(c.end)) return false;
        }
        return true;
    };

    const onNext = () => {
        if (!validate()) {
            alert('시작일은 종료일보다 앞서야 해요. (입력한 회차만 검사)');
            return;
        }
        localStorage.setItem('cycles_v1', JSON.stringify(cycles));
        nav('/sensitivity');
    };

    return (
        <div className="container card">
            <h2>최근 생리 주기를 알려주세요</h2>
            <p className="help">시작일 &lt; 종료일 · 3회차는 선택</p>

            {[0, 1, 2].map((i) => (
                <div key={i} className="card" style={{ margin: '8px 0' }}>
                    <div><b>{i + 1}회차 생리</b></div>

                    <label style={{ display: 'block', marginTop: 8 }}>
                        시작일
                        <input
                            className="input"
                            type="date"
                            value={cycles[i].start}
                            onChange={e => upd(i, 'start', e.target.value)}
                        />
                    </label>

                    <label style={{ display: 'block', marginTop: 8 }}>
                        종료일
                        <input
                            className="input"
                            type="date"
                            value={cycles[i].end}
                            onChange={e => upd(i, 'end', e.target.value)}
                        />
                    </label>
                </div>
            ))}

            <button className="btn" onClick={onNext}>다음</button>
        </div>
    );
}
