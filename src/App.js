// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OnboardingStart from './components/ui/OnboardingStart';
import ProfileInput from './components/ui/ProfileInput';
import PeriodSetup from './components/ui/PeriodSetup';
import SymptomSensitivitySetup from './components/ui/SymptomSensitivitySetup';
import Home from './components/ui/Home';
import DailyCheck from './components/ui/DailyCheck';
import CravingQuickPick from './components/ui/CravingQuickPick';
import RecommendationScreen from './components/ui/RecommendationScreen';

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(
    !!localStorage.getItem('onboarding_v1')
  );

  useEffect(() => {
    const refresh = () => setHasOnboarded(!!localStorage.getItem('onboarding_v1'));
    // 다른 탭에서 변경되는 경우
    window.addEventListener('storage', refresh);
    // 같은 탭에서 완료 신호 받기
    window.addEventListener('onboarding:done', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('onboarding:done', refresh);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!hasOnboarded ? (
          <>
            <Route path="/" element={<OnboardingStart />} />
            <Route path="/profile" element={<ProfileInput />} />
            <Route path="/period" element={<PeriodSetup />} />
            <Route path="/sensitivity" element={<SymptomSensitivitySetup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/daily" element={<DailyCheck />} />
            <Route path="/craving" element={<CravingQuickPick />} />
            <Route path="/recommend" element={<RecommendationScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
