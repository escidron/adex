# Invoice PDF Storage & Company Profile Integration

## 📋 Overview
캠페인 생성 시 인보이스 PDF를 자동으로 회사 프로필에 저장하고, 회사 프로필에서 인보이스를 확인할 수 있는 기능을 구현했습니다.

## 🚀 New Features

### 1. **자동 인보이스 PDF 저장**
- 캠페인 생성 후 이메일 발송 시 PDF를 회사 프로필에 자동 저장
- 이메일 발송과 PDF 저장이 동시에 진행되어 효율성 극대화

### 2. **회사 프로필 - My Invoices 메뉴 추가**
- 회사 프로필에 "My Invoices" 새 메뉴 추가
- 생성된 모든 인보이스를 한눈에 확인 가능
- 인보이스별 PDF 다운로드 기능

### 3. **일관된 PDF 품질 보장**
- 공통 PDF 생성 함수 (`generateInvoicePDF`) 도입
- 모든 PDF 생성 과정에서 동일한 설정 사용
- 고해상도 (scale: 2) PNG 포맷으로 품질 개선

### 4. **향상된 사용자 경험**
- 이메일 상태 메시지 최적화 (진행 과정 숨김, 결과만 표시)
- 안정적인 PDF 생성을 위한 렌더링 대기 시간 증가 (2.5초)
- 이미지 로딩 완료 확인 및 타임아웃 처리

## 📁 Modified Files

### **`app/campaign/[id]/invoice/page.jsx`** ⭐ 주요 변경
```javascript
// 새로 추가된 기능들
+ generateInvoicePDF() // 공통 PDF 생성 함수
+ savePDFToCompany()   // 회사 프로필 PDF 저장
+ 향상된 에러 처리 및 상태 관리
+ 이메일 API 데이터 구조 개선 (total_budget 숫자 전송)
+ 상태 메시지 최적화 (성공 메시지만 표시)
```

### **`app/my-company/page.jsx`**
```javascript
// My Invoices 기능 추가
+ fetchInvoices()     // 인보이스 목록 조회
+ 인보이스 목록 UI 컴포넌트
+ PDF 다운로드 버튼
+ 빈 상태 UI (인보이스 없을 때)
```

### **`utils/companyAccountOptions.js`**
```javascript
// 새 메뉴 옵션 추가
+ {
+   id: 4,
+   icon: <FileText color='#FCD33B' size={30}/>,
+   label: 'My Invoices'
+ }
```

### **`app/campaign/create/page.jsx`**
- 캠페인 생성 플로우 개선 (상세 변경사항 미확인)

## 🔧 Technical Improvements

### **PDF 생성 최적화**
- **Scale 향상**: 1 → 2 (고해상도)
- **Format 개선**: JPEG → PNG (더 선명한 화질)
- **안정성 강화**: 이미지 로딩 대기 + 렌더링 대기 시간 증가
- **에러 핸들링**: 이미지 로딩 실패 시 타임아웃 처리

### **API 통신 개선**
- 이메일 API 필드 매핑 정확성 향상
- PDF 저장 API 호출 안정성 개선
- 에러 상황에서도 사용자 경험 유지

### **UI/UX 개선**
- 진행 상태 메시지 최적화 (사용자 혼란 최소화)
- 인보이스 목록 반응형 디자인
- 일관된 버튼 스타일링

## 🔮 Backend Requirements

구현 완료를 위해 백엔드에서 다음 API들이 필요합니다:

### **1. PDF 저장 API**
```
POST /api/users/companies/save-invoice-pdf
Body: {
  company_id: number,
  campaign_id: number,
  campaign_name: string,
  pdf_base64: string,
  filename: string
}
```

### **2. 인보이스 조회 API**
```
GET /api/users/companies/:id/invoices
Response: [
  {
    campaign_id: number,
    campaign_name: string,
    pdf_url: string,
    filename: string,
    generated_at: string
  }
]
```

### **3. 정적 파일 서빙**
- `/pdfs/*` 경로로 저장된 PDF 파일들 서빙
- 또는 다운로드 전용 엔드포인트 구현

## ✅ Testing Status

- ✅ 인보이스 페이지 PDF 생성 및 다운로드
- ✅ 이메일 발송 (텍스트 + PDF 첨부)
- ✅ 회사 프로필 My Invoices UI
- ⏳ PDF 저장 및 조회 (백엔드 API 대기 중)

## 📝 Notes

- 모든 PDF 생성이 동일한 공통 함수를 사용하여 일관성 보장
- 이메일 발송 시 PDF 첨부와 회사 저장이 동시 진행
- 사용자는 최종 결과만 보고 중간 과정은 숨겨져 있음
- 백엔드 API 완성 시 완전한 기능 구현 완료