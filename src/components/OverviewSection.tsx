import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Grid, CircleDollarSign, Copy, Check, ExternalLink, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

const pcSitePhotos = [
  { id: 1, src: '/assets/real/site_photo_1.png', label: '현장 사진 1' },
  { id: 2, src: '/assets/real/site_photo_2.png', label: '현장 사진 2' },
  { id: 3, src: '/assets/real/site_photo_3.png', label: '현장 사진 3' },
];

export const OverviewPhotoSlider: React.FC = () => {
  // Seamless Infinite Carousel States
  const totalRealSlides = pcSitePhotos.length;

  // Extended slides with virtual clones at both ends:
  // [Slide 3 clone, Slide 1 real, Slide 2 real, Slide 3 real, Slide 1 clone]
  const extendedSlides = useMemo(() => {
    return [
      { ...pcSitePhotos[totalRealSlides - 1], virtualKey: 'clone-start' },
      ...pcSitePhotos.map((p, idx) => ({ ...p, virtualKey: `real-${idx}` })),
      { ...pcSitePhotos[0], virtualKey: 'clone-end' },
    ];
  }, [totalRealSlides]);

  // Track position in extended slides (1 to totalRealSlides are real items)
  const [trackIndex, setTrackIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimatingRef = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Always reset slider to 1st slide (1번 현장 사진) on mount
  useEffect(() => {
    setWithTransition(false);
    setTrackIndex(1);
    isAnimatingRef.current = false;
  }, []);

  // Reset slider to 1st slide when scrolled into view
  useEffect(() => {
    const node = sliderContainerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWithTransition(false);
            setTrackIndex(1);
            isAnimatingRef.current = false;
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Touch gesture tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Compute active real slide index (0, 1, 2) synchronously with slide movement
  const currentRealIndex = useMemo(() => {
    if (trackIndex === 0) return totalRealSlides - 1; // Clone of Slide 3 -> represents real index 2
    if (trackIndex === totalRealSlides + 1) return 0; // Clone of Slide 1 -> represents real index 0
    return trackIndex - 1;
  }, [trackIndex, totalRealSlides]);

  // Handle slide step forward (Next)
  const handleNextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  // Handle slide step backward (Prev)
  const handlePrevSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  // Handle direct dot indicator clicks
  const handleDotClick = useCallback((targetRealIndex: number) => {
    if (isAnimatingRef.current) return;
    const targetTrackIndex = targetRealIndex + 1;
    if (targetTrackIndex === trackIndex) return;

    isAnimatingRef.current = true;
    setWithTransition(true);
    setTrackIndex(targetTrackIndex);
  }, [trackIndex]);

  // TransitionEnd Handler: Silently teleport between clones and real slides with transition disabled
  const handleTransitionEnd = useCallback(() => {
    if (trackIndex === totalRealSlides + 1) {
      // Reached the right clone (Slide 1 clone). Instantly snap back to real Slide 1 without transition
      setWithTransition(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      // Reached the left clone (Slide 3 clone). Instantly snap back to real Slide 3 without transition
      setWithTransition(false);
      setTrackIndex(totalRealSlides);
    }
    isAnimatingRef.current = false;
  }, [trackIndex, totalRealSlides]);

  // Watchdog timer to prevent stuck animation state in case transitionend event is missed
  useEffect(() => {
    if (trackIndex === 0 || trackIndex === totalRealSlides + 1) {
      const timer = setTimeout(() => {
        handleTransitionEnd();
      }, 520);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 480);
      return () => clearTimeout(timer);
    }
  }, [trackIndex, handleTransitionEnd, totalRealSlides]);

  // Autoplay Timer (3.6s interval, paused on hover or touch)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 3600);
    return () => clearInterval(timer);
  }, [isHovered, handleNextSlide]);

  // Touch handlers for mobile/tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    if (touchDeltaXRef.current < -40) {
      handleNextSlide();
    } else if (touchDeltaXRef.current > 40) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsHovered(false);
  };

  return (
    <div
      ref={sliderContainerRef}
      className="relative w-full rounded-none md:rounded-3xl bg-transparent md:bg-white border-0 md:border md:border-gray-200 shadow-none md:shadow-sm md:hover:shadow-md transition-shadow overflow-hidden group select-none md:max-w-5xl md:mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image Track with smooth horizontal glide (450ms ease-out) */}
      <div className="relative h-[260px] sm:h-[380px] md:h-[480px] xl:h-[540px] w-full overflow-hidden bg-transparent md:bg-white">
        {/* Horizontal sliding track with seamless clone looping */}
        <div
          className="flex w-full h-full"
          style={{
            transform: `translateX(-${trackIndex * 100}%)`,
            transition: withTransition
              ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((photo, index) => (
            <div
              key={`${photo.virtualKey}-${index}`}
              className="w-full h-full flex-shrink-0 flex items-center justify-center p-0 md:p-6 lg:p-8 select-none"
            >
              {/* Main Full-Bleed Image on Mobile / Sharp Contained Image on PC */}
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover rounded-none border-0 shadow-none md:max-h-full md:max-w-full md:w-auto md:h-auto md:object-contain md:object-center md:rounded-2xl md:shadow-md md:border md:border-slate-100 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="이전 사진"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 border border-slate-200/90"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="다음 사진"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 border border-slate-200/90"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </button>

        {/* Bottom Info Bar Overlay (Label + Dots + Index) */}
        <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-30 px-4 sm:px-8 flex items-center justify-between pointer-events-auto">
          {/* Active Photo Label & Index - Synchronized instantly with slide motion */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all">
              {pcSitePhotos[currentRealIndex].label}
            </span>
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 border border-slate-200/90 text-slate-700 text-[11px] sm:text-xs font-bold shadow-sm">
              {currentRealIndex + 1} / {totalRealSlides}
            </span>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-sm">
            {pcSitePhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleDotClick(index)}
                aria-label={`${photo.label} 보기`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentRealIndex
                    ? 'w-6 sm:w-8 bg-[#00593B] shadow-sm'
                    : 'w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OverviewSection: React.FC = () => {
  const { config, getCustomText, getCustomTextStyle } = useApp();
  const [copied, setCopied] = useState(false);
  const [officeCopied, setOfficeCopied] = useState(false);

  const currentLoc = getCustomText('overviewLocation', config.overview.location);
  const currentLocDetail = getCustomText('overviewLocationDetail', config.overview.locationDetail);
  const currentParcelsSummary = getCustomText('overviewParcelsSummary', config.overview.parcelsSummary);
  const currentParcelsDetail = getCustomText('overviewParcelsDetail', config.overview.parcelsDetail);
  const currentPriceStart = getCustomText('overviewPriceStart', config.overview.priceStart);
  const currentPriceDetail = getCustomText('overviewPriceDetail', config.overview.priceDetail);
  const currentOfficeName = getCustomText('officeName', '행복부동산 (분양사무실)');
  const currentOfficeAddr = getCustomText('officeAddress', '경기도 연천군 전곡역로 67, 1층 행복부동산');
  const currentHeroBadge = getCustomText('heroBadge', config.heroBadge);

  const locStyle = getCustomTextStyle('overviewLocation', 'text-lg', 'text-base', 'font-black', 'font-black');
  const locDetailStyle = getCustomTextStyle('overviewLocationDetail', 'text-sm', 'text-xs', 'font-normal', 'font-normal');
  const parcelsSummaryStyle = getCustomTextStyle('overviewParcelsSummary', 'text-lg', 'text-base', 'font-black', 'font-black');
  const parcelsDetailStyle = getCustomTextStyle('overviewParcelsDetail', 'text-sm', 'text-xs', 'font-normal', 'font-normal');
  const priceStartStyle = getCustomTextStyle('overviewPriceStart', 'text-lg', 'text-base', 'font-black', 'font-black');
  const priceDetailStyle = getCustomTextStyle('overviewPriceDetail', 'text-sm', 'text-xs', 'font-normal', 'font-normal');
  const officeNameStyle = getCustomTextStyle('officeName', 'text-base', 'text-sm', 'font-black', 'font-black');
  const officeAddrStyle = getCustomTextStyle('officeAddress', 'text-sm', 'text-xs', 'font-normal', 'font-normal');

  const { isMobile } = useApp();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentLoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOfficeAddress = () => {
    navigator.clipboard.writeText(currentOfficeAddr.replace('\n', ' ').trim());
    setOfficeCopied(true);
    setTimeout(() => setOfficeCopied(false), 2000);
  };

  const cardsData = [
    {
      id: 'location',
      label: '대 지 위 치',
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      title: config.textCustomizer?.overviewLocation 
        ? (isMobile ? (config.textCustomizer.overviewLocation.useSame ? config.textCustomizer.overviewLocation.pc : config.textCustomizer.overviewLocation.mobile) : config.textCustomizer.overviewLocation.pc)
        : config.overview.location,
      mobileTitle: config.textCustomizer?.overviewLocation
        ? (config.textCustomizer.overviewLocation.useSame ? config.textCustomizer.overviewLocation.pc : config.textCustomizer.overviewLocation.mobile)
        : config.overview.location,
      titleSize: config.textCustomizer?.overviewLocation?.pcSize,
      mobileTitleSize: config.textCustomizer?.overviewLocation?.mobileSize,
      titleWeight: config.textCustomizer?.overviewLocation?.pcWeight,
      mobileTitleWeight: config.textCustomizer?.overviewLocation?.mobileWeight,

      desc: config.textCustomizer?.overviewLocationDetail
        ? (isMobile ? (config.textCustomizer.overviewLocationDetail.useSame ? config.textCustomizer.overviewLocationDetail.pc : config.textCustomizer.overviewLocationDetail.mobile) : config.textCustomizer.overviewLocationDetail.pc)
        : config.overview.locationDetail,
      mobileDesc: config.textCustomizer?.overviewLocationDetail
        ? (config.textCustomizer.overviewLocationDetail.useSame ? config.textCustomizer.overviewLocationDetail.pc : config.textCustomizer.overviewLocationDetail.mobile)
        : config.overview.locationDetail,
      descSize: config.textCustomizer?.overviewLocationDetail?.pcSize,
      mobileDescSize: config.textCustomizer?.overviewLocationDetail?.mobileSize,
      descWeight: config.textCustomizer?.overviewLocationDetail?.pcWeight,
      mobileDescWeight: config.textCustomizer?.overviewLocationDetail?.mobileWeight,
      className: "order-1 md:order-none",
      showButtons: true,
      onCopy: handleCopyAddress,
      isCopied: copied,
      mapUrl: `https://map.naver.com/v5/search/${encodeURIComponent(currentLoc)}`,
    },
    {
      id: 'office',
      label: '사무실 위치',
      icon: <Building2 className="w-5 h-5" />,
      title: config.textCustomizer?.officeName
        ? (isMobile ? (config.textCustomizer.officeName.useSame ? config.textCustomizer.officeName.pc : config.textCustomizer.officeName.mobile) : config.textCustomizer.officeName.pc)
        : '행복부동산 (분양사무실)',
      mobileTitle: config.textCustomizer?.officeName
        ? (config.textCustomizer.officeName.useSame ? config.textCustomizer.officeName.pc : config.textCustomizer.officeName.mobile)
        : '행복부동산 (분양사무실)',
      titleSize: config.textCustomizer?.officeName?.pcSize,
      mobileTitleSize: config.textCustomizer?.officeName?.mobileSize,
      titleWeight: config.textCustomizer?.officeName?.pcWeight,
      mobileTitleWeight: config.textCustomizer?.officeName?.mobileWeight,

      desc: config.textCustomizer?.officeAddress
        ? config.textCustomizer.officeAddress.pc
        : '경기도 연천군 전곡역로 67, 1층 행복부동산',
      mobileDesc: config.textCustomizer?.officeAddress
        ? (config.textCustomizer.officeAddress.useSame
            ? (config.textCustomizer.officeAddress.pc.includes('1층 행복부동산') && !config.textCustomizer.officeAddress.pc.includes('\n')
                ? config.textCustomizer.officeAddress.pc.replace('1층 행복부동산', '\n1층 행복부동산')
                : config.textCustomizer.officeAddress.pc)
            : (config.textCustomizer.officeAddress.mobile.includes('1층 행복부동산') && !config.textCustomizer.officeAddress.mobile.includes('\n')
                ? config.textCustomizer.officeAddress.mobile.replace('1층 행복부동산', '\n1층 행복부동산')
                : config.textCustomizer.officeAddress.mobile))
        : '경기도 연천군 전곡역로 67,\n1층 행복부동산',
      descSize: config.textCustomizer?.officeAddress?.pcSize,
      mobileDescSize: config.textCustomizer?.officeAddress?.mobileSize,
      descWeight: config.textCustomizer?.officeAddress?.pcWeight,
      mobileDescWeight: config.textCustomizer?.officeAddress?.mobileWeight,
      className: "order-2 md:hidden",
      showButtons: true,
      onCopy: handleCopyOfficeAddress,
      isCopied: officeCopied,
      mapUrl: `https://map.naver.com/v5/search/${encodeURIComponent(currentOfficeAddr.replace('\n', ' ').trim())}`,
    },
    {
      id: 'parcels',
      label: '필 지 구 성',
      icon: <Grid className="w-5 h-5 md:w-6 md:h-6" />,
      title: config.textCustomizer?.overviewParcelsSummary
        ? (isMobile ? (config.textCustomizer.overviewParcelsSummary.useSame ? config.textCustomizer.overviewParcelsSummary.pc : config.textCustomizer.overviewParcelsSummary.mobile) : config.textCustomizer.overviewParcelsSummary.pc)
        : config.overview.parcelsSummary,
      mobileTitle: config.textCustomizer?.overviewParcelsSummary
        ? (config.textCustomizer.overviewParcelsSummary.useSame ? config.textCustomizer.overviewParcelsSummary.pc : config.textCustomizer.overviewParcelsSummary.mobile)
        : config.overview.parcelsSummary,
      titleSize: config.textCustomizer?.overviewParcelsSummary?.pcSize,
      mobileTitleSize: config.textCustomizer?.overviewParcelsSummary?.mobileSize,
      titleWeight: config.textCustomizer?.overviewParcelsSummary?.pcWeight,
      mobileTitleWeight: config.textCustomizer?.overviewParcelsSummary?.mobileWeight,

      desc: config.textCustomizer?.overviewParcelsDetail
        ? (isMobile ? (config.textCustomizer.overviewParcelsDetail.useSame ? config.textCustomizer.overviewParcelsDetail.pc : config.textCustomizer.overviewParcelsDetail.mobile) : config.textCustomizer.overviewParcelsDetail.pc)
        : config.overview.parcelsDetail,
      mobileDesc: config.textCustomizer?.overviewParcelsDetail
        ? (config.textCustomizer.overviewParcelsDetail.useSame ? config.textCustomizer.overviewParcelsDetail.pc : config.textCustomizer.overviewParcelsDetail.mobile)
        : config.overview.parcelsDetail,
      descSize: config.textCustomizer?.overviewParcelsDetail?.pcSize,
      mobileDescSize: config.textCustomizer?.overviewParcelsDetail?.mobileSize,
      descWeight: config.textCustomizer?.overviewParcelsDetail?.pcWeight,
      mobileDescWeight: config.textCustomizer?.overviewParcelsDetail?.mobileWeight,
      className: "order-3 md:order-none",
      showButtons: false,
    },
    {
      id: 'price',
      label: '토 지 가 격',
      icon: <CircleDollarSign className="w-5 h-5 md:w-6 md:h-6" />,
      title: config.textCustomizer?.overviewPriceStart
        ? (isMobile ? (config.textCustomizer.overviewPriceStart.useSame ? config.textCustomizer.overviewPriceStart.pc : config.textCustomizer.overviewPriceStart.mobile) : config.textCustomizer.overviewPriceStart.pc)
        : config.overview.priceStart,
      mobileTitle: config.textCustomizer?.overviewPriceStart
        ? (config.textCustomizer.overviewPriceStart.useSame ? config.textCustomizer.overviewPriceStart.pc : config.textCustomizer.overviewPriceStart.mobile)
        : config.overview.priceStart,
      titleSize: config.textCustomizer?.overviewPriceStart?.pcSize,
      mobileTitleSize: config.textCustomizer?.overviewPriceStart?.mobileSize,
      titleWeight: config.textCustomizer?.overviewPriceStart?.pcWeight,
      mobileTitleWeight: config.textCustomizer?.overviewPriceStart?.mobileWeight,

      desc: config.textCustomizer?.overviewPriceDetail
        ? (isMobile ? (config.textCustomizer.overviewPriceDetail.useSame ? config.textCustomizer.overviewPriceDetail.pc : config.textCustomizer.overviewPriceDetail.mobile) : config.textCustomizer.overviewPriceDetail.pc)
        : config.overview.priceDetail,
      mobileDesc: config.textCustomizer?.overviewPriceDetail
        ? (config.textCustomizer.overviewPriceDetail.useSame ? config.textCustomizer.overviewPriceDetail.pc : config.textCustomizer.overviewPriceDetail.mobile)
        : config.overview.priceDetail,
      descSize: config.textCustomizer?.overviewPriceDetail?.pcSize,
      mobileDescSize: config.textCustomizer?.overviewPriceDetail?.mobileSize,
      descWeight: config.textCustomizer?.overviewPriceDetail?.pcWeight,
      mobileDescWeight: config.textCustomizer?.overviewPriceDetail?.mobileWeight,
      className: "order-4 md:order-none",
      showButtons: false,
      titleColorClass: "text-amber-600",
    }
  ];

  return (
    <section
      id="overview-section"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#00593B] block mb-2">
            OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            사업개요
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {currentHeroBadge}
          </p>
        </div>

        {/* Unified Responsive Section Container */}
        <div className="space-y-8 sm:space-y-10">
          {/* Top: Seamless Infinite Photo Slider (Visible inside OverviewSection on PC only) */}
          <div className="hidden md:block">
            <OverviewPhotoSlider />
          </div>

          {/* Bottom: Info Cards (Responsive Grid mapped dynamically) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {cardsData.map((item) => {
              return (
                <div 
                  key={item.id} 
                  className={`p-4 sm:p-5 md:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-row md:flex-col items-center text-left md:text-center gap-3.5 sm:gap-4 md:gap-0 ${item.className}`}
                >
                  {/* Card Label / Icon Header */}
                  <div className="flex flex-col items-center shrink-0 text-center pr-3.5 border-r border-slate-100 md:border-r-0 md:pr-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#00593B] flex items-center justify-center text-white mb-1 sm:mb-1.5 md:mb-6 shadow-md shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-800 tracking-wider whitespace-nowrap">
                      {item.label}
                    </h3>
                    <div className="hidden md:block w-8 h-0.5 bg-amber-400 mb-4 mt-2" />
                  </div>

                  {/* Card Main Texts */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center text-left md:items-center md:text-center overflow-hidden">
                    {/* 제목 */}
                    <h3 className={`${item.titleColorClass || 'text-slate-900'} ${isMobile ? (item.mobileTitleSize || item.titleSize || 'text-base') : (item.titleSize || 'text-xl')} ${isMobile ? (item.mobileTitleWeight || item.titleWeight) : item.titleWeight} whitespace-pre-line break-words leading-tight mb-0.5 md:mb-1`}>
                      {isMobile ? (item.mobileTitle || item.title) : item.title}
                    </h3>

                    {/* 설명 */}
                    <p className={`text-slate-500 ${isMobile ? (item.mobileDescSize || item.descSize || 'text-sm') : (item.descSize || 'text-base')} ${isMobile ? (item.mobileDescWeight || item.descWeight) : item.descWeight} whitespace-pre-line break-words leading-relaxed mb-2 md:mb-4`}>
                      {(() => {
                        const raw = isMobile ? (item.mobileDesc || item.desc) : item.desc;
                        if (item.id === 'office' && typeof raw === 'string' && raw.includes('1층 행복부동산') && !raw.includes('\n')) {
                          return (
                            <>
                              <span className="hidden md:inline">{raw}</span>
                              <span className="inline md:hidden">
                                {raw.replace(' 1층 행복부동산', '').replace(', 1층 행복부동산', ',')}
                                <br />
                                1층 행복부동산
                              </span>
                            </>
                          );
                        }
                        return raw;
                      })()}
                    </p>

                    {item.showButtons && (
                      <div className="flex items-center gap-1.5 sm:gap-2 md:mt-auto md:pt-2">
                        <button
                          type="button"
                          onClick={item.onCopy}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                          title="주소 복사"
                        >
                          {item.isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">복사됨</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>주소 복사</span>
                            </>
                          )}
                        </button>
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#00593B] text-xs font-bold transition-colors whitespace-nowrap"
                          title="네이버 지도에서 보기"
                        >
                          <span>지도보기</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PC Only: 분양사무실 위치 대형 카드 박스 (PC 전용으로 CMS 설정 반영) */}
          {(() => {
            const officeTitleItem = config.textCustomizer?.officeName;
            const officeDescItem = config.textCustomizer?.officeAddress;

            const officeTitleSize = officeTitleItem?.pcSize || 'text-xl';
            const officeTitleWeight = officeTitleItem?.pcWeight || 'font-black';
            const officeDescSize = officeDescItem?.pcSize || 'text-lg';
            const officeDescWeight = officeDescItem?.pcWeight || 'font-bold';

            return (
              <div className="hidden md:flex items-center justify-between p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#00593B] flex items-center justify-center text-white shadow-md shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 uppercase tracking-wider">
                        Office Location
                      </span>
                      <h3 className={`text-slate-800 tracking-tight ${officeTitleSize} ${officeTitleWeight}`}>
                        {currentOfficeName}
                      </h3>
                    </div>
                    <p className={`text-slate-900 whitespace-pre-line ${officeDescSize} ${officeDescWeight}`}>
                      {currentOfficeAddr}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyOfficeAddress}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all cursor-pointer shadow-sm"
                    title="주소 복사"
                  >
                    {officeCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-extrabold">복사 완료</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>주소 복사</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(currentOfficeAddr)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#00593B] text-sm font-extrabold transition-all shadow-sm border border-emerald-200/40"
                    title="네이버 지도에서 보기"
                  >
                    <span>네이버 지도보기</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
