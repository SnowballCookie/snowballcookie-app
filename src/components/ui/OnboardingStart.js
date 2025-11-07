import { useNavigate } from 'react-router-dom';
export default function OnboardingStart() {
    const nav = useNavigate();
    return (
        <div className="container card">
            <h1>맞춤형 케어를 시작해요</h1>
            <p>매일의 상태를 이해하면 몸과 마음이 더 편해져요.</p>
            <button className="btn" onClick={() => nav('/profile')}>시작하기</button>
        </div>
    );
}
