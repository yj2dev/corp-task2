## 실시간 환율 변환 서비스
- USD, CAD, KRW, HKD, JPY, CNY 6가지 화폐단위를 각각 실시간으로 변환할 수 있습니다. <br/>
EX. USD -> KRW, USD -> JPY 이런식으로 총 30가지 경우를 변환할 수 있습니다.
## 개발 기간
- 24.04.16 ~ 24.04.17(2일)
## 개발 인원
- 개인
## 실행방법
1. APILayer - Exchange Rates Data API 접근 키(토큰) 발급
   - <a href="https://apilayer.com/marketplace/exchangerates_data-api">참고 사이트</a>
   - Free Plan 사용시 달에 100건 제한
2. 최상위 폴더에 .env 파일 생성 후 REACT_APP_EXCHANGE_RATE_API_KEY={발급받은 토큰} 형식으로 작성
3. 콘솔에 ```npm i``` 로 필요한 패키지 설치
4. ```npm start``` 프로젝트 실행
## 구현 내용
### 환율 변환 페이지
- Redux로 통화간 화폐 비율 저장 
- 입력시 통화 단위로 변환 (EX. 12000 -> 12,000)
- 화폐 변화가 감지되었을 때 환율 정보가 없을때만 API 요청
- 화폐 전환 드롭다운, 탭 구현
### 시연 영상
![기업과제1 시연](https://github.com/yj2dev/corp-task2/assets/72322679/90f14887-db37-4d3d-a790-1013c6d04546)
