import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_MAP_MARKER_CONFIG } from '../../data/initialData';
import { MapMarkerConfig } from '../../types';
import {
  Sparkles,
  Sliders,
  Type,
  Palette,
  Check,
  RotateCcw,
  Eye,
  Activity,
  Layers,
} from 'lucide-react';

export const MapMarkerCustomizerTab: React.FC = () => {
  const { config, updateConfig } = useApp();
  const current = config.mapMarker || INITIAL_MAP_MARKER_CONFIG;

  const [form, setForm] = useState<MapMarkerConfig>({ ...current });
  const [saved, setSaved] = useState(false);

  const handleChange = <K extends keyof MapMarkerConfig>(
    key: K,
    value: MapMarkerConfig[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateConfig({ mapMarker: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('지도/마커 스타일을 기본 권장 설정값으로 복원하시겠습니까?')) {
      setForm({ ...INITIAL_MAP_MARKER_CONFIG });
      updateConfig({ mapMarker: { ...INITIAL_MAP_MARKER_CONFIG } });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  // Speed string to seconds for live preview animation
  const speedSec =
    form.animationSpeed === 'slow'
      ? '3.5s'
      : form.animationSpeed === 'fast'
      ? '1.2s'
      : '2.0s';

  const getAnimationClass = () => {
    if (!form.enableAnimation) return '';
    if (form.animationType === 'float') return 'animate-marker-float';
    if (form.animationType === 'pulse') return 'animate-marker-pulse';
    if (form.animationType === 'glow') return 'animate-marker-glow';
    if (form.animationType === 'bounce') return 'animate-marker-bounce';
    return '';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header with Save & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-amber-400" />
            <span>지적도 지도 & 마커 UI 커스텀 설정</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            마커의 둥둥 뜨는 애니메이션, 글씨 크기/굵기, 크기 배율, 투명도 및 색상을 자유롭게 조정합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-[#1E1D2E] hover:bg-[#2B2A3E] text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>기본값 복원</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>설정 저장하기</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>지도/마커 커스텀 설정이 저장되었으며 사이트에 즉시 반영되었습니다.</span>
        </div>
      )}

      {/* Real-time Interactive Mini Preview */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161524] to-[#100F1C] border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>실시간 마커 UI 렌더링 미리보기</span>
          </h3>
          <span className="text-[11px] text-slate-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
            현재 설정 적용 중
          </span>
        </div>

        {/* Live SVG Preview */}
        <div className="bg-[#0B0B0F]/90 rounded-2xl p-6 border border-white/10 flex flex-wrap items-center justify-around gap-8 relative overflow-hidden">
          {/* SVG Keyframe Styles for Preview */}
          <style>{`
            @keyframes markerFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-7px); }
            }
            @keyframes markerPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
            @keyframes markerGlow {
              0%, 100% { filter: drop-shadow(0 0 2px rgba(255,255,255,0.4)); }
              50% { filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.8)); }
            }
            @keyframes markerBounce {
              0%, 100% { transform: translateY(0); }
              40% { transform: translateY(-9px); }
              60% { transform: translateY(-4px); }
            }
            .animate-marker-float {
              animation: markerFloat ${speedSec} ease-in-out infinite;
            }
            .animate-marker-pulse {
              animation: markerPulse ${speedSec} ease-in-out infinite;
              transform-origin: center;
            }
            .animate-marker-glow {
              animation: markerGlow ${speedSec} ease-in-out infinite;
            }
            .animate-marker-bounce {
              animation: markerBounce ${speedSec} ease-in-out infinite;
            }
          `}</style>

          {/* Sample 1: Single-digit Available Parcel (e.g. 7번) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold text-slate-300">한 자리 분양가능 (7번)</span>
            <div
              className={`relative ${getAnimationClass()}`}
              style={{ opacity: form.markerOpacity }}
            >
              <svg
                width={80 * form.markerScale}
                height={80 * form.markerScale}
                viewBox="0 0 80 80"
                className="overflow-visible"
              >
                <circle
                  cx="40"
                  cy="40"
                  r={38 * form.markerScale}
                  fill={form.availableFillColor}
                  stroke={form.availableBorderColor}
                  strokeWidth="2.5"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                  }}
                />
                <text
                  x="40"
                  y="40"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={form.availableTextColor}
                  fontSize={`${form.fontSizeSingle * form.markerScale}px`}
                  fontWeight={form.fontWeight}
                  fontFamily="sans-serif"
                >
                  7
                </text>
              </svg>
            </div>
            <span className="text-[10px] text-amber-400 font-semibold">분양 가능</span>
          </div>

          {/* Sample 2: Double-digit Available Parcel (e.g. 15번) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold text-slate-300">두 자리 분양가능 (15번)</span>
            <div
              className={`relative ${getAnimationClass()}`}
              style={{ opacity: form.markerOpacity }}
            >
              <svg
                width={80 * form.markerScale}
                height={80 * form.markerScale}
                viewBox="0 0 80 80"
                className="overflow-visible"
              >
                <circle
                  cx="40"
                  cy="40"
                  r={38 * form.markerScale}
                  fill={form.availableFillColor}
                  stroke={form.availableBorderColor}
                  strokeWidth="2.5"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                  }}
                />
                <text
                  x="40"
                  y="40"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={form.availableTextColor}
                  fontSize={`${form.fontSizeDouble * form.markerScale}px`}
                  fontWeight={form.fontWeight}
                  fontFamily="sans-serif"
                >
                  15
                </text>
              </svg>
            </div>
            <span className="text-[10px] text-amber-400 font-semibold">분양 가능</span>
          </div>

          {/* Sample 3: Completed Parcel with Badge (e.g. 9번) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold text-slate-300">분양완료 마커 (9번)</span>
            <div
              className={`relative ${getAnimationClass()}`}
              style={{ opacity: form.markerOpacity }}
            >
              <svg
                width={106 * form.markerScale}
                height={100 * form.markerScale}
                viewBox="0 0 106 100"
                className="overflow-visible"
              >
                <circle
                  cx="53"
                  cy="38"
                  r={38 * form.markerScale}
                  fill={form.completedFillColor}
                  stroke={form.completedBorderColor}
                  strokeWidth="2.5"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                  }}
                />
                <text
                  x="53"
                  y="38"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={form.completedTextColor}
                  fontSize={`${form.fontSizeSingle * form.markerScale}px`}
                  fontWeight={form.fontWeight}
                  fontFamily="sans-serif"
                >
                  9
                </text>
                {form.showCompletedBadge && (
                  <g transform={`translate(53, 76)`}>
                    <rect
                      x={-50 * form.markerScale}
                      y={-15 * form.markerScale}
                      width={100 * form.markerScale}
                      height={30 * form.markerScale}
                      rx={15 * form.markerScale}
                      fill={form.completedFillColor}
                      stroke={form.completedBorderColor}
                      strokeWidth="2"
                    />
                    <text
                      y={1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={form.completedTextColor}
                      fontSize={`${16 * form.markerScale}px`}
                      fontWeight="900"
                      fontFamily="sans-serif"
                    >
                      분양완료
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <span className="text-[10px] text-red-400 font-semibold">계약 완료</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. 아이콘 움직임 (애니메이션) 설정 */}
        <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>1. 아이콘 움직임(애니메이션) 관리</span>
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.enableAnimation}
                onChange={(e) => handleChange('enableAnimation', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              <span className="ml-2 text-xs font-bold text-slate-300">
                {form.enableAnimation ? 'ON (동작)' : 'OFF (정지)'}
              </span>
            </label>
          </div>

          {form.enableAnimation && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  애니메이션 효과 유형
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'float', label: '둥둥 뜨기', desc: '위아래 부유' },
                    { id: 'pulse', label: '반짝임/펄스', desc: '팽창 & 수축' },
                    { id: 'glow', label: '네온 글로우', desc: '빛 발광' },
                    { id: 'bounce', label: '통통 튀기', desc: '바운스 리듬' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleChange(
                          'animationType',
                          item.id as MapMarkerConfig['animationType']
                        )
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        form.animationType === item.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'bg-[#181726] border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-black">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  애니메이션 속도
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'slow', label: '느리게 (3.5초)', desc: '자연스러운 완만함' },
                    { id: 'normal', label: '보통 (2.0초)', desc: '권장 표준 속도' },
                    { id: 'fast', label: '빠르게 (1.2초)', desc: '눈에 띄는 강조' },
                  ].map((speed) => (
                    <button
                      key={speed.id}
                      type="button"
                      onClick={() =>
                        handleChange(
                          'animationSpeed',
                          speed.id as MapMarkerConfig['animationSpeed']
                        )
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        form.animationSpeed === speed.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-[#181726] border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{speed.label}</div>
                      <div className="text-[10px] text-slate-400">{speed.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. 글씨 크기 & 스타일 조절 */}
        <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <Type className="w-5 h-5 text-indigo-400" />
              <span>2. 글씨 크기 & 폰트 스타일 조절</span>
            </h3>
          </div>

          <div className="space-y-4">
            {/* Single digit font size */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  한 자리 번호 (1~9번) 글씨 크기
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-[#181726] px-2 py-0.5 rounded border border-white/10">
                  {form.fontSizeSingle}px
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="46"
                step="1"
                value={form.fontSizeSingle}
                onChange={(e) =>
                  handleChange('fontSizeSingle', parseInt(e.target.value, 10))
                }
                className="w-full accent-amber-400 cursor-pointer h-2 bg-[#1C1B2B] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>24px (작게)</span>
                <span>34px (기본)</span>
                <span>46px (특대)</span>
              </div>
            </div>

            {/* Double digit font size */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  두 자리 번호 (10~26번) 글씨 크기
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-[#181726] px-2 py-0.5 rounded border border-white/10">
                  {form.fontSizeDouble}px
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="40"
                step="1"
                value={form.fontSizeDouble}
                onChange={(e) =>
                  handleChange('fontSizeDouble', parseInt(e.target.value, 10))
                }
                className="w-full accent-amber-400 cursor-pointer h-2 bg-[#1C1B2B] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20px (작게)</span>
                <span>29px (기본)</span>
                <span>40px (특대)</span>
              </div>
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                글씨 굵기 (Font Weight)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '700', label: 'Bold (700)', desc: '기본 굵게' },
                  { id: '800', label: 'ExtraBold (800)', desc: '매우 굵게' },
                  { id: '900', label: 'Black (900)', desc: '최고 굵기 (권장)' },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() =>
                      handleChange('fontWeight', w.id as MapMarkerConfig['fontWeight'])
                    }
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      form.fontWeight === w.id
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 font-black'
                        : 'bg-[#181726] border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs">{w.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 핀/마커 크기, 투명도 & 뱃지 설정 */}
        <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>3. 핀 크기 배율 & 투명도 설정</span>
            </h3>
          </div>

          <div className="space-y-4">
            {/* Marker Scale */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  마커 크기 배율 (Scale)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-[#181726] px-2 py-0.5 rounded border border-white/10">
                  {Math.round(form.markerScale * 100)}% ({form.markerScale}x)
                </span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={form.markerScale}
                onChange={(e) =>
                  handleChange('markerScale', parseFloat(e.target.value))
                }
                className="w-full accent-amber-400 cursor-pointer h-2 bg-[#1C1B2B] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>80% (축소)</span>
                <span>100% (표준)</span>
                <span>140% (확대)</span>
              </div>
            </div>

            {/* Marker Opacity */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  마커 투명도 (Opacity)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-[#181726] px-2 py-0.5 rounded border border-white/10">
                  {Math.round(form.markerOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.0"
                step="0.05"
                value={form.markerOpacity}
                onChange={(e) =>
                  handleChange('markerOpacity', parseFloat(e.target.value))
                }
                className="w-full accent-amber-400 cursor-pointer h-2 bg-[#1C1B2B] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>40% (반투명)</span>
                <span>75% (중간)</span>
                <span>100% (완전 선명)</span>
              </div>
            </div>

            {/* Completed badge toggle */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">
                  분양완료 하단 '분양완료' 알약 뱃지 표시
                </div>
                <div className="text-[11px] text-slate-400">
                  빨간 동그라미 아래 '분양완료' 텍스트 뱃지 표시 여부
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showCompletedBadge}
                  onChange={(e) =>
                    handleChange('showCompletedBadge', e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 4. 분양 가능/완료 마커 색상 커스텀 */}
        <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-amber-400" />
              <span>4. 마커 색상 커스텀 (노란색 / 빨간색)</span>
            </h3>
          </div>

          <div className="space-y-4">
            {/* Available Parcel Color Settings */}
            <div className="p-3.5 rounded-2xl bg-[#181726] border border-amber-500/20 space-y-3">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>분양 가능 마커 색상 설정</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">배경색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.availableFillColor}
                      onChange={(e) => handleChange('availableFillColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.availableFillColor}
                      onChange={(e) => handleChange('availableFillColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">글자색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.availableTextColor}
                      onChange={(e) => handleChange('availableTextColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.availableTextColor}
                      onChange={(e) => handleChange('availableTextColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">테두리색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.availableBorderColor}
                      onChange={(e) => handleChange('availableBorderColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.availableBorderColor}
                      onChange={(e) => handleChange('availableBorderColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Parcel Color Settings */}
            <div className="p-3.5 rounded-2xl bg-[#181726] border border-red-500/20 space-y-3">
              <div className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>분양 완료 마커 색상 설정</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">배경색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.completedFillColor}
                      onChange={(e) => handleChange('completedFillColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.completedFillColor}
                      onChange={(e) => handleChange('completedFillColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">글자색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.completedTextColor}
                      onChange={(e) => handleChange('completedTextColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.completedTextColor}
                      onChange={(e) => handleChange('completedTextColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">테두리색</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.completedBorderColor}
                      onChange={(e) => handleChange('completedBorderColor', e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.completedBorderColor}
                      onChange={(e) => handleChange('completedBorderColor', e.target.value)}
                      className="w-full px-2 py-1 bg-black/40 rounded border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
