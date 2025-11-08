// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    const refresh = () =>
      setHasOnboarded(!!localStorage.getItem('onboarding_v1'));
    window.addEventListener('storage', refresh);
    window.addEventListener('onboarding:done', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('onboarding:done', refresh);
    };
  }, []);

  return (
    <Routes>
      {!hasOnboarded ? (
        <>
          {/* 온보딩 첫 화면은 SymptomSensitivitySetup */}
          <Route path="/" element={<SymptomSensitivitySetup />} />
          <Route path="/sensitivity" element={<SymptomSensitivitySetup />} />
          {/* 세부 온보딩 단계용 (선택적으로 유지) */}
          <Route path="/profile" element={<ProfileInput />} />
          <Route path="/period" element={<PeriodSetup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/dailycheck" element={<DailyCheck />} />
          <Route path="/craving" element={<CravingQuickPick />} />
          <Route path="/recommend" element={<RecommendationScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}
