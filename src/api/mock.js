export function saveOnboarding(payload) {
    localStorage.setItem('onboarding_v1', JSON.stringify(payload));
    return { ok: true };
}
export function getPhaseSummary() {
    return { phase: '황체기', dday: 4, summary: '지금은 황체기, 몸이 붓기 쉬운 시기예요.' };
}
export async function getRecommendation() {
    await new Promise(r => setTimeout(r, 300));
    return {
        summary: '황체기 + 피로 + 수면질↓ → 속 편한 따뜻한 조합 추천',
        items: [
            { id: 'a1', title: '닭개장 보울', effect: ['따뜻함', '포만감'], effort: '간편', verdict: '🟡' },
            { id: 'a2', title: '순두부 달걀탕 세트', effect: ['저자극', '소화 편안'], effort: '바로 먹기', verdict: '🟢' },
            { id: 'a3', title: '생강꿀차 + 요거트', effect: ['따뜻함', '혈당 안정'], effort: '바로 먹기', verdict: '🟢' },
        ],
        reason: '예민 + 식욕 감소일 때는 자극 낮추고 몸을 데우는 것이 좋아요.'
    };
}
