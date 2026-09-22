import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Parcel26Item,
} from '../data/parcels26Data';
import {
  Compass,
  Star,
  CheckCircle2,
  Maximize2,
  X,
  Phone,
  Calendar,
  Sparkles,
  Layers,
  Info,
} from 'lucide-react';

interface InteractiveParcelMapProps {
  onOpenReservationModal?: (parcelName?: string) => void;
}

export const InteractiveParcelMap: React.FC<InteractiveParcelMapProps> = ({
  onOpenReservationModal,
}) => {
  const { parcels26, openPhoneConsultModal, config } = useApp();
  const parcels = parcels26;
  const markerConfig = config.mapMarker || {
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

  const speedSec =
    markerConfig.animationSpeed === 'slow'
      ? '3.5s'
      : markerConfig.animationSpeed === 'fast'
      ? '1.2s'
      : '2.0s';

  const animationClassName = markerConfig.enableAnimation
    ? markerConfig.animationType === 'float'
      ? 'svg-marker-float'
      : markerConfig.animationType === 'pulse'
      ? 'svg-marker-pulse'
      : markerConfig.animationType === 'glow'
      ? 'svg-marker-glow'
      : markerConfig.animationType === 'bounce'
      ? 'svg-marker-bounce'
      : ''
    : '';

  const [selectedId, setSelectedId] = useState<number | null>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return 1;
    }
    return null;
  });
  const selectedParcel = selectedId !== null ? parcels.find((p) => p.id === selectedId) || null : null;
  const [isBubbleVisible, setIsBubbleVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return true;
    }
    return false;
  });
  const [hoveredParcel, setHoveredParcel] = useState<Parcel26Item | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'completed'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        if (selectedId === null && parcels.length > 0) {
          setSelectedId(parcels[0].id);
          setIsBubbleVisible(true);
        }
      } else {
        // Mobile (<1024px): strictly closed by default on initial load
        setSelectedId(null);
        setIsBubbleVisible(false);
      }
    }
  }, [parcels]);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const availableCount = parcels.filter((p) => p.status === '분양 가능').length;
  const completedCount = parcels.filter((p) => p.status === '분양 완료').length;

  const handleSelectParcel = (parcel: Parcel26Item) => {
    setSelectedId(parcel.id);
    setIsBubbleVisible(true);
  };

  // 1320 x 961 (1차반영.jpg) 기준 핀 위치 퍼센트 계산
  const getBubblePosition = (parcel: Parcel26Item) => {
    const xPct = (parcel.pin.x / 1320) * 100;
    const yPct = (parcel.pin.y / 961) * 100;
    const isBottomHalf = parcel.pin.y > 530;

    // 가로 클램핑: 말풍선이 지도 좌우 화면 밖으로 벗어나지 않도록 보정 (22% ~ 78% 사이)
    const clampedX = Math.max(22, Math.min(78, xPct));
    const tailOffset = xPct - clampedX;

    return {
      xPct,
      yPct,
      clampedX,
      tailOffset,
      isBottomHalf,
    };
  };

  const bubblePos = selectedParcel ? getBubblePosition(selectedParcel) : null;

  return (
    <div className="w-full space-y-6">
      {/* 1. 상단 컨트롤러 및 필터 바 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-none bg-[#13121F] border border-white/10 shadow-lg">
        {/* 필터 버튼 (PC에서는 '분양 완료' 바로 옆에 '소형평수 선택 가능' 배너가 나란히 배치됨) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-none transition-all cursor-pointer ${config.badgeStyle?.fontSize || 'text-sm md:text-base'} ${config.badgeStyle?.fontWeight || 'font-bold'} ${
              statusFilter === 'all'
                ? 'bg-[#00593B] text-white shadow-md'
                : 'bg-[#1D1C30] text-slate-200 hover:bg-[#2A2944]'
            }`}
          >
            전체 필지 ({parcels.length})
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-none transition-all cursor-pointer flex items-center gap-1.5 md:gap-2 ${config.badgeStyle?.fontSize || 'text-sm md:text-base'} ${config.badgeStyle?.fontWeight || 'font-bold'} ${
              statusFilter === 'available'
                ? 'bg-yellow-500 text-black shadow-md'
                : 'bg-[#1D1C30] text-yellow-300 hover:bg-[#2A2944]'
            }`}
          >
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 border border-yellow-200" />
            분양 가능 (노란색 {availableCount}개)
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-none transition-all cursor-pointer flex items-center gap-1.5 md:gap-2 ${config.badgeStyle?.fontSize || 'text-sm md:text-base'} ${config.badgeStyle?.fontWeight || 'font-bold'} ${
              statusFilter === 'completed'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-[#1D1C30] text-red-300 hover:bg-[#2A2944]'
            }`}
          >
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-600 border border-red-300" />
            분양 완료 (빨간색 {completedCount}개)
          </button>

          {/* PC(데스크톱: sm 이상) 전용: '분양 완료' 항목 바로 옆에 가로로 나란히 배치 */}
          <div className="hidden sm:flex items-center gap-2 text-sm md:text-base text-amber-300 font-bold bg-amber-500/15 px-3 py-1.5 md:px-4 md:py-2 rounded-none border border-amber-500/35">
            <span>✨ 1번~4번: 소형평수 선택 가능</span>
          </div>
        </div>

        {/* 모바일(sm 미만) 전용: 기존 모바일 위치와 구조 그대로 유지 */}
        <div className="flex sm:hidden items-center gap-2 text-sm md:text-base text-amber-300 font-bold bg-amber-500/15 px-3 py-1.5 md:px-4 md:py-2 rounded-none border border-amber-500/35">
          <span>✨ 1번~4번: 소형평수 선택 가능</span>
        </div>
      </div>

      {/* 2. 인터랙티브 배치도 영역: ★ 1차반영.jpg 배경 + 1~26번 핀 + 클릭 말풍선 ★ */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* 메인 배치도 컨테이너 (8 컬럼) */}
        <div className="lg:col-span-8 space-y-3">
          <div
            ref={mapContainerRef}
            className="relative w-full aspect-[1320/961] rounded-none overflow-hidden border border-white/15 bg-[#0B0B14] shadow-2xl group select-none touch-pan-y"
          >
            {/* ★ 핵심: 1차반영.jpg 이미지 전용 연결 ★ */}
            <img
              src="/assets/real/1차반영.jpg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/1차반영.jpg';
              }}
              alt="골든포레스트가든 번호지적도 (1차 분양 반영 1~26번 구획)"
              className="absolute inset-0 w-full h-full object-fill block rounded-none"
              draggable={false}
            />

            {/* 인터랙티브 SVG 오버레이 (1차반영.jpg 원본 해상도 1320 x 961 1:1 완벽 매칭) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1320 961"
              preserveAspectRatio="none"
            >
              <defs>
                {/* 활성 필지 글로우 필터 */}
                <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.9" />
                </filter>
                <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.9" />
                </filter>
                <style>{`
                  @keyframes svgMarkerFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-7px); }
                  }
                  @keyframes svgMarkerPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                  }
                  @keyframes svgMarkerGlow {
                    0%, 100% { filter: drop-shadow(0 0 2px rgba(255,255,255,0.4)); }
                    50% { filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.85)); }
                  }
                  @keyframes svgMarkerBounce {
                    0%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-9px); }
                    60% { transform: translateY(-4px); }
                  }
                  .svg-marker-float {
                    animation: svgMarkerFloat ${speedSec} ease-in-out infinite;
                  }
                  .svg-marker-pulse {
                    animation: svgMarkerPulse ${speedSec} ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                  }
                  .svg-marker-glow {
                    animation: svgMarkerGlow ${speedSec} ease-in-out infinite;
                  }
                  .svg-marker-bounce {
                    animation: svgMarkerBounce ${speedSec} ease-in-out infinite;
                  }
                `}</style>
              </defs>

              {/* 26개 각 구획 인터랙티브 폴리곤 및 원형 번호 인터랙티브 버튼 핀 (노란색 분양가능 / 빨간색 분양완료) */}
              {parcels.map((parcel) => {
                const isSelected = selectedParcel?.id === parcel.id && isBubbleVisible;
                const isHovered = hoveredParcel?.id === parcel.id;
                const isCompleted = parcel.status === '분양 완료';
                const isMatchFilter =
                  statusFilter === 'all' ||
                  (statusFilter === 'available' && !isCompleted) ||
                  (statusFilter === 'completed' && isCompleted);

                const filterOpacity = isMatchFilter ? 1 : 0.25;
                const basePinRadius = Math.max(parcel.pin.r || 40, 40);
                const pinRadius = basePinRadius * markerConfig.markerScale;
                const isSingleDigit = parcel.lotNumber < 10;
                const baseFontSize = isSingleDigit
                  ? markerConfig.fontSizeSingle
                  : markerConfig.fontSizeDouble;
                const numFontSize = `${baseFontSize * markerConfig.markerScale}px`;

                return (
                  <g
                    key={`parcel-${parcel.id}`}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleSelectParcel(parcel)}
                    onMouseEnter={() => setHoveredParcel(parcel)}
                    onMouseLeave={() => setHoveredParcel(null)}
                    style={{
                      opacity: filterOpacity * markerConfig.markerOpacity,
                    }}
                  >
                    {/* 정밀 1:1 클릭 감지용 투명 원형 히트영역 (어긋난 기존의 거대 폴리곤 대신 핀 중심 원형 영역으로 단일화하여 인접 필지 침범 및 클릭 꼬임 방지) */}
                    <circle
                      cx={parcel.pin.x}
                      cy={parcel.pin.y}
                      r={50 * markerConfig.markerScale}
                      fill="rgba(0,0,0,0.0001)"
                      stroke="none"
                      className="pointer-events-auto cursor-pointer"
                    />

                    {/* 호버 / 선택 시 번호 외곽 강조 링 */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={parcel.pin.x}
                        cy={parcel.pin.y}
                        r={pinRadius + 4 * markerConfig.markerScale}
                        fill={
                          isSelected
                            ? (isCompleted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(250, 204, 21, 0.25)')
                            : (isCompleted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(250, 204, 21, 0.15)')
                        }
                        stroke={
                          isSelected
                            ? (isCompleted ? '#F87171' : '#FEF08A')
                            : (isCompleted ? '#EF4444' : '#FACC15')
                        }
                        strokeWidth={isSelected ? 4 : 2.5}
                        className="transition-all duration-150"
                      />
                    )}

                    {/* ★ 핵심: 1차반영.jpg 상의 1~26번 핀 버튼 ★ */}
                    {isCompleted ? (
                      <g
                        className={`cursor-pointer ${animationClassName}`}
                        style={{
                          transformOrigin: `${parcel.pin.x}px ${parcel.pin.y}px`,
                        }}
                      >
                        {/* 1. 분양 완료 전용 원형 번호 버튼 */}
                        <circle
                          cx={parcel.pin.x}
                          cy={parcel.pin.y}
                          r={pinRadius}
                          fill={markerConfig.completedFillColor}
                          stroke={markerConfig.completedBorderColor}
                          strokeWidth={2.5 * markerConfig.markerScale}
                          filter="url(#badgeShadow)"
                        />
                        {/* 번호 텍스트 */}
                        <text
                          x={parcel.pin.x}
                          y={parcel.pin.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={markerConfig.completedTextColor}
                          fontSize={numFontSize}
                          fontWeight={markerConfig.fontWeight}
                          fontFamily="sans-serif"
                          className="select-none pointer-events-none"
                        >
                          {parcel.lotNumber}
                        </text>

                        {/* 2. 하단 알약 모양 '분양완료' 뱃지 */}
                        {markerConfig.showCompletedBadge && (
                          <g transform={`translate(${parcel.pin.x}, ${parcel.pin.y + 44 * markerConfig.markerScale})`}>
                            <rect
                              x={-53 * markerConfig.markerScale}
                              y={-18 * markerConfig.markerScale}
                              width={106 * markerConfig.markerScale}
                              height={36 * markerConfig.markerScale}
                              rx={18 * markerConfig.markerScale}
                              fill={markerConfig.completedFillColor}
                              stroke={markerConfig.completedBorderColor}
                              strokeWidth={2 * markerConfig.markerScale}
                              filter="url(#badgeShadow)"
                            />
                            <text
                              y={6.5 * markerConfig.markerScale}
                              textAnchor="middle"
                              fill={markerConfig.completedTextColor}
                              fontSize={`${19.5 * markerConfig.markerScale}px`}
                              fontWeight="900"
                              fontFamily="sans-serif"
                              letterSpacing="-0.5px"
                              className="select-none pointer-events-none"
                            >
                              분양완료
                            </text>
                          </g>
                        )}
                      </g>
                    ) : (
                      /* 분양 가능 필지: 골든 옐로우 원형 번호 버튼 */
                      <g
                        className={`cursor-pointer ${animationClassName}`}
                        style={{
                          transformOrigin: `${parcel.pin.x}px ${parcel.pin.y}px`,
                        }}
                      >
                        <circle
                          cx={parcel.pin.x}
                          cy={parcel.pin.y}
                          r={pinRadius}
                          fill={markerConfig.availableFillColor}
                          stroke={markerConfig.availableBorderColor}
                          strokeWidth={2.5 * markerConfig.markerScale}
                          filter="url(#badgeShadow)"
                        />
                        {/* 번호 텍스트 */}
                        <text
                          x={parcel.pin.x}
                          y={parcel.pin.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={markerConfig.availableTextColor}
                          fontSize={numFontSize}
                          fontWeight={markerConfig.fontWeight}
                          fontFamily="sans-serif"
                          className="select-none pointer-events-none"
                        >
                          {parcel.lotNumber}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 3. ★ 핵심: 필지 클릭 시 그 자리에서 바로 나타나는 말풍선(Speech Bubble) 상세 정보 ★ */}
            {selectedParcel && isBubbleVisible && bubblePos && (
              <div
                className="absolute z-30 pointer-events-auto transition-all duration-200 ease-out"
                style={{
                  left: `${bubblePos.clampedX}%`,
                  ...(bubblePos.isBottomHalf
                    ? {
                        // 하단 필지: 핀 위쪽으로 말풍선 표시 (빨간색 번호 원형 크기 반영)
                        bottom: `calc(${100 - bubblePos.yPct}% + 42px)`,
                        transform: 'translateX(-50%)',
                      }
                    : {
                        // 상단 필지: 핀 아래쪽으로 말풍선 표시 (빨간색 번호 원형 크기 반영)
                        top: `calc(${bubblePos.yPct}% + 42px)`,
                        transform: 'translateX(-50%)',
                      }),
                }}
              >
                {/* 말풍선 본체 카드: 모바일에서는 너비/폰트/패딩을 한 단계 작고 컴팩트하게 축소하여 화면 잘림 완전 방지, PC(sm:)는 기존 스타일 100% 보존 */}
                <div className="relative w-52 sm:w-72 max-w-[calc(100vw-20px)] bg-[#100F1D]/95 backdrop-blur-xl border border-amber-400/80 rounded-none p-1.5 sm:p-3 shadow-2xl text-slate-100 space-y-1 sm:space-y-2 animate-in fade-in zoom-in-95 duration-150">
                  {/* 말풍선 꼬리 (화살표) */}
                  {bubblePos.isBottomHalf ? (
                    // 아래쪽을 가리키는 꼬리 (하단 필지 위 말풍선)
                    <div
                      className="absolute -bottom-2 w-3.5 h-3.5 bg-[#100F1D] border-r border-b border-amber-400/80 transform rotate-45"
                      style={{
                        left: `calc(50% + ${Math.max(-70, Math.min(70, bubblePos.tailOffset * 2.2))}px)`,
                        transform: 'translateX(-50%) rotate(45deg)',
                      }}
                    />
                  ) : (
                    // 위쪽을 가리키는 꼬리 (상단 필지 아래 말풍선)
                    <div
                      className="absolute -top-2 w-3.5 h-3.5 bg-[#100F1D] border-l border-t border-amber-400/80 transform rotate-45"
                      style={{
                        left: `calc(50% + ${Math.max(-70, Math.min(70, bubblePos.tailOffset * 2.2))}px)`,
                        transform: 'translateX(-50%) rotate(45deg)',
                      }}
                    />
                  )}

                  {/* 1) 말풍선 헤더: 필지 번호 + 분양 상태 + 닫기 버튼 */}
                  <div className="flex items-center justify-between pb-1 sm:pb-1.5 border-b border-white/10 gap-1 sm:gap-2 whitespace-nowrap">
                    <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 whitespace-nowrap">
                      <span className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <span className="text-sm sm:text-lg font-black text-amber-400 tracking-tight whitespace-nowrap leading-tight">
                        {selectedParcel.name}
                      </span>
                      <span className="text-[11px] sm:text-sm text-slate-300 font-bold whitespace-nowrap leading-tight">
                        ({selectedParcel.jibun})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 rounded-none text-[10px] sm:text-xs font-black whitespace-nowrap leading-tight ${
                          selectedParcel.status === '분양 완료'
                            ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                            : 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40'
                        }`}
                      >
                        {selectedParcel.status === '분양 완료' ? '분양 완료' : '분양 가능'}
                      </span>

                      {/* 말풍선 닫기(X) 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsBubbleVisible(false);
                          if (window.innerWidth < 1024) {
                            setSelectedId(null);
                          }
                        }}
                        className="p-0.5 sm:p-1 rounded-none hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="말풍선 닫기"
                      >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 2) 핵심 스펙 요약 (총 분양면적, 배치 방향, 분양 안내가) */}
                  <div className="bg-[#090814] rounded-none p-1.5 sm:p-2.5 border border-white/10 space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between leading-snug">
                      <span className="text-slate-300 text-xs sm:text-base font-semibold sm:font-bold">총 분양면적</span>
                      <span className="font-extrabold sm:font-black text-white text-xs sm:text-base">
                        {selectedParcel.area}{' '}
                        <span className="text-[10px] sm:text-sm text-slate-400 font-normal sm:font-medium">
                          ({selectedParcel.totalAreaM2})
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between leading-snug">
                      <span className="text-slate-300 text-xs sm:text-base font-semibold sm:font-bold">배치 방향</span>
                      <span className="font-bold sm:font-black text-emerald-300 text-xs sm:text-base flex items-center gap-1">
                        <Compass className="w-3 h-3 sm:w-4 sm:h-4" />
                        {selectedParcel.orientation}
                      </span>
                    </div>
                    <div className="pt-1 sm:pt-2 border-t border-white/10 flex items-center justify-between leading-snug">
                      <span className="text-amber-300 font-bold sm:font-extrabold text-xs sm:text-base">분양 안내가</span>
                      <span
                        className={`text-sm sm:text-lg font-black ${
                          selectedParcel.status === '분양 완료'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {selectedParcel.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <span className="text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>각 필지 도로지분 포함 면적입니다</span>
            </span>
          </div>
        </div>

        {/* 우측 상세정보 사이드 패널 (4 컬럼) */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          {selectedParcel ? (
            <div
              className={`p-4 sm:p-6 rounded-none bg-[#13121F] shadow-2xl relative overflow-hidden transition-all duration-300 ${
                selectedParcel.status === '분양 완료'
                  ? 'border-2 border-red-500/60 shadow-red-950/40'
                  : 'border-2 border-amber-500/40 shadow-amber-950/30'
              }`}
            >
              {/* 배경 앰비언트 글로우 */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
                  selectedParcel.status === '분양 완료'
                    ? 'bg-red-500/20'
                    : 'bg-amber-500/10'
                }`}
              />

              {/* 헤더: 필지명 & 분양 상태 */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`text-xl sm:text-2xl font-black ${
                        selectedParcel.status === '분양 완료'
                          ? 'text-red-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {selectedParcel.name}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-300">
                      ({selectedParcel.jibun}번지)
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                    <span>{selectedParcel.orientation} 위주 배치</span>
                  </span>
                </div>

                <div>
                  {selectedParcel.status === '분양 완료' ? (
                    <span className="px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-none text-xs sm:text-sm font-black bg-red-600 text-white border border-red-400 shadow-md shadow-red-600/30 flex items-center gap-1 sm:gap-1.5">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                      <span>분양 완료</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-none text-xs sm:text-sm font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                      <span>분양 가능</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 면적 및 분양가 박스 */}
              <div className="my-3 sm:my-5 p-2.5 sm:p-4 rounded-none bg-[#0B0A14] border border-white/10 space-y-2 sm:space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-base font-bold text-slate-300">총 분양면적</span>
                  <span className="text-sm sm:text-lg font-black text-white">
                    {selectedParcel.area}{' '}
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      ({selectedParcel.totalAreaM2})
                    </span>
                  </span>
                </div>

                <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs sm:text-base font-bold text-amber-300">분양 안내가</span>
                  <span
                    className={`text-base sm:text-xl font-black ${
                      selectedParcel.status === '분양 완료'
                        ? 'text-red-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {selectedParcel.price}
                  </span>
                </div>
              </div>

              {/* 특장점 목록 */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-5">
                <div className="text-sm sm:text-lg font-bold text-white flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span>필지 입지 특장점</span>
                </div>
                <div className="space-y-1.5 sm:space-y-2.5">
                  {selectedParcel.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="text-xs sm:text-base text-slate-100 font-medium flex items-start gap-2 sm:gap-2.5 bg-[#1C1B2E] px-3 py-1.5 sm:px-4 sm:py-3 rounded-none border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>



              {/* 버튼 그룹 */}
              <div className="space-y-2">
                {selectedParcel.status === '분양 가능' ? (
                  <button
                    onClick={() =>
                      onOpenReservationModal &&
                      onOpenReservationModal(selectedParcel.name)
                    }
                    className="w-full py-2.5 sm:py-3.5 rounded-none bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{selectedParcel.name} 현장방문 예약하기</span>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      onOpenReservationModal &&
                      onOpenReservationModal(`${selectedParcel.name} (분양완료 대기)`)
                    }
                    className="w-full py-2.5 sm:py-3.5 rounded-none bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-600/35 flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-400/50"
                  >
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                    <span>{selectedParcel.name} 분양 완료 (대기/유사필지 문의)</span>
                  </button>
                )}

                {/* PC: 직통 전화 상담 모달 팝업 열기 / 모바일: 바로 tel 링크 */}
                <button
                  type="button"
                  onClick={() => openPhoneConsultModal()}
                  className="hidden lg:flex w-full py-2.5 sm:py-3.5 rounded-none bg-amber-400 hover:bg-amber-300 border border-amber-500/50 text-slate-950 font-black text-xs sm:text-sm items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                  <span>담당자 직통 전화 상담 (010-8389-0045)</span>
                </button>

                <a
                  href="tel:010-8389-0045"
                  className="flex lg:hidden w-full py-2.5 sm:py-3.5 rounded-none bg-amber-400 hover:bg-amber-300 border border-amber-500/50 text-slate-950 font-black text-xs sm:text-sm items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                  <span>담당자 직통 전화 상담 (010-8389-0045)</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-none bg-gradient-to-br from-[#1C1A2E] to-[#13121F] border border-amber-500/30 text-center text-slate-200 space-y-3 shadow-xl">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-amber-400 animate-pulse" />
              <p className="text-sm sm:text-base md:text-lg font-black text-amber-300 tracking-wide">
                지적도에서 원하는 필지 번호를 선택해 주세요
              </p>
              <p className="text-xs text-slate-400">
                상세정보 확인
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
