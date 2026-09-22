import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown } from 'lucide-react';

export const SpecialValuesSection: React.FC = () => {
  const { config, getCustomText, getCustomTextStyle, isMobile } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const getMappedTitle = (idx: number, fallback: string) => {
    switch (idx) {
      case 0: return getCustomText('specialValue1Title', fallback);
      case 1: return getCustomText('specialValue2Title', fallback);
      case 2: return getCustomText('specialValue3Title', fallback);
      case 3: return getCustomText('specialValue4Title', fallback);
      default: return fallback;
    }
  };

  const getMappedDesc = (idx: number, fallback: string) => {
    switch (idx) {
      case 0: return getCustomText('specialValue1Desc', fallback);
      case 1: return getCustomText('specialValue2Desc', fallback);
      case 2: return getCustomText('specialValue3Desc', fallback);
      case 3: return getCustomText('specialValue4Desc', fallback);
      default: return fallback;
    }
  };

  const getMappedTitleStyle = (idx: number) => {
    const key = (`specialValue${idx + 1}Title`) as any;
    return getCustomTextStyle(key, 'text-lg', 'text-base', 'font-bold', 'font-bold');
  };

  const getMappedDescStyle = (idx: number) => {
    const key = (`specialValue${idx + 1}Desc`) as any;
    return getCustomTextStyle(key, 'text-base', 'text-[0.85rem] sm:text-base', 'font-normal', 'font-normal');
  };

  return (
    <section
      id="special-value-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 border-t border-slate-200"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#00593B] block mb-2">
            SPECIAL VALUE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            특장점
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            복잡한 행정절차 없이, 집만 지으면 끝
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {config.specialValues.map((val, idx) => {
            const isOpen = openId === val.id;
            const qNum = `Q${String(idx + 1).padStart(2, '0')}`;
            const displayTitle = getMappedTitle(idx, val.title);
            const displayDesc = getMappedDesc(idx, val.description);

            const tStyle = getMappedTitleStyle(idx);
            const dStyle = getMappedDescStyle(idx);

            return (
              <div
                key={val.id}
                className={`rounded-2xl bg-white border transition-all duration-300 shadow-sm overflow-hidden ${
                  isOpen ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(val.id)}
                  className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-6 flex-1 pr-3 sm:pr-4">
                    <h3 className={`text-slate-900 group-hover:text-amber-700 transition-colors whitespace-pre-line ${tStyle.className}`}>
                      {displayTitle}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-amber-100 text-amber-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                    <p
                      className={`text-slate-600 leading-relaxed whitespace-pre-line ${dStyle.className} break-keep md:break-normal`}
                      style={
                        isMobile
                          ? {
                              wordBreak: 'keep-all',
                              fontSize: '0.85rem',
                              letterSpacing: '-0.02em',
                              lineHeight: '1.65',
                            }
                          : undefined
                      }
                    >
                      {displayDesc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Optional Multiline Special Values Notice Text */}
        {config.sectionContent?.specialValuesNoticeText && (
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-emerald-950/5 border border-emerald-500/20 text-center">
            <p
              className="text-xs sm:text-sm text-slate-700 font-medium whitespace-pre-line leading-relaxed max-w-2xl mx-auto break-keep md:break-normal"
              style={isMobile ? { wordBreak: 'keep-all' } : undefined}
            >
              {config.sectionContent.specialValuesNoticeText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

