# CAFEMATE : 카페 필터검색 웹사이트

❓ Problem : 포털 사이트 검색창에 '@@동 카페'로 검색하면, 내가 원하는 분위기의 카페를 찾기 어렵다 😮

‼ Idea : 사용자가 원하는 메뉴와 분위기의 카페를 찾아주는 웹사이트가 있으면 좋지 않을까? 🤔

💯 Solution : 카페마다 카테고리, 메뉴 등을 미리 저장해두고, 사용자가 찾는 카페를 우선으로 보여주자!! 😁


### 🎯 사이트 : http://cafemate.shop

https://user-images.githubusercontent.com/77563814/133954530-cebd5cd8-1b49-4fa2-8dad-0fa8fd56260d.mp4



### 🔔 주요 기능과 로직

- **카페 검색** : 원하는 태그(카테고리, 메뉴, 별점 등) 선택하면 그에 맞는 카페들을 불러옴
- **찜한 카페** : 원하는 카페를 내 찜한카페 리스트로 등록, 삭제
- **댓글 기능** : 카페 상세페이지에서 댓글 등록, 수정, 삭제
- **페이징 기능** : 메인 페이지 검색 결과로 카페리스트를 백에서 프론트로 10개씩 보내줌
- **로그인** : 구글 OAuth 로그인 API 사용
- **지도** : 카카오 지도 API 사용 (메인페이지, 카페 상세페이지)
- **크롤링** : 카카오맵에서 카페 기본 정보와 네이버 블로그 리뷰 크롤링(Python 사용)
- **카페 정보 저장** : 크롤링한 카페 기본 정보(이름, 위치 등)와 그를 활용하여 얻은 정보(카테고리,가격 등)을 저장
- **배포** : AWS EC2로 배포하고 도메인에 연동 (jar파일로 빌드)
- **DB** : AWS MySQL에 미리 크롤링한 카페 데이터(Cafes)와 새로 생기는 데이터(Users, Comments, Likes) 저장

### 💯 메인 로직 1 : 카페마다 카테고리 찾아서 저장하기
1. 미리 카테고리에 해당하는 키워드 정하기

| 카테고리 | 키워드|
|--|--|
|과제하기 좋은|조용, 스터디, 넓은 공간, 넓은 책상, 콘센트, 과제, 공부|
|수다떨기 좋은|친구, 모임, 그룹, 수다|
|사진찍기 좋은|인생샷, 인생 사진, 포토존, 소품, 분위기 좋, 좋은 분위기, 인테리어, 감성, 사진찍기 좋은|
|로스팅 직접 하는|로스팅, 로스터기, 로스터리|
|깔끔한|깔끔, 청결, 깨끗|

2. 카카오맵에서 카페별 블로그 리뷰페이지 주소 크롤링하여 모으기
3. 리뷰페이지에서 미리 정한 키워드가 나오면 해당 카테고리명을 DB에 저장

### 💯 메인 로직 2 : 메인 페이지에서 카페 필터검색

1. 지역 선택 : 선택한 지역의 카페 정보들을 리스트로 DB에서 꺼내옴
2. 태그 선택 : 사용자가 태그(카테고리, 메뉴, 가격 범위 등) 선택하면 가장 많이 일치하는 순서대로 리스트를 정렬함 
3. 별점순 혹은 가격순 선택 : 2번에서 정렬된 리스트에서 우선순위가 같은 카페들을 별점순(혹은 가격순)으로 정렬

### 🛠 서비스 구조
![서비스구조](https://user-images.githubusercontent.com/77563814/134013439-f36295cc-39c0-41e7-86b6-19e6a02183c6.jpg)


### ✅ 기술 스택

- Front
    - Javascript, React, Redux, Ant design
- Back
    - Java - version 11, SpringBoot, Spring Data JPA, Gradle, Junit4, MySQL, AWS(EC2, RDS)


### 🕑 개발 기간

- 2021.7.27 ~ 8.31  (5주)

### 👩‍💻 FE & BE 역할 분담

📢 [프로젝트 칸반보드](https://github.com/sungeun101/cafemate/projects/1)

- FE (페이지별 분담)
    - 조성은 : 카페 상세 페이지, 마이페이지
    - 윤서윤 : 메인페이지, 로그인, 크롤링(Python)

- BE
    - 황수영 : Cafes, Comments, Users, Likes, Junit4, AWS(EC2, RDS), MySQL
    - 조의형
    
----

### 🚩 기획 & 설계

[기능 명세서](https://www.notion.so/4241cfb8aab64592af099f34b2ccb938)

⚡[페이지 기획서](https://whimsical.com/8-MbpuashuB5aRgSKR6jM14A) → ✨[디자인](https://www.figma.com/file/1FrTtdMDvn53kDvS93GHBL/%EC%B9%B4%ED%8E%98?node-id=0%3A1)

[API 명세서](https://www.notion.so/API-0b0cbd9ff7eb46d4b4b21446bf20233d)

[API 문서](https://www.notion.so/API-f730b73b41b249a8a394cbbc4dc18213)

[DB 명세서](https://www.notion.so/DB-45d7f01cbc334d40968bd39d2dfe84ad)

![DB](https://user-images.githubusercontent.com/77563814/133954614-b1a28410-baac-4f6b-a1e0-3c35b5d5d93b.png)
