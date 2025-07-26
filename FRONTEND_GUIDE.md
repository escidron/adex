# 캠페인 관리 프론트엔드 개발 가이드

## 1. API 엔드포인트

### 기본 정보
- Base URL: `http://localhost:8000/api`
- 인증: JWT (쿠키 기반)
- Content-Type: `application/json`

### 엔드포인트 목록

#### 1) 캠페인 목록 조회
```
GET /campaigns
```
- 인증 불필요
- Response 예시:
```json
{
  "data": [
    {
      "id": 1,
      "name": "인스타그램 홍보 캠페인",
      "description": "신제품 출시 기념 홍보",
      "start_date": "2024-03-15",
      "end_date": "2024-04-15",
      "max_participants": 100,
      "budget": 1000000,
      "reward_amount": 10000,
      "participant_count": 0,
      "created_at": "2024-03-14T12:00:00Z"
    }
  ]
}
```

#### 2) 캠페인 생성
```
POST /campaigns
```
- 인증 필요
- Request Body:
```json
{
  "name": "캠페인명",
  "description": "캠페인 설명",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "max_participants": 100,
  "budget": 1000000,
  "reward_amount": 10000
}
```
- Response:
```json
{
  "message": "캠페인이 성공적으로 생성되었습니다.",
  "data": {
    "id": 1
  }
}
```

#### 3) 캠페인 상세 조회
```
GET /campaigns/:id
```
- 인증 불필요
- Response:
```json
{
  "data": {
    "id": 1,
    "name": "캠페인명",
    "description": "캠페인 설명",
    "start_date": "2024-03-15",
    "end_date": "2024-04-15",
    "max_participants": 100,
    "budget": 1000000,
    "reward_amount": 10000,
    "participant_count": 0,
    "created_at": "2024-03-14T12:00:00Z"
  }
}
```

#### 4) 캠페인 참여 신청
```
POST /campaigns/participate
```
- 인증 필요
- Request Body:
```json
{
  "campaign_id": 1,
  "sns_url": "https://instagram.com/p/post_id"
}
```
- Response:
```json
{
  "message": "캠페인 참여 신청이 완료되었습니다."
}
```

#### 5) 내 참여 캠페인 목록
```
GET /campaigns/my/participations
```
- 인증 필요
- Response:
```json
{
  "data": [
    {
      "campaign_id": 1,
      "campaign_name": "캠페인명",
      "sns_url": "https://instagram.com/p/post_id",
      "submitted_at": "2024-03-14T12:00:00Z",
      "is_checked": false,
      "is_rewarded": false
    }
  ]
}
```

## 2. 인증 처리

### 로그인
```
POST /api/users/auth
```
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
- Response: JWT 토큰이 쿠키에 자동 저장됨

### 인증 헤더
- 로그인 후 JWT 토큰이 쿠키에 자동으로 저장됨
- 인증이 필요한 API 호출 시 쿠키가 자동으로 포함됨

## 3. 화면 구성 제안

### 1) 캠페인 목록 페이지
- 캠페인 카드 형식 목록 표시
- 각 카드에 표시할 정보:
  - 캠페인명
  - 기간
  - 참여자 수 / 최대 참여자 수
  - 리워드 금액
- 필터링 옵션:
  - 진행중/예정/종료된 캠페인
  - 참여 가능 여부

### 2) 캠페인 상세 페이지
- 캠페인 상세 정보 표시
- 참여 신청 폼 (로그인 시에만 표시)
- 참여자 목록 (옵션)

### 3) 캠페인 생성 페이지
- 관리자용 페이지
- 캠페인 정보 입력 폼
- 미리보기 기능 (옵션)

### 4) 마이페이지 - 참여 캠페인
- 내가 참여한 캠페인 목록
- 각 캠페인별 상태 표시:
  - 승인 대기
  - 승인됨
  - 리워드 지급됨

## 4. 상태 관리 제안

### 캠페인 상태
```typescript
interface Campaign {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  budget: number;
  reward_amount: number;
  participant_count: number;
  created_at: string;
}

interface CampaignParticipation {
  campaign_id: number;
  campaign_name: string;
  sns_url: string;
  submitted_at: string;
  is_checked: boolean;
  is_rewarded: boolean;
}
```

### 에러 처리
- 400: 잘못된 요청 (입력값 오류)
- 401: 인증 필요
- 403: 권한 없음
- 404: 리소스 없음
- 500: 서버 오류

## 5. 개발 환경

### API 테스트
- Postman 컬렉션 제공됨 (`ADEX_API.postman_collection.json`)
- Base URL: `http://localhost:8000/api`

### 인증 테스트용 계정
- Email: `your_email@example.com`
- Password: `your_password` 