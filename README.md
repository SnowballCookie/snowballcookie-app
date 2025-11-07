# snowballcookie-app
Personalized cycle-based wellness & meal recommendation web app.  
Daily check-in → smart suggestions → gentle self-care routine.

## 🧩 Team Workflow Rules

### 1) 브랜치 규칙
- `main` 브랜치는 **직접 push 금지**
- 모든 변경은 **Pull Request(PR)** 를 통해 진행
- 작업은 아래 형식의 브랜치에서 진행:
feature/<이름-작업>
예) feature/yujin-daily-check


### 2) 커밋 메시지 규칙
| Prefix | 사용 상황 | 예시 |
|-------|-----------|------|
| `feat:` | 새로운 기능 추가 | `feat: DailyCheck 화면 추가` |
| `fix:` | 버그 수정 | `fix: 추천 버튼 오류 수정` |
| `style:` | UI/디자인 변경 (기능 변경 없음) | `style: 버튼 색 수정` |
| `refactor:` | 코드 구조 개선 (기능 변화 없음) | `refactor: 추천 로직 함수 분리` |
| `docs:` | 문서/README 수정 | `docs: 팀 규칙 업데이트` |
| `chore:` | 환경 설정 / 패키지 설치 / 폴더 이동 등 기타 작업 | `chore: 프로젝트 기본 세팅` |

### 3) 작업 플로우


git checkout -b feature/<이름-작업>
(작업)
git add .
git commit -m "feat: 작업 내용"
git push
GitHub → Open Pull Request → 리뷰 → merge