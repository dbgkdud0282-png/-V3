import { Parcel, SiteConfig, VisitReservation, ActivityLog, MapMarkerConfig, SectionContentConfig, HeroPillStyleConfig, LocationCard } from '../types';

export const INITIAL_LOCATION_CARDS: LocationCard[] = [
  {
    "id": "loc-card-1",
    "category": "교통 환경",
    "title": {
      "pc": "1호선 전곡역 개통 완료",
      "mobile": "1호선 전곡역 개통 완료",
      "useSame": true,
      "pcSize": "text-base sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-base",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "• 1호선 전곡역 개통 완료\n• 10M 진입도로 \n• 37번 국도(고양·파주·포천) 직결",
      "mobile": "• 1호선 전곡역 개통 완료\n• 10M 진입도로 \n• 37번 국도(고양·파주·포천) 직결",
      "useSame": true,
      "pcSize": "text-sm",
      "pcWeight": "font-normal",
      "mobileSize": "text-sm",
      "mobileWeight": "font-normal"
    }
  },
  {
    "id": "loc-card-2",
    "category": "생활 환경",
    "title": {
      "pc": "원스톱 인프라 & 청정 수변",
      "mobile": "원스톱 인프라 & 청정 수변",
      "useSame": true,
      "pcSize": "",
      "pcWeight": "font-black",
      "mobileSize": "",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "• 도심 원스톱 인프라\n• 전곡근린공원 웰빙 라이프\n• 한탄강 조망 & 시티뷰",
      "mobile": "• 도심 원스톱 인프라\n• 전곡근린공원 웰빙 라이프\n• 한탄강 조망 & 시티뷰",
      "useSame": true,
      "pcSize": "text-sm",
      "pcWeight": "font-normal",
      "mobileSize": "text-sm",
      "mobileWeight": "font-normal"
    }
  },
  {
    "id": "loc-card-3",
    "category": "교육 환경",
    "title": {
      "pc": "안심 학세권 & 대입 혜택",
      "mobile": "안심 학세권 & 대입 혜택",
      "useSame": true,
      "pcSize": "text-base sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-base",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "• 초·중·고교 안심 통학권\n• 대입 “농어촌 특별전형”\n• 학원가 및 복지시설 인접",
      "mobile": "• 초·중·고교 안심 통학권\n• 대입 “농어촌 특별전형”\n• 학원가 및 복지시설 인접",
      "useSame": true,
      "pcSize": "text-sm",
      "pcWeight": "font-normal",
      "mobileSize": "text-sm",
      "mobileWeight": "font-normal"
    }
  }
];

export const INITIAL_TOP_LOCATION_CARDS: LocationCard[] = [
  {
    "id": "top-loc-1",
    "category": "초역세권",
    "title": {
      "pc": "1호선 전곡역 직결",
      "mobile": "1호선 전곡역 직결",
      "useSame": true,
      "pcSize": "text-sm sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-sm",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "서울(용산·청량리) 환승 없이 한번에 직결",
      "mobile": "서울(용산·청량리) 환승 없이 \n한번에 직결",
      "useSame": false,
      "pcSize": "text-[11px] sm:text-xs",
      "pcWeight": "font-normal",
      "mobileSize": "text-[11px]",
      "mobileWeight": "font-normal"
    }
  },
  {
    "id": "top-loc-2",
    "category": "세제 혜택",
    "title": {
      "pc": "세컨하우스 추천",
      "mobile": "세컨하우스 추천",
      "useSame": true,
      "pcSize": "text-sm sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-sm",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "주택수 미포함",
      "mobile": "주택수 미포함",
      "useSame": true,
      "pcSize": "text-[11px] sm:text-xs",
      "pcWeight": "font-normal",
      "mobileSize": "text-[11px]",
      "mobileWeight": "font-normal"
    }
  },
  {
    "id": "top-loc-3",
    "category": "명문대 혜택",
    "title": {
      "pc": "농어촌 특별전형",
      "mobile": "농어촌 특별전형",
      "useSame": true,
      "pcSize": "text-sm sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-sm",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "초·중·고 & 대입 수시 압도적 우위",
      "mobile": "초·중·고 & 대입 수시 \n압도적 우위",
      "useSame": false,
      "pcSize": "text-[11px] sm:text-xs",
      "pcWeight": "font-normal",
      "mobileSize": "text-[11px]",
      "mobileWeight": "font-normal"
    }
  },
  {
    "id": "top-loc-4",
    "category": "수변 조망",
    "title": {
      "pc": "한탄강 파노라마 뷰",
      "mobile": "한탄강 파노라마 뷰",
      "useSame": true,
      "pcSize": "text-sm sm:text-lg",
      "pcWeight": "font-black",
      "mobileSize": "text-sm",
      "mobileWeight": "font-black"
    },
    "description": {
      "pc": "유네스코 한탄강 수변 파노라마 뷰와\n전곡 도심 시티뷰",
      "mobile": "유네스코 한탄강 수변 파노라마 뷰와 전곡 도심 시티뷰",
      "useSame": false,
      "pcSize": "text-[11px] sm:text-xs",
      "pcWeight": "font-normal",
      "mobileSize": "text-[11px]",
      "mobileWeight": "font-normal"
    }
  }
];

export const INITIAL_HERO_PILL_STYLE: HeroPillStyleConfig = {
  titleFontSize: 'text-base sm:text-lg',
  titleFontWeight: 'font-extrabold',
  descFontSize: 'text-xs sm:text-sm',
  descFontWeight: 'font-normal',
};

export const INITIAL_MAP_MARKER_CONFIG: MapMarkerConfig = {
  enableAnimation: true,
  animationType: 'float',
  animationSpeed: 'normal',
  fontSizeSingle: 34,
  fontSizeDouble: 29,
  fontWeight: '900',
  markerScale: 1.0,
  markerOpacity: 1.0,
  showCompletedBadge: true,
  availableFillColor: '#FACC15',
  availableTextColor: '#0F172A',
  availableBorderColor: '#FFFFFF',
  completedFillColor: '#DC2626',
  completedTextColor: '#FFFFFF',
  completedBorderColor: '#FFFFFF',
};

export const INITIAL_SECTION_CONTENT_CONFIG: SectionContentConfig = {
  heroNoticeText: '전곡역 차량 5분, 한탄강 조망 프리미엄 전원주택지\n소형평수부터 대형평수까지 맞춤 선택 가능하며, 토목/건축허가 및 상하수도 인입이 완료된 완벽한 대지입니다.',
  overviewNoticeText: '복잡한 인허가 및 토목공사가 100% 완료되어 계약 즉시 원하는 스타일의 주택을 건축하실 수 있습니다.\n기존 주택수에 포함되지 않아 세금 및 규제 부담 없이 안전하게 취득 가능합니다.',
  mapNoticeText: '원하시는 필지 번호(핀)를 클릭하시면 실시간 분양 상태, 전용면적, 추천 주택형 및 분양가를 바로 확인하실 수 있습니다.\n※ 붉은색 마커는 이미 계약 체결된 필지이며, 노란색 마커는 즉시 계약 가능한 필지입니다.',
  reservationNoticeText: '전문 분양 상담사가 현장 동행하여 각 필지별 일조권, 한탄강 조망, 도로 연결 상태를 친절히 안내해 드립니다.\n주말 및 공휴일에도 현장 홍보관이 정상 운영됩니다.',
  specialValuesNoticeText: '',
  locationNoticeText: '1호선 전곡역(연천 연장선)과 3번 국도 우회도로 개통으로 서울 및 수도권 북부에서 1시간 이내에 쾌속 진입이 가능합니다.',
};

export const INITIAL_PARCELS: Parcel[] = [
  {
    "id": "parcel-847-1",
    "number": "847-1임",
    "lotNumber": 1,
    "lotNumberText": "①",
    "additionalLots": "847-42",
    "exclusiveAreaM2": 990,
    "exclusiveAreaPyeong": 299.48,
    "totalAreaM2": 1188,
    "totalAreaPyeong": 359.38,
    "areaPyeong": 359.38,
    "areaM2": 1188,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 15800,
    "features": [
      "단지 최상단 대형 필지",
      "847-1+847-42 듀얼 구획",
      "한탄강 파노라마 조망"
    ],
    "recommendedHouse": "프리미엄 리조트형 대저택 (정원+풀빌라)"
  },
  {
    "id": "parcel-847-15",
    "number": "847-15임",
    "lotNumber": 2,
    "lotNumberText": "②",
    "additionalLots": "847-43",
    "exclusiveAreaM2": 990,
    "exclusiveAreaPyeong": 299.48,
    "totalAreaM2": 1188,
    "totalAreaPyeong": 359.38,
    "areaPyeong": 359.38,
    "areaM2": 1188,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 15800,
    "features": [
      "단지 북측 최고 조망권",
      "847-15+847-43 듀얼 구획",
      "넓은 사계절 정원"
    ],
    "recommendedHouse": "고급 복층 전원주택 & 와이드 테라스"
  },
  {
    "id": "parcel-847-16",
    "number": "847-16임",
    "lotNumber": 3,
    "lotNumberText": "③",
    "additionalLots": "847-44",
    "exclusiveAreaM2": 618,
    "exclusiveAreaPyeong": 186.95,
    "totalAreaM2": 741.6,
    "totalAreaPyeong": 224.34,
    "areaPyeong": 224.34,
    "areaM2": 741.6,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 9900,
    "features": [
      "북측 도로 접도",
      "847-16+847-44 합산",
      "일조 채광 우수"
    ],
    "recommendedHouse": "모던 스칸디나비아 스타일 주택"
  },
  {
    "id": "parcel-847-17",
    "number": "847-17임",
    "lotNumber": 4,
    "lotNumberText": "④",
    "additionalLots": "847-45",
    "exclusiveAreaM2": 737,
    "exclusiveAreaPyeong": 222.94,
    "totalAreaM2": 884.4,
    "totalAreaPyeong": 267.53,
    "areaPyeong": 267.53,
    "areaM2": 884.4,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 11800,
    "features": [
      "동측 산림 녹지 인접",
      "847-17+847-45 합산",
      "동남향 자연 파노라마"
    ],
    "recommendedHouse": "숲세권 힐링 패시브 하우스"
  },
  {
    "id": "parcel-847-34",
    "number": "847-34임",
    "lotNumber": 5,
    "lotNumberText": "⑤",
    "exclusiveAreaM2": 617,
    "exclusiveAreaPyeong": 186.64,
    "totalAreaM2": 740.4,
    "totalAreaPyeong": 223.97,
    "areaPyeong": 223.97,
    "areaM2": 740.4,
    "orientation": "동남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 9800,
    "features": [
      "단지 동측 최외곽 숲 조망",
      "독립적이고 조용한 힐링 입지"
    ],
    "recommendedHouse": "자연 친화형 모던 우드 하우스"
  },
  {
    "id": "parcel-847-35",
    "number": "847-35임",
    "lotNumber": 6,
    "lotNumberText": "⑥",
    "exclusiveAreaM2": 639,
    "exclusiveAreaPyeong": 193.3,
    "totalAreaM2": 766.8,
    "totalAreaPyeong": 231.96,
    "areaPyeong": 231.96,
    "areaM2": 766.8,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 10200,
    "features": [
      "동남측 10m 내부도로 인접",
      "단지 진출입 편리",
      "완만한 평탄지"
    ],
    "recommendedHouse": "단층 및 다락방 가든 하우스"
  },
  {
    "id": "parcel-847-36",
    "number": "847-36임",
    "lotNumber": 7,
    "lotNumberText": "⑦",
    "exclusiveAreaM2": 639,
    "exclusiveAreaPyeong": 193.3,
    "totalAreaM2": 766.8,
    "totalAreaPyeong": 231.96,
    "areaPyeong": 231.96,
    "areaM2": 766.8,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 10200,
    "features": [
      "남향 햇살 풍부",
      "산162-1도 연결 도로 인접",
      "동측 자연 조망"
    ],
    "recommendedHouse": "패밀리형 2층 전원주택"
  },
  {
    "id": "parcel-847-37",
    "number": "847-37임",
    "lotNumber": 8,
    "lotNumberText": "⑧",
    "exclusiveAreaM2": 639,
    "exclusiveAreaPyeong": 193.3,
    "totalAreaM2": 766.8,
    "totalAreaPyeong": 231.96,
    "areaPyeong": 231.96,
    "areaM2": 766.8,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 10200,
    "features": [
      "단지 남동측 명당",
      "하루종일 따스한 일조량",
      "개방감 우수"
    ],
    "recommendedHouse": "햇살 가득한 온실형 테라스 주택"
  },
  {
    "id": "parcel-847-38",
    "number": "847-38임",
    "lotNumber": 9,
    "lotNumberText": "⑨",
    "exclusiveAreaM2": 639,
    "exclusiveAreaPyeong": 193.3,
    "totalAreaM2": 766.8,
    "totalAreaPyeong": 231.96,
    "areaPyeong": 231.96,
    "areaM2": 766.8,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 10200,
    "features": [
      "남서향 노을 조망 우수",
      "완만한 경사 평탄화 완료",
      "넓은 마당"
    ],
    "recommendedHouse": "모던 클래식 2층 단독주택"
  },
  {
    "id": "parcel-847-39",
    "number": "847-39임",
    "lotNumber": 10,
    "lotNumberText": "⑩",
    "exclusiveAreaM2": 639,
    "exclusiveAreaPyeong": 193.3,
    "totalAreaM2": 766.8,
    "totalAreaPyeong": 231.96,
    "areaPyeong": 231.96,
    "areaM2": 766.8,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 10200,
    "features": [
      "단지 최남단 코너 필지",
      "850전 방면 탁 트인 뷰",
      "사생활 보호 최상"
    ],
    "recommendedHouse": "프라이빗 테라스 빌라"
  },
  {
    "id": "parcel-847-31",
    "number": "847-31임",
    "lotNumber": 11,
    "lotNumberText": "⑪",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8600,
    "features": [
      "단지 남측 중심 라인",
      "정남향 풍부한 채광",
      "10m 도로 직접 연결"
    ],
    "recommendedHouse": "실거주 맞춤형 단층 전원주택"
  },
  {
    "id": "parcel-847-30",
    "number": "847-30임",
    "lotNumber": 12,
    "lotNumberText": "⑫",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8600,
    "features": [
      "남향 배치",
      "반듯한 사각형 대지 구획",
      "기반시설 인입 완료"
    ],
    "recommendedHouse": "중목구조 친환경 주택"
  },
  {
    "id": "parcel-847-29",
    "number": "847-29임",
    "lotNumber": 13,
    "lotNumberText": "⑬",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8600,
    "features": [
      "중앙 도로 접근성 우수",
      "평탄화 및 보강토 축대 완비"
    ],
    "recommendedHouse": "모던 박공지붕 단독주택"
  },
  {
    "id": "parcel-847-28",
    "number": "847-28임",
    "lotNumber": 14,
    "lotNumberText": "⑭",
    "exclusiveAreaM2": 461,
    "exclusiveAreaPyeong": 139.45,
    "totalAreaM2": 553.2,
    "totalAreaPyeong": 167.34,
    "areaPyeong": 167.34,
    "areaM2": 553.2,
    "orientation": "남향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 7500,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "건축 설계 및 인허가 진행중",
      "중앙 진입로 인접"
    ],
    "recommendedHouse": "단독 전원주택 (착공 준비 중)"
  },
  {
    "id": "parcel-847-27",
    "number": "847-27임",
    "lotNumber": 15,
    "lotNumberText": "⑮",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8600,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "10m 주간선도로 코너",
      "계약 체결 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-33",
    "number": "847-33임",
    "lotNumber": 16,
    "lotNumberText": "⑯",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8600,
    "features": [
      "단지 내부 조용한 블록",
      "남서향 채광 최적",
      "10m 도로망 완비"
    ],
    "recommendedHouse": "2층 복층형 전원주택"
  },
  {
    "id": "parcel-847-32",
    "number": "847-32임",
    "lotNumber": 17,
    "lotNumberText": "⑰",
    "exclusiveAreaM2": 528,
    "exclusiveAreaPyeong": 159.72,
    "totalAreaM2": 633.6,
    "totalAreaPyeong": 191.66,
    "areaPyeong": 191.66,
    "areaM2": 633.6,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8600,
    "features": [
      "단지 남서측 코너",
      "시원한 조망각",
      "평탄화 완료"
    ],
    "recommendedHouse": "와이드 창호 모던 하우스"
  },
  {
    "id": "parcel-847-24",
    "number": "847-24임",
    "lotNumber": 18,
    "lotNumberText": "⑱",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8100,
    "features": [
      "남서향 노을 조망 명당",
      "반듯한 필지 모양",
      "상하수도 인입"
    ],
    "recommendedHouse": "가든 테라스형 단독주택"
  },
  {
    "id": "parcel-847-23",
    "number": "847-23임",
    "lotNumber": 19,
    "lotNumberText": "⑲",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남서향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8100,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "설계 인허가 진행 중",
      "남서향 채광 우수"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-22",
    "number": "847-22임",
    "lotNumber": 20,
    "lotNumberText": "⑳",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8100,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "중앙 10m 도로 접도",
      "선착순 계약 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-21",
    "number": "847-21임",
    "lotNumber": 21,
    "lotNumberText": "㉑",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8100,
    "features": [
      "중앙 도로 북측 최선호 필지",
      "정남향 풍부한 일조권",
      "즉시 착공 가능"
    ],
    "recommendedHouse": "모던 클래식 2층 단독주택"
  },
  {
    "id": "parcel-847-26",
    "number": "847-26임",
    "lotNumber": 22,
    "lotNumberText": "㉒",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남서향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8100,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "10m 내부도로 코너",
      "계약 체결 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-25",
    "number": "847-25임",
    "lotNumber": 23,
    "lotNumberText": "㉓",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8100,
    "features": [
      "서측 847-20임 인접",
      "남서향 오후 채광 풍부",
      "가성비 우수"
    ],
    "recommendedHouse": "실속형 전원주택 & 텃밭 정원"
  },
  {
    "id": "parcel-847-20",
    "number": "847-20임",
    "lotNumber": 24,
    "lotNumberText": "㉔",
    "exclusiveAreaM2": 499,
    "exclusiveAreaPyeong": 150.95,
    "totalAreaM2": 598.8,
    "totalAreaPyeong": 181.14,
    "areaPyeong": 181.14,
    "areaM2": 598.8,
    "orientation": "남서향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8000,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "단지 서측 초입 라인",
      "계약 체결 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-19",
    "number": "847-19임",
    "lotNumber": 25,
    "lotNumberText": "㉕",
    "exclusiveAreaM2": 499,
    "exclusiveAreaPyeong": 150.95,
    "totalAreaM2": 598.8,
    "totalAreaPyeong": 181.14,
    "areaPyeong": 181.14,
    "areaM2": 598.8,
    "orientation": "남서향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8000,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "진입 도로 수월",
      "계약 체결 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-18",
    "number": "847-18임",
    "lotNumber": 26,
    "lotNumberText": "㉖",
    "exclusiveAreaM2": 499,
    "exclusiveAreaPyeong": 150.95,
    "totalAreaM2": 598.8,
    "totalAreaPyeong": 181.14,
    "areaPyeong": 181.14,
    "areaM2": 598.8,
    "orientation": "남서향",
    "status": "completed",
    "isStarredSoldOut": true,
    "priceMillionWon": 8000,
    "features": [
      "★ 계약완료 (도면 별표시 완판)",
      "서측 진입로 최상단 코너",
      "계약 체결 완료"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-x27",
    "number": "847-27-1임",
    "lotNumber": 27,
    "lotNumberText": "㉗",
    "exclusiveAreaM2": 500,
    "exclusiveAreaPyeong": 151.25,
    "totalAreaM2": 600,
    "totalAreaPyeong": 181.5,
    "areaPyeong": 181.5,
    "areaM2": 600,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8500,
    "features": [
      "신규 필지 분양 개시",
      "우수한 채광 및 조망",
      "계획관리지역"
    ],
    "recommendedHouse": "단독 전원주택"
  },
  {
    "id": "parcel-847-x28",
    "number": "847-28-1임",
    "lotNumber": 28,
    "lotNumberText": "㉘",
    "exclusiveAreaM2": 520,
    "exclusiveAreaPyeong": 157.3,
    "totalAreaM2": 624,
    "totalAreaPyeong": 188.76,
    "areaPyeong": 188.76,
    "areaM2": 624,
    "orientation": "남서향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 8800,
    "features": [
      "신규 필지 분양 개시",
      "넓은 정원 확보 가능",
      "기반시설 완비"
    ],
    "recommendedHouse": "모던 전원주택"
  },
  {
    "id": "parcel-847-x29",
    "number": "847-29-1임",
    "lotNumber": 29,
    "lotNumberText": "㉙",
    "exclusiveAreaM2": 550,
    "exclusiveAreaPyeong": 166.37,
    "totalAreaM2": 660,
    "totalAreaPyeong": 199.65,
    "areaPyeong": 199.65,
    "areaM2": 660,
    "orientation": "남향",
    "status": "available",
    "isStarredSoldOut": false,
    "priceMillionWon": 9200,
    "features": [
      "신규 필지 분양 개시",
      "탁 트인 개방감",
      "남향 위주 배치"
    ],
    "recommendedHouse": "단층 또는 복층 주택"
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  brandName: '한탄강 전원주택지',
  subBrandName: '골든포레스트 (Golden Forest)',
  phone: '010-8389-0045',
  heroBadge: '수도권 인근 · 한탄강 조망 전원주택지',
  heroTitleLine1: '전곡역 차량 5분, 한탄강 조망',
  heroTitleHighlight: '전원주택지',
  heroTitleLine2: '',
  heroPriceHighlight: '토지가격 7,500만원 부터~',
  heroDescription1: '소형평수부터 대형평수까지 선택 가능 · 남향·남서향 위주 · 29필지',
  heroDescription2: '복잡한 행정절차 없이, 집만 지으면 끝!',
  heroPills: [
    { id: 'pill-1', num: '01', title: { pc: '개발행위 완료', mobile: '개발행위 완료', useSame: true }, desc: { pc: '허가·상하수도까지 완료', mobile: '허가·상하수도까지 완료', useSame: true } },
    { id: 'pill-2', num: '02', title: { pc: '10m 진입도로', mobile: '10m 진입도로', useSame: true }, desc: { pc: '넓은 진입도로 확보', mobile: '넓은 진입도로 확보', useSame: true } },
    { id: 'pill-3', num: '03', title: { pc: '주택수 미포함', mobile: '주택수 미포함', useSame: true }, desc: { pc: '부담 없는 취득', mobile: '부담 없는 취득', useSame: true } },
    { id: 'pill-4', num: '04', title: { pc: '전용부담금 납부 완료', mobile: '전용부담금 납부 완료', useSame: true }, desc: { pc: '추가 부담 없는 토지', mobile: '추가 부담 없는 토지', useSame: true } },
  ],
  heroPillStyle: INITIAL_HERO_PILL_STYLE,
  overview: {
    location: '경기도 연천군 장탄리 847-21 일원',
    locationDetail: '(전곡역 차량 5분 · 한탄강 조망)',
    parcelsSummary: '총 29개 필지',
    parcelsDetail: '남향·남서향 위주',
    priceStart: '7,500만원 부터~',
    priceDetail: '소형 ~ 대형평수 선택가능',
    phone: '010-8389-0045',
  },
  specialValues: [
    {
      id: 'sv-1',
      index: 'SPECIAL VALUE 01',
      title: '개발행위 완료 · 허가 완료',
      description: '토목허가, 건축허가, 상·하수도 및 도로포장까지 모두 완료되어 복잡한 행정절차 없이 바로 건축을 시작할 수 있습니다.',
      image: '/assets/real/development_permit.jpg',
    },
    {
      id: 'sv-2',
      index: 'SPECIAL VALUE 02',
      title: '전용부담금 납부 완료',
      description: '전용부담금까지 납부가 완료되어, 추가 부담 없이 토지를 취득하고 집을 지을 수 있는 준비된 상태입니다.',
      image: '/assets/real/golden_forest_render_1789389192364.jpg',
    },
    {
      id: 'sv-3',
      index: 'SPECIAL VALUE 03',
      title: '10미터의 넓은 진입도로',
      description: '넓은 진입도로가 확보되어 차량 이동과 자재 반입이 편리하고, 대형 차량도 부담 없이 진입할 수 있습니다.',
      image: '/assets/real/entrance_road_new.png',
    },
    {
      id: 'sv-4',
      index: 'SPECIAL VALUE 04',
      title: '주택수에 포함되지 않는 전원주택지',
      description: '전원주택지로 분류되어 기존 주택수에 포함되지 않아, 자산 관리와 취득에 부담이 없는 자유로운 선택이 가능합니다.',
      image: '/assets/real/jeonwon_image.png',
    },
  ],
  locationPoints: [
    {
      id: 'loc-1',
      title: '전곡역 차량 5분',
      subtitle: '수도권 접근성 우수',
      icon: 'train',
    },
    {
      id: 'loc-2',
      title: '한탄강 조망',
      subtitle: '자연을 품은 전원생활',
      icon: 'water',
    },
    {
      id: 'loc-3',
      title: '주거 · 투자 겸용',
      subtitle: '현재 · 미래가치 기대',
      icon: 'building',
    },
    {
      id: 'loc-4',
      title: '편안한 전원생활',
      subtitle: '여유로운 일상의 시작',
      icon: 'leaf',
    },
  ],
  locationCards: INITIAL_LOCATION_CARDS,
  topLocationCards: INITIAL_TOP_LOCATION_CARDS,
  mapMarker: INITIAL_MAP_MARKER_CONFIG,
  sectionContent: INITIAL_SECTION_CONTENT_CONFIG,
  textCustomizer: {
    heroBadge: { pc: '수도권 인근 · 한탄강 조망 전원주택지', mobile: '수도권 인근 · 한탄강 조망 전원주택지', useSame: true },
    heroTitleLine1: { pc: '전곡역 차량 5분, 한탄강 조망', mobile: '전곡역 차량 5분, 한탄강 조망', useSame: true },
    heroTitleHighlight: { pc: '전원주택지', mobile: '전원주택지', useSame: true },
    heroTitleLine2: { pc: '', mobile: '', useSame: true },
    heroDescription1: { pc: '소형평수부터 대형평수까지 선택 가능 · 남향·남서향 위주 · 29필지', mobile: '소형평수부터 대형평수까지 선택 가능 · 남향·남서향 위주 · 29필지', useSame: true },
    heroDescription2: { pc: '복잡한 행정절차 없이, 집만 지으면 끝!', mobile: '복잡한 행정절차 없이, 집만 지으면 끝!', useSame: true },
    
    heroPills: [
      { id: 'pill-1', num: '01', title: { pc: '개발행위 완료', mobile: '개발행위 완료', useSame: true }, desc: { pc: '허가·상하수도까지 완료', mobile: '허가·상하수도까지 완료', useSame: true } },
      { id: 'pill-2', num: '02', title: { pc: '10m 진입도로', mobile: '10m 진입도로', useSame: true }, desc: { pc: '넓은 진입도로 확보', mobile: '넓은 진입도로 확보', useSame: true } },
      { id: 'pill-3', num: '03', title: { pc: '주택수 미포함', mobile: '주택수 미포함', useSame: true }, desc: { pc: '부담 없는 취득', mobile: '부담 없는 취득', useSame: true } },
      { id: 'pill-4', num: '04', title: { pc: '전용부담금 납부 완료', mobile: '전용부담금 납부 완료', useSame: true }, desc: { pc: '추가 부담 없는 토지', mobile: '추가 부담 없는 토지', useSame: true } },
    ],
    
    overviewLocation: { pc: '경기도 연천군 장탄리 847-21 일원', mobile: '경기도 연천군 장탄리 847-21 일원', useSame: true },
    overviewLocationDetail: { pc: '(전곡역 차량 5분 · 한탄강 조망)', mobile: '(전곡역 차량 5분 · 한탄강 조망)', useSame: true },
    overviewParcelsSummary: { pc: '총 29개 필지', mobile: '총 29개 필지', useSame: true },
    overviewParcelsDetail: { pc: '남향·남서향 위주', mobile: '남향·남서향 위주', useSame: true },
    overviewPriceStart: { pc: '7,500만원 부터~', mobile: '7,500만원 부터~', useSame: true },
    overviewPriceDetail: { pc: '소형 ~ 대형평수 선택가능', mobile: '소형 ~ 대형평수 선택가능', useSame: true },
    officeName: { pc: '행복부동산 (분양사무실)', mobile: '행복부동산 (분양사무실)', useSame: true },
    officeAddress: { pc: '경기도 연천군 전곡역로 67, 1층 행복부동산', mobile: '경기도 연천군 전곡역로 67,\n1층 행복부동산', useSame: false },
    
    mapHeadline: { pc: 'INTERACTIVE CADASTRAL MAP', mobile: 'INTERACTIVE CADASTRAL MAP', useSame: true },
    mapTitle: { pc: '분양 현황 및 필지 안내', mobile: '분양 현황 및 필지 안내', useSame: true },
    mapDescription: { pc: '원하시는 필지 번호(핀)를 클릭하시면 실시간 분양 상태, 전용면적, 추천 주택형 및 분양가를 바로 확인하실 수 있습니다.\n※ 붉은색 마커는 이미 계약 체결된 필지이며, 노란색 마커는 즉시 계약 가능한 필지입니다.', mobile: '원하시는 필지 번호(핀)를 클릭하시면 실시간 분양 상태, 전용면적, 추천 주택형 및 분양가를 바로 확인하실 수 있습니다.\n※ 붉은색 마커는 이미 계약 체결된 필지이며, 노란색 마커는 즉시 계약 가능한 필지입니다.', useSame: true },
    
    reservationTitle: { pc: '현장방문 예약 및 상담', mobile: '현장방문 예약 및 상담', useSame: true },
    reservationDescription: { pc: '전화 및 온라인 예약으로 연락 주시면 실시간 필지 현황과 방문 일정을 즉시 안내해 드립니다.', mobile: '전화 및 온라인 예약으로 연락 주시면 실시간 필지 현황과\n방문 일정을 즉시 안내해 드립니다.', useSame: false },
    reservationNotes: { pc: '상담 가능 시간: 연중무휴', mobile: '상담 가능 시간: 연중무휴', useSame: true },
    
    siteAddressTitle: { pc: '현장 위치 (홍보관)', mobile: '현장 위치 (홍보관)', useSame: true },
    siteAddressText: { pc: '경기도 연천군 장탄리 847-21', mobile: '경기도 연천군 장탄리 847-21', useSame: true },
    siteAddressDesc: { pc: '전곡역 차량 5분 · 한탄강 조망', mobile: '전곡역 차량 5분 · 한탄강 조망', useSame: true },
    officeAddressTitle: { pc: '분양 사무실', mobile: '분양 사무실', useSame: true },
    officeAddressText: { pc: '경기도 연천군 전곡역로 67, 1층', mobile: '경기도 연천군 전곡역로 67, 1층', useSame: true },
    officeAddressDesc: { pc: '전곡역 1번 출구 앞', mobile: '전곡역 1번 출구 앞', useSame: true },
    
    specialValue1Title: { pc: '개발행위 완료 · 허가 완료', mobile: '개발행위 완료 · 허가 완료', useSame: true },
    specialValue1Desc: { pc: '토목허가, 건축허가, 상·하수도 및 도로포장까지 모두 완료되어 복잡한 행정절차 없이 바로 건축을 시작할 수 있습니다.', mobile: '토목허가, 건축허가, 상·하수도 및 도로포장까지 모두 완료되어 복잡한 행정절차 없이 바로 건축을 시작할 수 있습니다.', useSame: true },
    specialValue2Title: { pc: '전용부담금 납부 완료', mobile: '전용부담금 납부 완료', useSame: true },
    specialValue2Desc: { pc: '전용부담금까지 납부가 완료되어, 추가 부담 없이 토지를 취득하고 집을 지을 수 있는 준비된 상태입니다.', mobile: '전용부담금까지 납부가 완료되어, 추가 부담 없이 토지를 취득하고 집을 지을 수 있는 준비된 상태입니다.', useSame: true },
    specialValue3Title: { pc: '10미터의 넓은 진입도로', mobile: '10미터의 넓은 진입도로', useSame: true },
    specialValue3Desc: { pc: '넓은 진입도로가 확보되어 차량 이동과 자재 반입이 편리하고, 대형 차량도 부담 없이 진입할 수 있습니다.', mobile: '넓은 진입도로가 확보되어 차량 이동과 자재 반입이 편리하고, 대형 차량도 부담 없이 진입할 수 있습니다.', useSame: true },
    specialValue4Title: { pc: '주택수에 포함되지 않는 전원주택지', mobile: '주택수에 포함되지 않는 전원주택지', useSame: true },
    specialValue4Desc: { pc: '전원주택지로 분류되어 기존 주택수에 포함되지 않아, 자산 관리와 취득에 부담이 없는 자유로운 선택이 가능합니다.', mobile: '전원주택지로 분류되어 기존 주택수에 포함되지 않아, 자산 관리와 취득에 부담이 없는 자유로운 선택이 가능합니다.', useSame: true },
    
    locationTitle: { pc: '입지 프리미엄', mobile: '입지 프리미엄', useSame: true },
    locationDescription: { pc: '1호선 전곡역(연천 연장선)과 3번 국도 우회도로 개통으로 서울 및 수도권 북부에서 1시간 이내에 쾌속 진입이 가능합니다.', mobile: '1호선 전곡역(연천 연장선)과 3번 국도 우회도로 개통으로 서울 및 수도권 북부에서 1시간 이내에 쾌속 진입이 가능합니다.', useSame: true }
  },
  heroQuickPills: [
  {
    "id": "pill-1",
    "num": "01",
    "title": {
      "pc": "개발행위 완료",
      "mobile": "개발행위 완료",
      "useSame": true
    },
    "desc": {
      "pc": "허가·상하수도까지 완료",
      "mobile": "허가·상하수도까지 완료",
      "useSame": true
    }
  },
  {
    "id": "pill-2",
    "num": "02",
    "title": {
      "pc": "전용부담금 납부 완료",
      "mobile": "전용부담금 납부 완료",
      "useSame": true
    },
    "desc": {
      "pc": "바로 집지을수 있는 대지",
      "mobile": "바로 집지을수 있는 대지",
      "useSame": true
    }
  },
  {
    "id": "pill-3",
    "num": "03",
    "title": {
      "pc": "주택수 미포함",
      "mobile": "주택수 미포함",
      "useSame": true
    },
    "desc": {
      "pc": "부담 없는 취득",
      "mobile": "부담 없는 취득",
      "useSame": true
    }
  },
  {
    "id": "pill-1790001205297",
    "num": "04",
    "title": {
      "pc": "10m 진입도로",
      "mobile": "10m 진입도로",
      "useSame": true
    },
    "desc": {
      "pc": "넓은 진입도로 확보",
      "mobile": "넓은 진입도로 확보",
      "useSame": true
    }
  }
],
  badgeStyle: {
  "fontSize": "",
  "fontWeight": "font-bold"
},
  theme: {
    primaryColor: '#00593B', // Natural emerald green as shown in header button
    accentGold: '#EAB308', // Warm golden yellow as shown in headline highlights and CTAs
    darkBg: '#0B0B0F', // Dark canvas
    cardBg: '#13121D', // Card dark tone
  },
  seo: {
    metaTitle: '골든포레스트 - 한탄강 전원주택지 29필지 분양',
    metaDescription: '전곡역 차량 5분, 한탄강 조망 스물아홉 필지 전원주택지. 토지가격 7,500만원부터. 개발행위 완료, 10m 도로 확보.',
    metaKeywords: '한탄강전원주택, 골든포레스트, 전곡역전원주택, 연천전원주택지, 토지분양, 29필지',
    ogImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    companyName: '골든포레스트 분양사업부',
    representative: '분양 총괄 본부',
    businessNumber: '214-88-01923',
    address: '경기도 연천군 장탄리 847-21 현장 홍보관',
    consultationHours: '연중무휴',
    copyright: '© 2026 골든포레스트 한탄강 전원주택지. All rights reserved.',
  },
};

export const INITIAL_RESERVATIONS: VisitReservation[] = [
  {
    id: 'res-1',
    name: '이정우',
    phone: '010-3491-9921',
    visitDate: '2026-09-18',
    visitTime: '14:00',
    interestedParcel: '847-21임 (120평)',
    preferredSize: '120평 내외',
    notes: '주말 세컨하우스 건축 목적, 조망 확인 희망',
    createdAt: '2026-09-14 11:20',
    status: 'pending',
  },
  {
    id: 'res-2',
    name: '한미영',
    phone: '010-8210-4412',
    visitDate: '2026-09-19',
    visitTime: '11:00',
    interestedParcel: '847-1임 (112평)',
    preferredSize: '소형 (100~120평)',
    notes: '남편과 함께 차량으로 방문 예정',
    createdAt: '2026-09-13 16:45',
    status: 'confirmed',
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    action: '현장방문 예약 접수',
    target: '이정우 고객님 (847-21임 관심)',
    timestamp: '15분 전',
    type: 'create',
  },
  {
    id: 'log-2',
    action: '필지 상태 업데이트',
    target: '847-16임 필지 [상담진행중]으로 변경',
    timestamp: '2시간 전',
    type: 'update',
  },
  {
    id: 'log-3',
    action: '분양 홍보 텍스트 동기화',
    target: '토지가격 7,500만원부터 및 10m 진입도로 문구 적용',
    timestamp: '1일 전',
    type: 'settings',
  },
];
