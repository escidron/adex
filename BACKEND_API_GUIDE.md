# 캠페인 참여 관리 API 가이드

## 1. 데이터베이스 구조

### SNS 제출 테이블 (sns_submissions)
```sql
sns_submissions {
  id: number              // 제출 ID
  campaign_id: number     // 캠페인 ID
  user_id: number        // 사용자 ID
  sns_url: string        // SNS 게시물 URL
  is_checked: boolean    // 검증 완료 여부
  is_rewarded: boolean   // 리워드 지급 여부
  checked_at: timestamp  // 검증 완료 시간
  rewarded_at: timestamp // 리워드 지급 시간
  note: string          // 관리자 노트
  submitted_at: timestamp // 제출 시간
  updated_at: timestamp  // 마지막 수정 시간
}
```

## 2. API 엔드포인트

### 2.1 참여자 목록 조회
```
GET /api/campaigns/:id/participants
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "user_name": "John Doe",
      "sns_url": "https://instagram.com/p/...",
      "submitted_at": "2024-03-20T09:00:00Z",
      "is_checked": true,
      "is_rewarded": false,
      "checked_at": "2024-03-20T10:00:00Z",
      "rewarded_at": null,
      "note": "Instagram post verified"
    }
  ]
}
```

### 2.2 검증 상태 업데이트
```
PUT /api/campaigns/submissions/:submission_id/check
```

Request Body:
```json
{
  "is_checked": true,
  "note": "Instagram post verified"
}
```

Response:
```json
{
  "message": "Submission check status updated successfully",
  "data": {
    "id": 1,
    "is_checked": true,
    "checked_at": "2024-03-20T10:00:00Z"
  }
}
```

### 2.3 리워드 상태 업데이트
```
PUT /api/campaigns/submissions/:submission_id/reward
```

Request Body:
```json
{
  "is_rewarded": true,
  "note": "Reward processed"
}
```

Response:
```json
{
  "message": "Submission reward status updated successfully",
  "data": {
    "id": 1,
    "is_rewarded": true,
    "rewarded_at": "2024-03-20T11:00:00Z"
  }
}
```

## 3. 상태 관리

### 3.1 상태 흐름
1. 초기 상태: `is_checked=false, is_rewarded=false`
2. 검증 완료: `is_checked=true`
3. 리워드 지급: `is_rewarded=true`

### 3.2 상태 제약사항
- 리워드는 검증이 완료된 제출물에만 지급 가능 (`is_checked=true`)
- 각 상태 변경은 관리자 권한이 필요
- 상태 변경 시 자동으로 타임스탬프 업데이트 (`checked_at`, `rewarded_at`)

## 4. 노트 필드 사용
- 최대 길이: 255자
- 선택적 필드 (필수 아님)
- 각 상태 변경 시마다 새로운 노트 입력 가능
- 이전 노트는 덮어쓰기됨

## 5. 에러 처리

### 5.1 공통 에러 응답 형식
```json
{
  "error": "에러 메시지"
}
```

### 5.2 주요 에러 케이스
- 404: Submission not found
- 401: Authentication required
- 403: Permission denied (관리자 권한 필요)
- 500: Internal server error

## 6. 추가 정보
- 참여자 목록은 제출 시간 역순으로 정렬됨
- 페이지네이션 미지원 (전체 목록 반환)
- 상태 변경 시 실시간 알림 기능 없음
- 데이터는 실시간으로 갱신됨 (캐시 없음) 