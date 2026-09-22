import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LOCATION_CARDS, INITIAL_TOP_LOCATION_CARDS } from '../data/initialData';
import { CustomTextItem } from '../types';
import {
  Train,
  Droplets,
  Building2,
  GraduationCap,
  Sparkles,
  Home,
  Factory,
  MapPin,
} from 'lucide-react';

const TOP_CARD_THEMES = [
  {
    bg: 'bg-gradient-to-br from-[#121E33] to-[#0D1524]',
    border: 'border-blue-500/30 hover:border-blue-400/60',
    iconBg: 'bg-blue-500/20 text-blue-400',
    tagColor: 'text-blue-400',
    icon: Train,
  },
  {
    bg: 'bg-gradient-to-br from-[#231E12] to-[#17130B]',
    border: 'border-amber-500/30 hover:border-amber-400/60',
    iconBg: 'bg-amber-500/20 text-amber-400',
    tagColor: 'text-amber-400',
    icon: Home,
  },
  {
    bg: 'bg-gradient-to-br from-[#0F241C] to-[#0A1813]',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
    tagColor: 'text-emerald-400',
    icon: GraduationCap,
  },
  {
    bg: 'bg-gradient-to-br from-[#1E162B] to-[#140E1E]',
    border: 'border-purple-500/30 hover:border-purple-400/60',
    iconBg: 'bg-purple-500/20 text-purple-400',
    tagColor: 'text-purple-400',
    icon: Droplets,
  },
];

export const TopLocationCards: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { config, isMobile } = useApp();

  const topLocationCards = config.topLocationCards && config.topLocationCards.length > 0
    ? config.topLocationCards
    : INITIAL_TOP_LOCATION_CARDS;

  const getTextStyle = (
    item: CustomTextItem,
    defaultPcSize: string,
    defaultMobileSize: string,
    defaultPcWeight: string,
    defaultMobileWeight: string
  ) => {
    if (!item) return { text: '', className: `${defaultPcSize} ${defaultPcWeight}` };
    const text = isMobile ? (item.useSame ? item.pc : item.mobile) : item.pc;
    const size = isMobile
      ? (item.useSame ? (item.pcSize || defaultPcSize) : (item.mobileSize || defaultMobileSize))
      : (item.pcSize || defaultPcSize);
    const weight = isMobile
      ? (item.useSame ? (item.pcWeight || defaultPcWeight) : (item.mobileWeight || defaultMobileWeight))
      : (item.pcWeight || defaultPcWeight);
    return { text, className: `${size} ${weight}` };
  };

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {topLocationCards.map((card, idx) => {
        const theme = TOP_CARD_THEMES[idx % TOP_CARD_THEMES.length];
        const ThemeIcon = theme.icon;
        const titleInfo = getTextStyle(
          card.title,
          'text-sm sm:text-lg',
          'text-sm',
          'font-black',
          'font-black'
        );
        const descInfo = getTextStyle(
          card.description,
          'text-[11px] sm:text-xs',
          'text-[11px]',
          'font-normal',
          'font-normal'
        );

        return (
          <div
            key={card.id || `top-loc-${idx}`}
            className={`p-3.5 sm:p-5 rounded-2xl ${theme.bg} border ${theme.border} shadow-lg relative overflow-hidden group transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5">
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0`}>
                  <ThemeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className={`text-xs sm:text-sm font-black ${theme.tagColor} tracking-tight`}>
                  {card.category}
                </span>
              </div>
              <h4 className={`text-sm sm:text-lg font-black text-white mb-1.5 leading-snug ${titleInfo.className}`}>
                {titleInfo.text}
              </h4>
            </div>
            <p className={`text-[11px] sm:text-xs text-slate-300 leading-normal whitespace-pre-line ${descInfo.className}`}>
              {descInfo.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const LocationSection: React.FC = () => {
  const { config, getCustomText, getCustomTextStyle, isMobile } = useApp();

  const currentTitle = getCustomText('locationTitle', '입지 프리미엄');
  const currentDesc = getCustomText('locationDescription', '1호선 전곡역(연천 연장선)과 3번 국도 우회도로 개통으로 서울 및 수도권 북부에서 1시간 이내에 쾌속 진입이 가능합니다.');

  const titleStyle = getCustomTextStyle('locationTitle', 'text-4xl', 'text-3xl', 'font-black', 'font-black');
  const descStyle = getCustomTextStyle('locationDescription', 'text-base', 'text-sm', 'font-normal', 'font-normal');

  const locationCards = config.locationCards && config.locationCards.length > 0
    ? config.locationCards
    : INITIAL_LOCATION_CARDS;

  const CARD_THEMES = [
    {
      bg: 'bg-[#141824]',
      border: 'border-blue-500/25',
      iconBg: 'bg-blue-500/20 text-blue-400',
      tagBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      icon: Train,
    },
    {
      bg: 'bg-[#14221A]',
      border: 'border-emerald-500/25',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      tagBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      icon: Droplets,
    },
    {
      bg: 'bg-[#241E14]',
      border: 'border-amber-500/25',
      iconBg: 'bg-amber-500/20 text-amber-400',
      tagBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      icon: GraduationCap,
    },
    {
      bg: 'bg-[#1C1628]',
      border: 'border-purple-500/25',
      iconBg: 'bg-purple-500/20 text-purple-400',
      tagBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      icon: Droplets,
    },
  ];

  const getCardTextStyle = (
    item: CustomTextItem,
    defaultPcSize: string,
    defaultMobileSize: string,
    defaultPcWeight: string,
    defaultMobileWeight: string
  ) => {
    if (!item) return { text: '', className: `${defaultPcSize} ${defaultPcWeight}` };
    const text = isMobile ? (item.useSame ? item.pc : item.mobile) : item.pc;
    const size = isMobile
      ? (item.useSame ? (item.pcSize || defaultPcSize) : (item.mobileSize || defaultMobileSize))
      : (item.pcSize || defaultPcSize);
    const weight = isMobile
      ? (item.useSame ? (item.pcWeight || defaultPcWeight) : (item.mobileWeight || defaultMobileWeight))
      : (item.pcWeight || defaultPcWeight);
    return { text, className: `${size} ${weight}` };
  };

  return (
    <section
      id="location-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LOCATION PREMIUM</span>
          </div>
          <h2 className={`text-white tracking-tight mb-3 whitespace-pre-line ${titleStyle.className}`}>
            {currentTitle}
          </h2>
          <p className={`text-slate-300 max-w-2xl mx-auto leading-relaxed whitespace-pre-line ${descStyle.className}`}>
            {currentDesc}
          </p>
        </div>

        {/* Top 4 Core Highlight Banners (PC 화면은 그대로 유지, 모바일 화면에서는 현장 사진 Carousel 바로 아래로 이동) */}
        <div className="hidden md:block mb-10">
          <TopLocationCards />
        </div>

        {/* 2 Big Scenic Images (Jeongok Line 1 Station Real Photo & Hantan River Real View) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {/* Photo 1: 수도권 1호선 전곡역 신축 역사 실사 */}
          <div className="group relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl bg-slate-950 border border-white/10">
            <img
              src="/assets/real/jeongok_station_1789389158098.jpg"
              alt="수도권 1호선 전곡역(전곡리구석기) 신축 역사 실사"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-5 sm:p-7">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold mb-1.5 inline-flex items-center gap-1.5 shadow-md">
                  <Train className="w-3 h-3" />
                  수도권 1호선 직결
                </span>
                <h4 className="text-white text-lg sm:text-xl font-black mb-1">
                  전곡역(전곡리구석기) 차량 5분
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  동두천~연천 연장 개통으로 서울까지 환승 없이
                  <br />
                  한 번에 직결되는 쾌속 교통망
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2: 한탄강 조망 및 분양 필지 현장 실사 */}
          <div className="group relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl bg-slate-950 border border-white/10">
            <img
              src="/assets/real/hero_hantan_view_1789389135058.jpg"
              alt="한탄강 조망 전원주택지 토지분양 현장 실사"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-5 sm:p-7">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold mb-1.5 inline-flex items-center gap-1.5 shadow-md">
                  <Droplets className="w-3 h-3" />
                  한탄강 수변 조망권
                </span>
                <h4 className="text-white text-lg sm:text-xl font-black mb-1">
                  명품 숲세권 & 한탄강 조망
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  유네스코 한탄강 수변 파노라마 뷰와
                  <br />
                  전곡 도심 시티뷰를 동시에 품은 단지
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Location Cards Grid */}
        <div className="space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
              LOCATION PREMIUM CARDS
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              핵심 입지 인프라 특장점
            </h3>
          </div>

          {/* New Highway Expressway Image Card (서울~연천 고속도로 추진 중) */}
          <div className="relative w-full h-72 sm:h-96 md:h-[460px] lg:h-[500px] rounded-none overflow-hidden shadow-2xl bg-slate-950 border border-white/10 group mb-6 sm:mb-8 flex items-center justify-center">
            <img
              src="/고속.jpg"
              alt="서울~연천 고속도로 추진 중 노선도"
              className="w-full h-full object-contain rounded-none group-hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* 좌측 하단 태그, 제목, 상세 설명 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end p-5 sm:p-7 md:p-8 pointer-events-none">
              <div className="max-w-xl sm:max-w-2xl text-left">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5 shadow-md mb-2">
                  <MapPin className="w-3 h-3" />
                  교통망 확장
                </span>
                <h4 className="text-white text-xl sm:text-2xl md:text-3xl font-black mb-1.5 tracking-tight drop-shadow-md">
                  서울~연천 고속도로 추진 중
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed drop-shadow">
                  서울 및 수도권 주요 도시로 빠르게 연결되는 광역 고속도로망 확충
                </p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 ${locationCards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 sm:gap-6`}>
            {locationCards.map((card, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              const ThemeIcon = theme.icon;

              const titleInfo = getCardTextStyle(
                card.title,
                'text-base sm:text-lg',
                'text-base',
                'font-black',
                'font-black'
              );

              const descInfo = getCardTextStyle(
                card.description,
                'text-xs sm:text-sm',
                'text-xs',
                'font-normal',
                'font-normal'
              );

              return (
                <div
                  key={card.id || `loc-card-${idx}`}
                  className={`p-5 sm:p-6 rounded-3xl ${theme.bg} border ${theme.border} shadow-xl space-y-3.5 flex flex-col justify-between hover:border-amber-400/50 transition-all`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0`}>
                          <ThemeIcon className="w-4 h-4" />
                        </div>
                        <h4 className={`text-white whitespace-pre-line leading-snug ${titleInfo.className}`}>
                          {titleInfo.text}
                        </h4>
                      </div>
                      {card.category && (
                        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold shrink-0 ${theme.tagBg}`}>
                          {card.category}
                        </span>
                      )}
                    </div>

                    <p className={`text-slate-200 whitespace-pre-line leading-relaxed ${descInfo.className}`}>
                      {descInfo.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
