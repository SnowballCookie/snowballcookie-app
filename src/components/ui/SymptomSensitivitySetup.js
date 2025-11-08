import { useNavigate } from 'react-router-dom';
import { saveOnboarding } from '../../api/mock';
import { useEffect, useMemo, useState } from 'react';

// 선택 칩 리스트 정의
const SYM = [
    '붓기', '식욕↓', '식욕↑', '복통', '예민', '피로감', '두통',
    '허기 급상승', '당김(단맛)', '냉감', '설사', '변비'
];
const ALL = [
    '유당불내', '글루텐 민감', '견과류 알레르기', '갑각류 알레르기',
    '카페인 민감', '매운맛 민감', '조미료 민감', '알코올 민감'
];
const PREF = [
    '뜨거운 음식 선호', '차가운 음식 선호', '담백 선호', '단맛 선호',
    '매운맛 선호', '기름진 음식 회피', '야식 회피', '탄산 회피', '커피 회피'
];

export default function SymptomSensitivitySetup() {
    const nav = useNavigate();

    // 각 섹션별 선택 상태
    const [sym, setSym] = useState([]);
    const [all, setAll] = useState([]);
    const [pref, setPref] = useState([]);

    // 이전 화면(PeriodSetup)에서 저장한 데이터 불러오기
    const [cycles, setCycles] = useState([]);
    useEffect(() => {
        try {
            const c = JSON.parse(localStorage.getItem('cycles_v1') || '[]');
            // 시작일 기준 오름차순 정렬(보정)
            c.sort((a, b) => new Date(a.start) - new Date(b.start));
            setCycles(c);
        } catch { setCycles([]); }
    }, []);

    // ===== 예측값 계산 =====
    const predicted = useMemo(() => {
        const ms = 86400000;

        // 월경 길이들: 각 (end - start) + 1
        const mensesLens = cycles
            .filter(x => x.start && x.end)
            .map(x => {
                const d = Math.round((new Date(x.end) - new Date(x.start)) / ms) + 1;
                return Math.max(1, Math.min(10, d || 0));
            })
            .filter(Boolean);

        // 주기 길이: 연속 시작일 차이
        const starts = cycles
            .map(x => x.start)
            .filter(Boolean)
            .map(s => new Date(s))
            .sort((a, b) => a - b);

        const cycleLens = [];
        for (let i = 1; i < starts.length; i++) {
            const d = Math.round((starts[i] - starts[i - 1]) / ms);
            if (d > 10 && d < 60) cycleLens.push(d);  // 비현실값 제거
        }

        const avg = (arr, def) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : def;

        return {
            cycleLen: avg(cycleLens, 28),          // 기본 28일
            mensesLen: avg(mensesLens, 5)           // 기본 5일
        };
    }, [cycles]);

    // 사용자 확정값(수정 가능)
    const [cycleLen, setCycleLen] = useState(predicted.cycleLen);
    const [mensesLen, setMensesLen] = useState(predicted.mensesLen);

    useEffect(() => {
        // cycles 변경 시 예측값 반영
        setCycleLen(predicted.cycleLen);
        setMensesLen(predicted.mensesLen);
    }, [predicted.cycleLen, predicted.mensesLen]);

    // 칩 토글
    const toggle = (arr, setter, val) => {
        const s = new Set(arr);
        s.has(val) ? s.delete(val) : s.add(val);
        setter([...s]);
    };

    // 칩 UI
    const Chip = ({ active, label, onClick }) => (
        <button
            className={'chip' + (active ? ' active' : '')}
            onClick={onClick}
            type="button"
            style={{ userSelect: 'none', transition: 'all 0.2s' }}
        >
            {label}
        </button>
    );

    // 완료
    const done = () => {
        // 값 클램핑(안전)
        const cycle = Math.max(15, Math.min(60, Number(cycleLen) || 28));
        const menses = Math.max(1, Math.min(15, Number(mensesLen) || 5));

        // 로컬 저장(홈/캘린더가 바로 읽을 수 있게)
        localStorage.setItem('settings_v1', JSON.stringify({
            cycleLen: cycle,
            mensesLen: menses
        }));

        const payload = {
            profile: {},          // ProfileInput 연결 시 채움
            cycles,               // PeriodSetup 데이터
            prefs: { sym, all, pref },
            settings: { cycleLen: cycle, mensesLen: menses } // ✅ 함께 저장
        };

        saveOnboarding(payload);
        localStorage.setItem('onboarding_v1', '1'); // 플래그
        window.dispatchEvent(new Event('onboarding:done'));
        nav('/');
    };

    return (
        <div className="container card">
            <h2>기본 패턴 설정</h2>
            <p className="help">평소 증상과 민감도를 선택하면 추천 정확도가 올라가요.</p>

            {/* ===== 섹션 A: 증상 ===== */}
            <p><b>자주 겪는 증상</b></p>
            <div className="chips">
                {SYM.map(s => (
                    <Chip key={s} label={s} active={sym.includes(s)} onClick={() => toggle(sym, setSym, s)} />
                ))}
            </div>

            {/* ===== 섹션 B: 민감 식품/알레르기 ===== */}
            <p style={{ marginTop: 12 }}><b>민감 식품/알레르기</b></p>
            <div className="chips">
                {ALL.map(s => (
                    <Chip key={s} label={s} active={all.includes(s)} onClick={() => toggle(all, setAll, s)} />
                ))}
            </div>

            {/* ===== 섹션 C: 선호/회피 ===== */}
            <p style={{ marginTop: 12 }}><b>선호/회피 속성</b></p>
            <div className="chips">
                {PREF.map(s => (
                    <Chip key={s} label={s} active={pref.includes(s)} onClick={() => toggle(pref, setPref, s)} />
                ))}
            </div>

            {/* ===== 섹션 D: 예측 주기/월경 길이 확인(수정 가능) ===== */}
            <div
                style={{
                    marginTop: 18,
                    padding: 14,
                    border: '1px solid #eee',
                    borderRadius: 12,
                    background: '#fafafa'
                }}
            >
                <p style={{ margin: 0, marginBottom: 8 }}><b>주기/월경 길이 확인</b> <span style={{ color: '#888' }}>(최근 기록 기반 예측값)</span></p>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>예측 주기</span>
                        <input
                            type="number"
                            value={cycleLen}
                            onChange={e => setCycleLen(e.target.value)}
                            min={15}
                            max={60}
                            step={1}
                            style={field}
                        />
                        <span>일</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>예측 월경</span>
                        <input
                            type="number"
                            value={mensesLen}
                            onChange={e => setMensesLen(e.target.value)}
                            min={1}
                            max={15}
                            step={1}
                            style={field}
                        />
                        <span>일</span>
                    </label>
                </div>

                <p style={{ color: '#666', fontSize: 12, marginTop: 8 }}>
                    * 필요 시 직접 숫자를 조정해 주세요. (기본값: 주기 28일, 월경 5일)
                </p>
            </div>

            <button className="btn" style={{ marginTop: 16 }} onClick={done}>
                완료
            </button>
        </div>
    );
}

const field = {
    width: 68,
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid #ddd',
    outline: 'none'
};
