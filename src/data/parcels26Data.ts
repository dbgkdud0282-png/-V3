// 연천 장탄리 골든포레스트가든 26개 필지 마스터 데이터
// 1차반영.jpg (1320 x 961) 배경 이미지의 번호 원형(1~26번) 정밀 1:1 좌표 매핑
// 분양 완료 필지 (5, 6, 7, 9, 10, 13, 15) -> 진한 빨간색(#DC2626)
// 분양 가능 필지 (1, 2, 3, 4, 8, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26) -> 노란색(#FACC15)

export interface Parcel26Item {
  id: number; // 1 ~ 26
  lotNumber: number; // 1 ~ 26
  name: string; // '1번 필지'
  jibun: string; // 지적도 지번
  area: string; // 총 분양 평수 (예: '104.4평')
  exclusiveArea: string; // 전용면적 (예: '87.0평')
  totalAreaM2: string; // 면적 ㎡ (예: '345㎡')
  status: '분양 가능' | '분양 완료';
  orientation: '남향' | '남서향' | '동남향';
  price: string; // 분양가
  unitPrice?: number; // 평당 단가 (만원/평)
  features: string[];
  recommendedHouse: string;
  // SVG 구획 폴리곤 좌표 (1152 x 924 기준)
  polygon: string;
  // 번호지적.png 상의 원형 번호 정중앙 핀 좌표 (1:1 픽셀 매칭)
  pin: { x: number; y: number; r: number };
}

const DEFAULT_PARCELS_26_DATA: Parcel26Item[] = [
  {
    "id": 1,
    "lotNumber": 1,
    "name": "1번 필지",
    "jibun": "847-1",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "7,500만원~",
    "features": [
      "북서측 코너 독립 필지",
      "탁 트인 조망 및 파노라마 뷰",
      "10m 주 진입도로 인접"
    ],
    "recommendedHouse": "단층 모던 테라스 주택 (건폐율 20% 최적)",
    "polygon": "270,75 420,70 420,195 270,195",
    "pin": {
      "x": 461,
      "y": 130,
      "r": 38
    },
    "unitPrice": 85
  },
  {
    "id": 2,
    "lotNumber": 2,
    "name": "2번 필지",
    "jibun": "847-15",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "7,500만원~",
    "features": [
      "북측 도로 접도",
      "반듯한 장방형 대지",
      "풍부한 남향 일조권"
    ],
    "recommendedHouse": "2층 복층형 전원별장 & 루프탑",
    "polygon": "460,190 625,190 625,310 460,310",
    "pin": {
      "x": 683,
      "y": 256,
      "r": 39
    },
    "unitPrice": 85
  },
  {
    "id": 3,
    "lotNumber": 3,
    "name": "3번 필지",
    "jibun": "847-16",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "7,500만원~",
    "features": [
      "단지 북측 숲세권",
      "중앙 진입도로 편리",
      "기반시설 인입 완비"
    ],
    "recommendedHouse": "모던 클래식 2층 단독주택",
    "polygon": "640,260 800,260 800,380 640,380",
    "pin": {
      "x": 880,
      "y": 337,
      "r": 39
    },
    "unitPrice": 85
  },
  {
    "id": 4,
    "lotNumber": 4,
    "name": "4번 필지",
    "jibun": "847-17",
    "area": "105.0평",
    "exclusiveArea": "87.5평",
    "totalAreaM2": "347㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "12월 준공",
    "features": [
      "정남향 일조 우수",
      "개방감 좋은 조망",
      "단지 북동측 코너"
    ],
    "recommendedHouse": "패시브 힐링 하우스 & 온실 정원",
    "polygon": "800,280 950,280 950,405 800,405",
    "pin": {
      "x": 1047,
      "y": 361,
      "r": 39
    },
    "unitPrice": 85
  },
  {
    "id": 5,
    "lotNumber": 5,
    "name": "5번 필지",
    "jibun": "847-18",
    "area": "103.8평",
    "exclusiveArea": "86.5평",
    "totalAreaM2": "343㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 5,385만원",
    "features": [
      "서측 최상단 독립필지",
      "프라이빗 조망권 확보",
      "진입로 단독 활용 용이"
    ],
    "recommendedHouse": "프라이빗 갤러리 하우스",
    "polygon": "175,200 320,200 320,330 175,330",
    "pin": {
      "x": 340,
      "y": 269,
      "r": 38
    },
    "unitPrice": 85
  },
  {
    "id": 6,
    "lotNumber": 6,
    "name": "6번 필지",
    "jibun": "847-19",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 5,385만원",
    "features": [
      "서측 조용한 숲 조망",
      "쾌적한 전원 환경",
      "지하수/오폐수관 직결"
    ],
    "recommendedHouse": "중정형 자연친화 목조주택",
    "polygon": "140,310 285,310 285,430 140,430",
    "pin": {
      "x": 308,
      "y": 372,
      "r": 38
    },
    "unitPrice": 85
  },
  {
    "id": 7,
    "lotNumber": 7,
    "name": "7번 필지",
    "jibun": "847-20",
    "area": "105.3평",
    "exclusiveArea": "87.8평",
    "totalAreaM2": "348㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 5,385만원",
    "features": [
      "서측 하단 독립형 대지",
      "넓은 텃밭 및 조경 공간",
      "자연석 석축 시공 완료"
    ],
    "recommendedHouse": "전통한옥 퓨전 하우스 & 야외 바비큐존",
    "polygon": "115,410 260,410 260,530 115,530",
    "pin": {
      "x": 279,
      "y": 481,
      "r": 38
    },
    "unitPrice": 85
  },
  {
    "id": 8,
    "lotNumber": 8,
    "name": "8번 필지",
    "jibun": "847-21",
    "area": "103.2평",
    "exclusiveArea": "86.0평",
    "totalAreaM2": "341㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 5,470만원",
    "features": [
      "단지 서중앙 평탄지",
      "단지 내 이동 동선 우수",
      "우수관 및 전기통신 인입"
    ],
    "recommendedHouse": "스마트 에너지 제로 주택",
    "polygon": "310,270 450,270 450,390 310,390",
    "pin": {
      "x": 504,
      "y": 342,
      "r": 39
    },
    "unitPrice": 85
  },
  {
    "id": 9,
    "lotNumber": 9,
    "name": "9번 필지",
    "jibun": "847-22",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 5,470만원",
    "features": [
      "중앙 도로 접도 코너",
      "접근성 극대화",
      "상하수도 관로 완비"
    ],
    "recommendedHouse": "모던 큐브 2층 테라스 하우스",
    "polygon": "430,330 570,330 570,455 430,455",
    "pin": {
      "x": 635,
      "y": 411,
      "r": 39
    },
    "unitPrice": 85
  },
  {
    "id": 10,
    "lotNumber": 10,
    "name": "10번 필지",
    "jibun": "847-23",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 5,470만원",
    "features": [
      "중앙 도로 인접",
      "남향 일조 채광 우수",
      "기초 토목 토사 정리 완료"
    ],
    "recommendedHouse": "선큰가든형 모던 전원주택",
    "polygon": "390,440 530,440 530,560 390,560",
    "pin": {
      "x": 592,
      "y": 529,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 11,
    "lotNumber": 11,
    "name": "11번 필지",
    "jibun": "847-24",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 5,470만원",
    "features": [
      "서중앙 남측 도로 접도",
      "진출입 매우 편리",
      "정남향 개방형 뷰"
    ],
    "recommendedHouse": "와이드 창호 패밀리 빌라",
    "polygon": "350,550 490,550 490,670 350,670",
    "pin": {
      "x": 551,
      "y": 647,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 12,
    "lotNumber": 12,
    "name": "12번 필지",
    "jibun": "847-25",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 5,470만원",
    "features": [
      "단지 서남측 평탄지",
      "아늑한 숲 조망",
      "단지 내 도로 진입 수월"
    ],
    "recommendedHouse": "단층 컴팩트 세컨하우스",
    "polygon": "240,490 380,490 380,610 240,610",
    "pin": {
      "x": 429,
      "y": 584,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 13,
    "lotNumber": 13,
    "name": "13번 필지",
    "jibun": "847-26",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 3,104만원",
    "features": [
      "서측 녹지축 완충지 인접",
      "안락하고 조용한 입지",
      "경계 보강토 옹벽 완료"
    ],
    "recommendedHouse": "북유럽 스타일 전원주택",
    "polygon": "270,385 410,385 410,505 270,505",
    "pin": {
      "x": 463,
      "y": 466,
      "r": 40
    },
    "unitPrice": 72
  },
  {
    "id": 14,
    "lotNumber": 14,
    "name": "14번 필지",
    "jibun": "847-27",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 6,320만원",
    "features": [
      "단지 중앙 핵심 요지",
      "탁 트인 동서남 파노라마",
      "10m 중앙도로 연결"
    ],
    "recommendedHouse": "프리미엄 럭셔리 단독주택",
    "polygon": "575,385 720,385 720,505 575,505",
    "pin": {
      "x": 796,
      "y": 470,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 15,
    "lotNumber": 15,
    "name": "15번 필지",
    "jibun": "847-28",
    "area": "105.0평",
    "exclusiveArea": "87.5평",
    "totalAreaM2": "347㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 4,195만원",
    "features": [
      "동중앙 코너 프리미엄",
      "시원한 조망권 및 일조권",
      "단지 중심 랜드마크"
    ],
    "recommendedHouse": "모던 럭셔리 복층 빌라",
    "polygon": "710,420 855,420 855,540 710,540",
    "pin": {
      "x": 948,
      "y": 509,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 16,
    "lotNumber": 16,
    "name": "16번 필지",
    "jibun": "847-33",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "동남향",
    "price": "1억 6,320만원",
    "features": [
      "동측 도로 인접",
      "풍부한 아침 햇살",
      "상하수도 인입 완료"
    ],
    "recommendedHouse": "선라이즈 조망형 테라스 주택",
    "polygon": "540,475 680,475 680,600 540,600",
    "pin": {
      "x": 900,
      "y": 610,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 17,
    "lotNumber": 17,
    "name": "17번 필지",
    "jibun": "847-32",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "동남향",
    "price": "1억 6,320만원",
    "features": [
      "동남측 도로 접도",
      "시원한 계곡풍과 숲향기",
      "평탄 작업 완료"
    ],
    "recommendedHouse": "친환경 목조 패밀리 하우스",
    "polygon": "670,510 810,510 810,635 670,635",
    "pin": {
      "x": 840,
      "y": 710,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 18,
    "lotNumber": 18,
    "name": "18번 필지",
    "jibun": "847-31",
    "area": "106.0평",
    "exclusiveArea": "88.3평",
    "totalAreaM2": "350㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 6,320만원",
    "features": [
      "남측 중앙 독립필지",
      "남향 숲 파노라마 뷰",
      "넓은 프라이빗 마당"
    ],
    "recommendedHouse": "와이드 테라스 리조트형 주택",
    "polygon": "510,565 650,565 650,690 510,690",
    "pin": {
      "x": 717,
      "y": 786,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 19,
    "lotNumber": 19,
    "name": "19번 필지",
    "jibun": "847-30",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 6,320만원",
    "features": [
      "중앙 남측 완만 경사지",
      "조망 방해 없는 스텝다운 설계",
      "토목 공사 완비"
    ],
    "recommendedHouse": "스텝 테라스 가든 하우스",
    "polygon": "615,600 755,600 755,725 615,725",
    "pin": {
      "x": 722,
      "y": 672,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 20,
    "lotNumber": 20,
    "name": "20번 필지",
    "jibun": "847-29",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 6,320만원",
    "features": [
      "단지 중앙 순환로 연결",
      "우수한 일조와 편리한 주차",
      "즉시 착공 가능"
    ],
    "recommendedHouse": "모던 플랫 2층 단독주택",
    "polygon": "505,670 645,670 645,795 505,795",
    "pin": {
      "x": 757,
      "y": 571,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 21,
    "lotNumber": 21,
    "name": "21번 필지",
    "jibun": "847-34",
    "area": "108.0평",
    "exclusiveArea": "90.0평",
    "totalAreaM2": "357㎡",
    "status": "분양 가능",
    "orientation": "동남향",
    "price": "12월 준공",
    "features": [
      "동북측 최외곽 숲세권",
      "울창한 산림 바로 접함",
      "프라이빗 최고 입지"
    ],
    "recommendedHouse": "포레스트 힐링 빌라 & 온천형 스파",
    "polygon": "990,290 1130,290 1130,415 990,415",
    "pin": {
      "x": 1248,
      "y": 371,
      "r": 40
    },
    "unitPrice": 85
  },
  {
    "id": 22,
    "lotNumber": 22,
    "name": "22번 필지",
    "jibun": "847-35",
    "area": "105.0평",
    "exclusiveArea": "87.5평",
    "totalAreaM2": "347㎡",
    "status": "분양 가능",
    "orientation": "동남향",
    "price": "1억 9,720만원",
    "features": [
      "동측 도로 인접",
      "탁 트인 동남향 조망",
      "단지 진출입 수월"
    ],
    "recommendedHouse": "모던 큐브 2층 테라스 하우스",
    "polygon": "930,400 1075,400 1075,520 930,520",
    "pin": {
      "x": 1187,
      "y": 486,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 23,
    "lotNumber": 23,
    "name": "23번 필지",
    "jibun": "847-36",
    "area": "104.4평",
    "exclusiveArea": "87.0평",
    "totalAreaM2": "345㎡",
    "status": "분양 가능",
    "orientation": "동남향",
    "price": "1억 9,720만원",
    "features": [
      "동남측 숲세권 쾌적",
      "자연석 옹벽 축조 완료",
      "기반시설 완비"
    ],
    "recommendedHouse": "전통과 현대가 어우러진 목조주택",
    "polygon": "870,500 1015,500 1015,625 870,625",
    "pin": {
      "x": 1118,
      "y": 600,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 24,
    "lotNumber": 24,
    "name": "24번 필지",
    "jibun": "847-37",
    "area": "105.5평",
    "exclusiveArea": "87.9평",
    "totalAreaM2": "349㎡",
    "status": "분양 완료",
    "orientation": "남향",
    "price": "1억 9,720만원",
    "features": [
      "동남측 하단 코너",
      "하루종일 따뜻한 햇살",
      "넓은 진입로 확보"
    ],
    "recommendedHouse": "선룸형 전원주택 & 정원",
    "polygon": "820,595 965,595 965,720 820,720",
    "pin": {
      "x": 1065,
      "y": 706,
      "r": 41
    },
    "unitPrice": 85
  },
  {
    "id": 25,
    "lotNumber": 25,
    "name": "25번 필지",
    "jibun": "847-38",
    "area": "106.2평",
    "exclusiveArea": "88.5평",
    "totalAreaM2": "351㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 9,720만원",
    "features": [
      "단지 남동측 코너",
      "시야 간섭 없는 영구 조망",
      "남향 일조권 최상"
    ],
    "recommendedHouse": "파노라마 뷰 2층 고급별장",
    "polygon": "755,685 900,685 900,810 755,810",
    "pin": {
      "x": 992,
      "y": 804,
      "r": 42
    },
    "unitPrice": 85
  },
  {
    "id": 26,
    "lotNumber": 26,
    "name": "26번 필지",
    "jibun": "847-39",
    "area": "110.0평",
    "exclusiveArea": "91.7평",
    "totalAreaM2": "364㎡",
    "status": "분양 가능",
    "orientation": "남향",
    "price": "1억 9,720만원",
    "features": [
      "단지 최남단 독립 필지",
      "시원한 남향 파노라마 뷰",
      "가장 넓은 전용 면적"
    ],
    "recommendedHouse": "프리미엄 럭셔리 하우스 & 프라이빗 풀빌라",
    "polygon": "640,760 790,760 790,885 640,885",
    "pin": {
      "x": 872,
      "y": 885,
      "r": 41
    },
    "unitPrice": 85
  }
];

export const PARCELS_26_DATA: Parcel26Item[] = DEFAULT_PARCELS_26_DATA;
