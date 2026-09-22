import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CONFIG } from '../data/initialData';
import {
  FileCheck,
  Compass,
  Home,
  Calendar,
  ArrowDown,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { config, openReservationModal, getCustomText, getCustomTextStyle, isMobile } = useApp();

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentBadge = getCustomText('heroBadge', config.heroBadge);
  const currentTitleLine1 = getCustomText('heroTitleLine1', config.heroTitleLine1);
  const currentTitleHighlight = getCustomText('heroTitleHighlight', config.heroTitleHighlight);
  const currentTitleLine2 = getCustomText('heroTitleLine2', config.heroTitleLine2);
  const currentDesc1 = getCustomText('heroDescription1', config.heroDescription1);
  const currentDesc2 = getCustomText('heroDescription2', config.heroDescription2);
  const currentLoc = getCustomText('overviewLocation', config.overview.location);
  const currentPriceStart = getCustomText('overviewPriceStart', config.overview.priceStart);
  // Ensure '토지가격' prefix is not duplicated if already included in the text
  const cleanPriceStart = currentPriceStart.replace(/^토지가격\s*/, '');

  // Dynamic Styles
  const badgeStyle = getCustomTextStyle('heroBadge', 'text-sm', 'text-xs', 'font-semibold', 'font-semibold');
  const title1Style = getCustomTextStyle('heroTitleLine1', 'text-5xl', 'text-3xl', 'font-black', 'font-black');
  const highlightStyle = getCustomTextStyle('heroTitleHighlight', 'text-5xl', 'text-3xl', 'font-black', 'font-black');
  const title2Style = getCustomTextStyle('heroTitleLine2', 'text-5xl', 'text-3xl', 'font-black', 'font-black');
  const desc1Style = getCustomTextStyle('heroDescription1', 'text-base', 'text-sm', 'font-normal', 'font-normal');
  const desc2Style = getCustomTextStyle('heroDescription2', 'text-base', 'text-sm', 'font-semibold', 'font-semibold');

  // Key Feature Translucent Cards Custom Texts & Styles
  const pillStyle = config.heroPillStyle || {
    titleFontSize: 'text-base',
    titleFontWeight: 'font-extrabold',
    descFontSize: 'text-xs',
    descFontWeight: 'font-normal',
  };

  const displayPills = (config.heroPills && config.heroPills.length >= 4)
    ? config.heroPills
    : (INITIAL_CONFIG.heroPills || INITIAL_CONFIG.textCustomizer?.heroPills || []);

  const pillsData = displayPills.map((pill, idx) => {
    const num = pill.num || String(idx + 1).padStart(2, '0');
    
    const title = typeof pill.title === 'string'
      ? pill.title
      : (pill.title?.useSame ? pill.title?.pc : (isMobile ? (pill.title?.mobile || pill.title?.pc) : pill.title?.pc)) || '';
    const desc = typeof pill.desc === 'string'
      ? pill.desc
      : (pill.desc?.useSame ? pill.desc?.pc : (isMobile ? (pill.desc?.mobile || pill.desc?.pc) : pill.desc?.pc)) || '';
    
    const titleStyle = `${pillStyle.titleFontSize || 'text-base sm:text-lg'} ${pillStyle.titleFontWeight || 'font-extrabold'}`;
    const descStyle = `${pillStyle.descFontSize || 'text-xs sm:text-sm'} ${pillStyle.descFontWeight || 'font-normal'}`;

    return { id: pill.id, num, title, desc, titleStyle, descStyle };
  });

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0B0B0F]">
      {/* Background Image with Dramatic Sunset / River Valley Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/assets/real/hero_hantan_view_1789389135058.jpg')`,
        }}
      >
        {/* Cinematic dark gradients to match Screenshot #3 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#0B0B0F]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/80" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center flex flex-col items-center">
        {/* Mobile-only prominent address */}
        <div className="sm:hidden mb-3 animate-fade-in">
          <span className="text-amber-400 font-black text-sm tracking-tight bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 whitespace-pre-line">
            {currentLoc}
          </span>
        </div>

        {/* Top Sub-badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 tracking-wider mb-6 ${badgeStyle.className}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="whitespace-pre-line">{currentBadge}</span>
          <span className="hidden sm:inline-block text-white/40">|</span>
          <span className="text-amber-300 font-bold hidden sm:inline-block whitespace-pre-line">{currentLoc}</span>
        </div>

        {/* Main Headline */}
        <h1 className="leading-tight sm:leading-tight tracking-tight mb-4 drop-shadow-lg whitespace-pre-line">
          <span className={`text-white ${title1Style.className}`}>{currentTitleLine1}</span>
          <br />
          <span className={`text-amber-400 ${highlightStyle.className}`}>{currentTitleHighlight}</span>{' '}
          <span className={`text-white ${title2Style.className}`}>{currentTitleLine2}</span>
        </h1>

        {/* Land Price Tagline */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6">
          토지가격 <span className="text-amber-400 underline decoration-amber-400/40 decoration-4 underline-offset-8 whitespace-pre-line">{cleanPriceStart}</span>
        </div>

        {/* Supporting Descriptions */}
        <p className="text-slate-200 max-w-2xl mx-auto leading-relaxed mb-4 drop-shadow whitespace-pre-line">
          <span className={`block sm:inline ${desc1Style.className}`}>{currentDesc1}</span>
          <br className="hidden sm:inline" />
          <span className={`block sm:inline text-white ${desc2Style.className}`}> {currentDesc2}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
          <button
            onClick={() => openReservationModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-slate-950" />
            <span>현장방문 예약하기</span>
          </button>

          <button
            onClick={() => scrollToSection('parcels-section')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#121218]/80 hover:bg-[#1C1C24] text-white border border-white/20 font-bold text-base sm:text-lg backdrop-blur-md transition-colors cursor-pointer"
          >
            분양 현황 보기
          </button>
        </div>

        {/* 3 Key Feature Translucent Cards (01, 02, 03) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
          {pillsData.map((pill) => (
            <div
              key={pill.id}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/40 transition-all group"
            >
              <span className="text-xs font-black text-amber-400 tracking-wider block mb-1">
                {pill.num}
              </span>
              <h3 className={`${pill.titleStyle} text-white mb-1 group-hover:text-amber-300 transition-colors whitespace-pre-line break-words leading-snug`}>
                {pill.title}
              </h3>
              <p className={`${pill.descStyle} text-slate-300 whitespace-pre-line break-words leading-relaxed`}>
                {pill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 pb-6 text-center">
        <button
          onClick={() => {
            const isPc = window.innerWidth >= 768;
            if (isPc) {
              // PC 버전: 기존 동작(overview-section) 100% 그대로 유지
              scrollToSection('overview-section');
            } else {
              // 모바일 화면: 바로 아래 위치한 현장 사진 슬라이더 영역으로 헤더 오프셋을 고려하여 부드럽게 스크롤
              const target = document.getElementById('mobile-photo-slider');
              if (target) {
                const rect = target.getBoundingClientRect();
                const headerOffset = 80; // 상단 헤더 높이
                const targetScrollTop = window.pageYOffset + rect.top - headerOffset;
                window.scrollTo({
                  top: Math.max(0, targetScrollTop),
                  behavior: 'smooth',
                });
              } else {
                scrollToSection('parcels-section');
              }
            }
          }}
          className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold tracking-widest uppercase"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
