import { useNavigate } from 'react-router-dom';
import { saveOnboarding } from '../../api/mock';
import { useEffect, useState } from 'react';

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
        const c = JSON.parse(localStorage.getItem('cycles_v1') || '[]');
        setCycles(c);
    }, []);

    // 칩 클릭 토글 함수
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
            style={{
                userSelect: 'none',
                transition: 'all 0.2s',
            }}
        >
            {label}
        </button>
    );

    // 완료 버튼 눌렀을 때
    const done = () => {
        const payload = {
            profile: {},          // ProfileInput 연결 시 채워질 자리
            cycles,               // PeriodSetup에서 가져온 값
            prefs: { sym, all, pref }
        };

        // 로컬 저장
        saveOnboarding(payload);
        localStorage.setItem('onboarding_v1', '1'); // 플래그 생성

        // ✅ App.js에 상태 업데이트 이벤트 보내기
        window.dispatchEvent(new Event('onboarding:done'));

        // 홈으로 이동
        nav('/');
    };

    return (
        <div className="container card">
            <h2>기본 패턴 설정</h2>
            <p className="help">
                평소 증상과 민감도를 선택하면 맞춤 추천 정확도가 올라가요.
            </p>

            {/* 증상 */}
            <p><b>자주 겪는 증상</b></p>
            <div className="chips">
                {SYM.map(s => (
                    <Chip
                        key={s}
                        label={s}
                        active={sym.includes(s)}
                        onClick={() => toggle(sym, setSym, s)}
                    />
                ))}
            </div>

            {/* 알레르기 */}
            <p style={{ marginTop: 12 }}><b>민감 식품/알레르기</b></p>
            <div className="chips">
                {ALL.map(s => (
                    <Chip
                        key={s}
                        label={s}
                        active={all.includes(s)}
                        onClick={() => toggle(all, setAll, s)}
                    />
                ))}
            </div>

            {/* 선호/회피 */}
            <p style={{ marginTop: 12 }}><b>선호/회피 속성</b></p>
            <div className="chips">
                {PREF.map(s => (
                    <Chip
                        key={s}
                        label={s}
                        active={pref.includes(s)}
                        onClick={() => toggle(pref, setPref, s)}
                    />
                ))}
            </div>

            <button
                className="btn"
                style={{ marginTop: 16 }}
                onClick={done}
            >
                완료
            </button>
        </div>
    );
}
