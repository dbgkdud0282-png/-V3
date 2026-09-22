import type React from 'react';

export type ParcelStatus = 'available' | 'consulting' | 'completed';

export interface Parcel {
  id: string;
  number: string; // e.g., '847-21임'
  lotNumber: number; // 1 ~ 26
  lotNumberText: string; // '①', '②', ... '㉖'
  exclusiveAreaM2: number; // 전용면적 ㎡ (e.g. 500)
  exclusiveAreaPyeong: number; // 전용면적 평 (e.g. 151.25)
  totalAreaM2: number; // 합계 ㎡ (e.g. 600.0)
  totalAreaPyeong: number; // 합계 평 (e.g. 181.50)
  areaPyeong: number; // e.g. 181.5 (합계 기준)
  areaM2: number; // e.g. 600.0 (합계 기준)
  additionalLots?: string; // 추가 지번 (e.g. '847-42')
  orientation: '남향' | '남서향' | '동남향';
  status: ParcelStatus;
  isStarredSoldOut: boolean; // 도면상 별표시(★) 분양완료 여부
  priceMillionWon: number; // e.g. 7500 (7,500만원)
  features: string[];
  recommendedHouse: string;
}

export interface VisitReservation {
  id: string;
  name: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  interestedParcel?: string;
  preferredSize: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface SpecialValue {
  id: string;
  index: string; // '01', '02', '03', '04'
  title: string;
  description: string | React.ReactNode;
  image: string;
}

export interface LocationPoint {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface LocationCard {
  id: string;
  category: string;
  title: CustomTextItem;
  description: CustomTextItem;
}

export interface ProjectOverview {
  location: string;
  locationDetail: string;
  parcelsSummary: string;
  parcelsDetail: string;
  priceStart: string;
  priceDetail: string;
  phone: string;
}

export interface MapMarkerConfig {
  enableAnimation: boolean;
  animationType: 'float' | 'pulse' | 'glow' | 'bounce';
  animationSpeed: 'slow' | 'normal' | 'fast';
  fontSizeSingle: number;
  fontSizeDouble: number;
  fontWeight: '700' | '800' | '900';
  markerScale: number;
  markerOpacity: number;
  showCompletedBadge: boolean;
  availableFillColor: string;
  availableTextColor: string;
  availableBorderColor: string;
  completedFillColor: string;
  completedTextColor: string;
  completedBorderColor: string;
}

export interface SectionContentConfig {
  heroNoticeText: string;
  overviewNoticeText: string;
  mapNoticeText: string;
  reservationNoticeText: string;
  specialValuesNoticeText: string;
  locationNoticeText: string;
}

export interface HeroPillStyleConfig {
  titleFontSize: string;
  titleFontWeight: string;
  descFontSize: string;
  descFontWeight: string;
}

export interface CustomTextItem {
  pc: string;
  mobile: string;
  useSame: boolean;
  pcSize?: string;
  mobileSize?: string;
  pcWeight?: string;
  mobileWeight?: string;
}

export interface TextCustomizerConfig {
  heroBadge: CustomTextItem;
  heroTitleLine1: CustomTextItem;
  heroTitleHighlight: CustomTextItem;
  heroTitleLine2: CustomTextItem;
  heroDescription1: CustomTextItem;
  heroDescription2: CustomTextItem;
  
  heroPills: HeroPill[];
  
  overviewLocation: CustomTextItem;
  overviewLocationDetail: CustomTextItem;
  overviewParcelsSummary: CustomTextItem;
  overviewParcelsDetail: CustomTextItem;
  overviewPriceStart: CustomTextItem;
  overviewPriceDetail: CustomTextItem;
  officeName: CustomTextItem;
  officeAddress: CustomTextItem;
  
  mapHeadline: CustomTextItem;
  mapTitle: CustomTextItem;
  mapDescription: CustomTextItem;
  
  reservationTitle: CustomTextItem;
  reservationDescription: CustomTextItem;
  reservationNotes: CustomTextItem;
  
  siteAddressTitle: CustomTextItem;
  siteAddressText: CustomTextItem;
  siteAddressDesc: CustomTextItem;
  officeAddressTitle: CustomTextItem;
  officeAddressText: CustomTextItem;
  officeAddressDesc: CustomTextItem;
  
  specialValue1Title: CustomTextItem;
  specialValue1Desc: CustomTextItem;
  specialValue2Title: CustomTextItem;
  specialValue2Desc: CustomTextItem;
  specialValue3Title: CustomTextItem;
  specialValue3Desc: CustomTextItem;
  specialValue4Title: CustomTextItem;
  specialValue4Desc: CustomTextItem;
  
  locationTitle: CustomTextItem;
  locationDescription: CustomTextItem;
}

export interface HeroPill {
  id: string;
  num: string;
  title: CustomTextItem;
  desc: CustomTextItem;
}

export interface SiteConfig {
  brandName: string;
  subBrandName: string;
  phone: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroPriceHighlight: string;
  heroDescription1: string;
  heroDescription2: string;
  heroPills: HeroPill[];
  heroQuickPills?: HeroPill[];
  heroPillStyle?: HeroPillStyleConfig;
  overview: ProjectOverview;
  specialValues: SpecialValue[];
  locationPoints: LocationPoint[];
  locationCards?: LocationCard[];
  topLocationCards?: LocationCard[];
  mapMarker?: MapMarkerConfig;
  badgeStyle?: { fontSize: string; fontWeight: string };
  sectionContent?: SectionContentConfig;
  textCustomizer?: TextCustomizerConfig;
  theme: {
    primaryColor: string; // #00593B or #8B5CF6 or #EAB308
    accentGold: string; // #F59E0B
    darkBg: string;
    cardBg: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImageUrl: string;
  };
  footer: {
    companyName: string;
    representative: string;
    businessNumber: string;
    address: string;
    consultationHours: string;
    copyright: string;
  };
}

export interface ActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'settings';
}
