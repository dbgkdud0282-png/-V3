import React, { useState } from 'react';
import { Parcel } from '../types';
import {
  Compass,
  Star,
  CheckCircle2,
  Maximize2,
  RotateCcw,
  Layers,
  MapPin,
  Check,
} from 'lucide-react';

interface InteractiveCadastralMapProps {
  parcels: Parcel[];
  selectedParcelId: string;
  onSelectParcel: (id: string) => void;
  statusFilter: 'all' | 'available' | 'completed';
  onOpenModal: () => void;
}

// Exact percentage coordinates (0~100) mapped from the uploaded cadastral drawing (지적도및구적도 SCALE 1/1,000)
export const PARCEL_MAP_POSITIONS: Record<
  number,
  { x: number; y: number; label: string; branch: string }
> = {
  // 1~4: 북측 상단 (10m 주간선도로 북측 라인)
  1: { x: 21, y: 22, label: '847-1', branch: '북측' },
  2: { x: 36, y: 29, label: '847-15', branch: '북측' },
  3: { x: 51, y: 35, label: '847-16', branch: '북측' },
  4: { x: 66, y: 39, label: '847-17', branch: '북측' },

  // 5~10: 동측 및 남측 외곽 라인
  5: { x: 86, y: 43, label: '847-34', branch: '동측' },
  6: { x: 80, y: 51, label: '847-35', branch: '동측' },
  7: { x: 74, y: 60, label: '847-36', branch: '동남측' },
  8: { x: 67, y: 68, label: '847-37', branch: '동남측' },
  9: { x: 59, y: 76, label: '847-38', branch: '남측' },
  10: { x: 49, y: 81, label: '847-39', branch: '남측' },

  // 11~17: 중앙 및 내부 루프 블록
  11: { x: 38, y: 73, label: '847-31', branch: '중앙' },
  12: { x: 48, y: 67, label: '847-30', branch: '중앙' },
  13: { x: 55, y: 58, label: '847-29', branch: '중앙' },
  14: { x: 60, y: 49, label: '847-28', branch: '중앙' }, // ★ Sold
  15: { x: 49, y: 48, label: '847-27', branch: '중앙' }, // ★ Sold
  16: { x: 45, y: 56, label: '847-33', branch: '중앙' },
  17: { x: 42, y: 64, label: '847-32', branch: '중앙' },

  // 18~23: 중서측 블록
  18: { x: 30, y: 62, label: '847-24', branch: '중서' },
  19: { x: 33, y: 53, label: '847-23', branch: '중서' }, // ★ Sold
  20: { x: 36, y: 44, label: '847-22', branch: '중서' }, // ★ Sold
  21: { x: 29, y: 39, label: '847-21', branch: '중서' },
  22: { x: 25, y: 48, label: '847-26', branch: '중서' }, // ★ Sold
  23: { x: 22, y: 59, label: '847-25', branch: '중서' },

  // 24~26: 서측 최외곽 블록
  24: { x: 11, y: 54, label: '847-20', branch: '서측' }, // ★ Sold
  25: { x: 13, y: 44, label: '847-19', branch: '서측' }, // ★ Sold
  26: { x: 16, y: 33, label: '847-18', branch: '서측' }, // ★ Sold
};

export const InteractiveCadastralMap: React.FC<InteractiveCadastralMapProps> = ({
  parcels,
  selectedParcelId,
  onSelectParcel,
  statusFilter,
  onOpenModal,
}) => {
  const [hoveredParcelId, setHoveredParcelId] = useState<string | null>(null);
  const [showBlueprintBg, setShowBlueprintBg] = useState<boolean>(true);

  // Quick lookup dictionary by lotNumber
  const parcelMapByLot = React.useMemo(() => {
    const map = new Map<number, Parcel>();
    parcels.forEach((p) => map.set(p.lotNumber, p));
    return map;
  }, [parcels]);

  const activeParcel = parcels.find((p) => p.id === selectedParcelId);

  return (
    <div className="space-y-3">
      {/* Top Map Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>지적도 인터랙티브 구적도 (SCALE 1/1,000)</span>
          </span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            필지 번호를 누르면 우측에 상세 정보가 연동됩니다
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBlueprintBg((prev) => !prev)}
            className="px-2.5 py-1 rounded-lg bg-[#1D1C30] hover:bg-[#2A2944] text-slate-300 font-medium text-[11px] border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
            title="도면 배경 표시 전환"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span>{showBlueprintBg ? '구적도 배경 ON' : '구적도 배경 OFF'}</span>
          </button>
          <button
            onClick={onOpenModal}
            className="px-2.5 py-1 rounded-lg bg-[#1D1C30] hover:bg-[#2A2944] text-amber-300 font-medium text-[11px] border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
            <span>도면 원본 보기</span>
          </button>
        </div>
      </div>

      {/* Cadastral Blueprint Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#0A0A12] rounded-3xl border border-white/15 overflow-hidden shadow-2xl select-none group">
        {/* Background Layer 1: Architectural Cadastral Map Plan Image */}
        {showBlueprintBg && (
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 filter contrast-125 transition-opacity"
            style={{ backgroundImage: `url('/assets/real/cadastral_map_plan.jpg')` }}
          />
        )}

        {/* Background Layer 2: Grid & Blueprint Coordinate Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '4% 4%',
          }}
        />

        {/* SVG Drawing Layer: Cadastral Boundary, 10M Road, Plots, and Surrounding Lands */}
        <svg
          viewBox="0 0 1000 700"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Road Asphalt Texture / Linear Gradient */}
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2A3E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1E1E2C" stopOpacity="0.95" />
            </linearGradient>

            {/* Boundary Glow Filter */}
            <filter id="lotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Site Outer Cadastral Boundary Outline */}
          <polygon
            points="
              100,160 190,140 270,170 380,210 490,240 600,260 760,280 870,290 920,380
              910,480 850,560 780,630 680,680 500,695 380,680 290,620 180,590 80,480 50,340 60,220
            "
            fill="rgba(16, 24, 40, 0.4)"
            stroke="rgba(245, 158, 11, 0.4)"
            strokeWidth="2.5"
            strokeDasharray="8 4"
          />

          {/* 10M Main Road Network (연천군 장탄리 847-40도 10M 포장도로) */}
          {/* Main Trunk Road Path entering from West (between parcel 26 and 1) running East then looping South */}
          <path
            d="
              M 60,240
              C 120,240 180,250 240,280
              C 340,330 460,370 560,400
              C 680,430 780,440 820,440
              C 840,440 850,490 830,540
              C 800,600 730,660 630,700
              C 530,740 420,730 350,680
            "
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Road Border Highlight Line */}
          <path
            d="
              M 60,240
              C 120,240 180,250 240,280
              C 340,330 460,370 560,400
              C 680,430 780,440 820,440
              C 840,440 850,490 830,540
              C 800,600 730,660 630,700
            "
            fill="none"
            stroke="rgba(99, 102, 241, 0.5)"
            strokeWidth="2"
            strokeDasharray="10 5"
          />

          {/* Internal Road Branch 1: Between Far-West (24,25,26) and West-Center (21,22,23) */}
          <path
            d="M 180,260 C 190,340 195,440 190,570"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Internal Road Branch 2: Between West-Center and East-Center (Central branch) */}
          <path
            d="M 330,330 C 350,420 370,520 360,630"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Internal Road Branch 3: Cul-de-sac / Loop around 11~17 */}
          <path
            d="M 500,410 C 500,490 490,580 440,660"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Road Name Callout Badges inside Map */}
          <g transform="translate(130, 275) rotate(18)">
            <rect x="-70" y="-12" width="140" height="24" rx="6" fill="#111827" stroke="#3B82F6" strokeWidth="1" />
            <text x="0" y="4" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle">
              10M 메인도로 진입
            </text>
          </g>

          <g transform="translate(680, 440) rotate(10)">
            <rect x="-80" y="-12" width="160" height="24" rx="6" fill="#111827" stroke="#6366F1" strokeWidth="1" />
            <text x="0" y="4" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle">
              10M 도로망 (847-40도)
            </text>
          </g>

          {/* North Direction Arrow (방위표) */}
          <g transform="translate(930, 60)">
            <circle cx="0" cy="0" r="24" fill="#111827" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            {/* Compass Needle */}
            <polygon points="0,-16 6,4 0,0 -6,4" fill="#EF4444" />
            <polygon points="0,16 6,-2 0,0 -6,-2" fill="#9CA3AF" />
            <text x="0" y="-20" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              N
            </text>
          </g>

          {/* Map Title in Blueprint Header */}
          <g transform="translate(30, 40)">
            <text x="0" y="0" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="1">
              지적도 및 구적도
            </text>
            <text x="0" y="18" fill="#9CA3AF" fontSize="10" fontWeight="500">
              SCALE = 1 / 1,000 · 연천군 청산면 장탄리 847-1번지 일원
            </text>
          </g>

          {/* Surrounding Plot Landmark Labels matching Real Document */}
          <text x="250" y="130" fill="rgba(156, 163, 175, 0.6)" fontSize="11" fontWeight="bold">산 163임</text>
          <text x="560" y="180" fill="rgba(156, 163, 175, 0.6)" fontSize="11" fontWeight="bold">산 162-6임</text>
          <text x="780" y="240" fill="rgba(156, 163, 175, 0.6)" fontSize="11" fontWeight="bold">847-41임</text>
          <text x="40" y="160" fill="rgba(156, 163, 175, 0.6)" fontSize="10">847-2임 / 3임</text>
          <text x="20" y="320" fill="rgba(156, 163, 175, 0.6)" fontSize="10">847-8임</text>
          <text x="20" y="460" fill="rgba(156, 163, 175, 0.6)" fontSize="10">847-6대 / 7대</text>
          <text x="240" y="670" fill="rgba(156, 163, 175, 0.6)" fontSize="10">849전</text>
          <text x="350" y="695" fill="rgba(156, 163, 175, 0.6)" fontSize="10">850전</text>
          <text x="560" y="700" fill="rgba(156, 163, 175, 0.6)" fontSize="10">851전</text>
          <text x="890" y="580" fill="rgba(156, 163, 175, 0.6)" fontSize="10">산 162-1도</text>
          <text x="20" y="210" fill="rgba(96, 165, 250, 0.9)" fontSize="10" fontWeight="bold">← 10M 진입로(공사중)</text>
        </svg>

        {/* Layer 3: Interactive Parcel Marker Points (Buttons) */}
        {Object.entries(PARCEL_MAP_POSITIONS).map(([lotNumStr, pos]) => {
          const lotNum = parseInt(lotNumStr, 10);
          const parcel = parcelMapByLot.get(lotNum);
          if (!parcel) return null;

          const isSelected = parcel.id === selectedParcelId;
          const isSoldOut = parcel.status === 'completed' || parcel.isStarredSoldOut;
          const isHovered = hoveredParcelId === parcel.id;

          // Check if matches filter
          const isFilteredOut =
            (statusFilter === 'available' && isSoldOut) ||
            (statusFilter === 'completed' && !isSoldOut);

          return (
            <div
              key={parcel.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: isSelected ? 40 : isHovered ? 35 : isSoldOut ? 10 : 20,
              }}
            >
              {/* Tooltip on Hover or Selection */}
              {(isHovered || (isSelected && !isHovered)) && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-xl bg-[#12111E] border border-amber-400 text-white text-[11px] shadow-2xl pointer-events-none whitespace-nowrap flex flex-col items-center gap-0.5 z-50 animate-in fade-in zoom-in-90 duration-150"
                >
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-amber-400">{parcel.lotNumberText}</span>
                    <span>{parcel.number}</span>
                    {isSoldOut ? (
                      <span className="text-amber-300 font-black text-[10px] flex items-center">
                        ★ 완료
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold text-[10px]">
                        분양가능
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {parcel.totalAreaPyeong}평 ({parcel.totalAreaM2}㎡) · {parcel.orientation}
                  </div>
                  <div className="text-[10px] font-black text-amber-300">
                    {isSoldOut ? '계약완료 (상담가능)' : `${parcel.priceMillionWon.toLocaleString()}만원`}
                  </div>
                  {/* Tooltip caret */}
                  <div className="w-2 h-2 bg-[#12111E] border-r border-b border-amber-400 rotate-45 -mb-2" />
                </div>
              )}

              {/* Main Interactive Parcel Pin Button */}
              <button
                type="button"
                onClick={() => onSelectParcel(parcel.id)}
                onMouseEnter={() => setHoveredParcelId(parcel.id)}
                onMouseLeave={() => setHoveredParcelId(null)}
                aria-label={`구획 ${parcel.lotNumberText} ${parcel.number}`}
                className={`group relative flex items-center justify-center transition-all duration-200 cursor-pointer rounded-full shadow-lg ${
                  isFilteredOut ? 'opacity-30 grayscale' : 'opacity-100'
                } ${
                  isSelected
                    ? 'w-9 h-9 sm:w-11 sm:h-11 bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300 ring-offset-2 ring-offset-[#0A0A12] scale-110 shadow-amber-400/50'
                    : isSoldOut
                    ? 'w-7 h-7 sm:w-9 sm:h-9 bg-[#231A29] text-amber-300 border-2 border-amber-500/70 hover:border-amber-300 hover:scale-115 hover:bg-[#342440]'
                    : 'w-7 h-7 sm:w-9 sm:h-9 bg-[#11261D] text-emerald-300 border-2 border-emerald-400 hover:border-emerald-300 hover:scale-115 hover:bg-[#18392B] shadow-emerald-500/30'
                }`}
              >
                {/* Circle Lot Number (①~㉖) */}
                <div className="flex flex-col items-center justify-center leading-none">
                  <span className="text-xs sm:text-sm font-black">
                    {parcel.lotNumberText}
                  </span>
                  {/* Small Star indicator on button for sold parcels */}
                  {isSoldOut && (
                    <span className="text-[9px] -mt-0.5 text-amber-400 font-extrabold">
                      ★
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}

        {/* Map Legend Overlay at Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2 p-2 rounded-2xl bg-[#0F0E1AE6] backdrop-blur-md border border-white/10 text-[11px] text-slate-300">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#11261D] border border-emerald-400 inline-block" />
              <span className="font-semibold text-emerald-300">분양가능 (18필지)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#231A29] border border-amber-500 inline-flex items-center justify-center text-[8px] text-amber-400 font-bold">
                ★
              </span>
              <span className="font-semibold text-amber-300">별표시(★) 분양완료 (8필지)</span>
            </div>
            <div className="flex items-center gap-1.5 hidden md:flex">
              <span className="w-3 h-1.5 rounded-sm bg-indigo-500/80 inline-block" />
              <span className="text-slate-300">10m 메인 도로망 (847-40도)</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>선택: </span>
            <strong className="text-white">
              {activeParcel ? `${activeParcel.lotNumberText} ${activeParcel.number}` : '-'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
