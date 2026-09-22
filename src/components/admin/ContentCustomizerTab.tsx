import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CONFIG, INITIAL_HERO_PILL_STYLE, INITIAL_LOCATION_CARDS, INITIAL_TOP_LOCATION_CARDS } from '../../data/initialData';
import { TextCustomizerConfig, HeroPillStyleConfig, LocationCard, CustomTextItem, HeroPill } from '../../types';
import {
  Check,
  Edit3,
  Type,
  MapPin,
  FileText,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  Plus,
  Trash2,
} from 'lucide-react';

const FONT_SIZE_OPTIONS = [
  { value: '', label: '기본 크기 (Default)' },
  { value: 'text-xs', label: 'text-xs (12px)' },
  { value: 'text-sm', label: 'text-sm (14px)' },
  { value: 'text-base', label: 'text-base (16px)' },
  { value: 'text-lg', label: 'text-lg (18px)' },
  { value: 'text-xl', label: 'text-xl (20px)' },
  { value: 'text-2xl', label: 'text-2xl (24px)' },
  { value: 'text-3xl', label: 'text-3xl (30px)' },
  { value: 'text-4xl', label: 'text-4xl (36px)' },
  { value: 'text-5xl', label: 'text-5xl (48px)' },
];

const FONT_WEIGHT_OPTIONS = [
  { value: '', label: '기본 굵기 (Default)' },
  { value: 'font-normal', label: 'Regular (400 - 보통)' },
  { value: 'font-medium', label: 'Medium (500 - 중간)' },
  { value: 'font-semibold', label: 'SemiBold (600 - 굵게)' },
  { value: 'font-bold', label: 'Bold (700 - 볼드)' },
  { value: 'font-extrabold', label: 'ExtraBold (800 - 아주 굵게)' },
  { value: 'font-black', label: 'Black (900 - 극태)' },
];

export const ContentCustomizerTab: React.FC = () => {
  const { config, updateConfig } = useApp();
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Badge Style Config (Font Size & Weight)
  const [badgeStyle, setBadgeStyle] = useState<{
    fontSize: string;
    fontWeight: string;
  }>(() => {
    return config.badgeStyle || { fontSize: 'text-sm', fontWeight: 'font-bold' };
  });

  // Single source of truth for all text inputs
  const [textCustomizer, setTextCustomizer] = useState<TextCustomizerConfig>(() => {
    return config.textCustomizer || INITIAL_CONFIG.textCustomizer;
  });

  // Hero Pills Style Config (Font Size & Weight)
  const [heroPillStyle, setHeroPillStyle] = useState<HeroPillStyleConfig>(() => {
    return config.heroPillStyle || INITIAL_HERO_PILL_STYLE;
  });

  // Dynamic Hero Pills
  const [heroPills, setHeroPills] = useState<HeroPill[]>(() => {
    return config.textCustomizer?.heroPills || INITIAL_CONFIG.textCustomizer?.heroPills || [];
  });

  // Dynamic Location Cards (Bottom)
  const [locationCards, setLocationCards] = useState<LocationCard[]>(() => {
    return config.locationCards && config.locationCards.length > 0
      ? config.locationCards
      : INITIAL_LOCATION_CARDS;
  });

  // Dynamic Top Location Cards (Top 4 Highlight Banners)
  const [topLocationCards, setTopLocationCards] = useState<LocationCard[]>(() => {
    return config.topLocationCards && config.topLocationCards.length > 0
      ? config.topLocationCards
      : INITIAL_TOP_LOCATION_CARDS;
  });

  const sections = [
    { id: 'hero', name: '히어로 메인', icon: Sparkles },
    { id: 'overview', name: '사업개요', icon: MapPin },
    { id: 'map', name: '지적도 & 필지', icon: Layers },
    { id: 'reservation', name: '현장방문 예약', icon: Calendar },
    { id: 'special', name: '4대 특장점', icon: Edit3 },
    { id: 'location', name: '입지 프리미엄', icon: Type },
  ];

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateConfig({
      // Sync legacy properties for double-layered robustness
      heroBadge: textCustomizer.heroBadge.pc,
      heroTitleLine1: textCustomizer.heroTitleLine1.pc,
      heroTitleHighlight: textCustomizer.heroTitleHighlight.pc,
      heroTitleLine2: textCustomizer.heroTitleLine2.pc,
      heroDescription1: textCustomizer.heroDescription1.pc,
      heroDescription2: textCustomizer.heroDescription2.pc,
      heroPills: heroPills,
      textCustomizer: { ...textCustomizer, heroPills },
      heroPillStyle,
      badgeStyle,
      locationCards,
      topLocationCards,
      overview: {
        ...config.overview,
        location: textCustomizer.overviewLocation.pc,
        parcelsSummary: textCustomizer.overviewParcelsSummary.pc,
        priceStart: textCustomizer.overviewPriceStart.pc,
      },
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetSectionTexts = () => {
    if (window.confirm('모든 맞춤 텍스트 문구 및 글자 스타일 설정을 기본 권장 설정으로 복원하시겠습니까?')) {
      const defaults = INITIAL_CONFIG.textCustomizer;
      setTextCustomizer({ ...defaults });
      setHeroPillStyle({ ...INITIAL_HERO_PILL_STYLE });
      setLocationCards([...INITIAL_LOCATION_CARDS]);
      setTopLocationCards([...INITIAL_TOP_LOCATION_CARDS]);
      setHeroPills([...(INITIAL_CONFIG.textCustomizer?.heroPills || [])]);
      updateConfig({
        textCustomizer: { ...defaults },
        heroPillStyle: { ...INITIAL_HERO_PILL_STYLE },
        locationCards: [...INITIAL_LOCATION_CARDS],
        topLocationCards: [...INITIAL_TOP_LOCATION_CARDS],
        heroQuickPills: [...(INITIAL_CONFIG.textCustomizer?.heroPills || [])],
        heroBadge: defaults.heroBadge.pc,
        heroTitleLine1: defaults.heroTitleLine1.pc,
        heroTitleHighlight: defaults.heroTitleHighlight.pc,
        heroTitleLine2: defaults.heroTitleLine2.pc,
        heroDescription1: defaults.heroDescription1.pc,
        heroDescription2: defaults.heroDescription2.pc,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleAddLocationCard = () => {
    const newCard: LocationCard = {
      id: `loc-card-${Date.now()}`,
      category: '신규 프리미엄',
      title: {
        pc: '새 프리미엄 항목 제목',
        mobile: '새 프리미엄 항목 제목',
        useSame: true,
        pcSize: 'text-base sm:text-lg',
        pcWeight: 'font-black',
        mobileSize: 'text-base',
        mobileWeight: 'font-black',
      },
      description: {
        pc: '• 상세 설명을 입력해 주세요.\n• 줄바꿈이 지원됩니다.',
        mobile: '• 상세 설명을 입력해 주세요.\n• 줄바꿈이 지원됩니다.',
        useSame: true,
        pcSize: 'text-xs sm:text-sm',
        pcWeight: 'font-normal',
        mobileSize: 'text-xs',
        mobileWeight: 'font-normal',
      },
    };
    setLocationCards(prev => [...prev, newCard]);
  };

  const handleDeleteLocationCard = (id: string) => {
    if (locationCards.length <= 1) {
      alert('최소 1개 이상의 입지 프리미엄 카드가 유지되어야 합니다.');
      return;
    }
    if (window.confirm('해당 입지 프리미엄 카드를 삭제하시겠습니까?')) {
      setLocationCards(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleUpdateLocationCardCategory = (id: string, category: string) => {
    setLocationCards(prev => prev.map(c => c.id === id ? { ...c, category } : c));
  };

  const handleUpdateLocationCardTitle = (id: string, title: CustomTextItem) => {
    setLocationCards(prev => prev.map(c => c.id === id ? { ...c, title } : c));
  };

  const handleUpdateLocationCardDescription = (id: string, description: CustomTextItem) => {
    setLocationCards(prev => prev.map(c => c.id === id ? { ...c, description } : c));
  };

  // Top Location Cards Handlers
  const handleAddTopLocationCard = () => {
    const newCard: LocationCard = {
      id: `top-loc-${Date.now()}`,
      category: '핵심 포인트',
      title: {
        pc: '새 요약 카드 제목',
        mobile: '새 요약 카드 제목',
        useSame: true,
        pcSize: 'text-sm sm:text-lg',
        pcWeight: 'font-black',
        mobileSize: 'text-sm',
        mobileWeight: 'font-black',
      },
      description: {
        pc: '상세 설명을 입력하세요.',
        mobile: '상세 설명을 입력하세요.',
        useSame: true,
        pcSize: 'text-[11px] sm:text-xs',
        pcWeight: 'font-normal',
        mobileSize: 'text-[11px]',
        mobileWeight: 'font-normal',
      },
    };
    setTopLocationCards(prev => [...prev, newCard]);
  };

  const handleDeleteTopLocationCard = (id: string) => {
    if (topLocationCards.length <= 1) {
      alert('최소 1개 이상의 상단 요약 카드가 유지되어야 합니다.');
      return;
    }
    if (window.confirm('해당 상단 요약 카드를 삭제하시겠습니까?')) {
      setTopLocationCards(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleUpdateTopLocationCardCategory = (id: string, category: string) => {
    setTopLocationCards(prev => prev.map(c => c.id === id ? { ...c, category } : c));
  };

  const handleUpdateTopLocationCardTitle = (id: string, title: CustomTextItem) => {
    setTopLocationCards(prev => prev.map(c => c.id === id ? { ...c, title } : c));
  };

  const handleUpdateTopLocationCardDescription = (id: string, description: CustomTextItem) => {
    setTopLocationCards(prev => prev.map(c => c.id === id ? { ...c, description } : c));
  };

  const handleAddHeroPill = () => {
    const newPill: HeroPill = {
      id: `pill-${Date.now()}`,
      num: String(heroPills.length + 1).padStart(2, '0'),
      title: { pc: '새 항목 제목', mobile: '새 항목 제목', useSame: true },
      desc: { pc: '상세 설명', mobile: '상세 설명', useSame: true },
    };
    setHeroPills(prev => [...prev, newPill]);
  };

  const handleDeleteHeroPill = (id: string) => {
    if (heroPills.length <= 1) {
      alert('최소 1개 이상의 포인트 카드가 유지되어야 합니다.');
      return;
    }
    if (window.confirm('해당 포인트 카드를 삭제하시겠습니까?')) {
      setHeroPills(prev => prev.filter(p => p.id !== id).map((p, idx) => ({ ...p, num: String(idx + 1).padStart(2, '0') })));
    }
  };

  const handleUpdateHeroPill = (id: string, updates: Partial<HeroPill>) => {
    setHeroPills(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const renderCustomField = (
    key: keyof TextCustomizerConfig,
    label: string,
    placeholder: string = ""
  ) => {
    const item = textCustomizer[key] || {
      pc: '',
      mobile: '',
      useSame: true,
      pcSize: '',
      mobileSize: '',
      pcWeight: '',
      mobileWeight: '',
    };

    const handlePcChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        const updatedPc = val;
        const updatedMobile = current.useSame ? val : current.mobile;
        return {
          ...prev,
          [key]: {
            ...current,
            pc: updatedPc,
            mobile: updatedMobile,
          },
        };
      });
    };

    const handleMobileChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            mobile: val,
          },
        };
      });
    };

    const handlePcSizeChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            pcSize: val,
            mobileSize: current.useSame ? val : (current.mobileSize || val),
          },
        };
      });
    };

    const handleMobileSizeChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            mobileSize: val,
          },
        };
      });
    };

    const handlePcWeightChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            pcWeight: val,
            mobileWeight: current.useSame ? val : (current.mobileWeight || val),
          },
        };
      });
    };

    const handleMobileWeightChange = (val: string) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            mobileWeight: val,
          },
        };
      });
    };

    const handleUseSameToggle = (checked: boolean) => {
      setTextCustomizer((prev) => {
        const current = prev[key] || { pc: '', mobile: '', useSame: true };
        return {
          ...prev,
          [key]: {
            ...current,
            useSame: checked,
            mobile: checked ? current.pc : current.mobile,
            mobileSize: checked ? (current.pcSize || '') : (current.mobileSize || ''),
            mobileWeight: checked ? (current.pcWeight || '') : (current.mobileWeight || ''),
          },
        };
      });
    };

    return (
      <div className="p-6 rounded-2xl bg-[#181726]/90 border border-white/10 space-y-5 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <label className="text-lg font-black text-amber-300">
            {label}
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={item.useSame}
              onChange={(e) => handleUseSameToggle(e.target.checked)}
              className="w-5 h-5 rounded bg-[#0F0E17] border-white/30 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-base font-bold text-slate-100 hover:text-white transition-colors">
              PC용 문구 및 글자 스타일과 동일하게 사용 (모바일 연동)
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PC 문구 & 스타일 */}
          <div className="space-y-4 p-5 rounded-xl bg-[#0F0E17] border border-white/15">
            <div className="flex items-center justify-between text-base font-extrabold text-slate-100 border-b border-white/10 pb-3">
              <span>💻 PC용 설정</span>
              <span className="text-sm text-amber-400 font-mono">
                {item.pcSize || 'Def-Size'} / {item.pcWeight || 'Def-Weight'}
              </span>
            </div>

            <textarea
              rows={4}
              value={item.pc}
              onChange={(e) => handlePcChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 whitespace-pre-line leading-relaxed resize-y min-h-[120px]"
            />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-base font-bold text-slate-200 block mb-2">
                  PC 글씨 크기
                </label>
                <select
                  value={item.pcSize || ''}
                  onChange={(e) => handlePcSizeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-lg focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-base font-bold text-slate-200 block mb-2">
                  PC 글씨 굵기
                </label>
                <select
                  value={item.pcWeight || ''}
                  onChange={(e) => handlePcWeightChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-lg focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {FONT_WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile 문구 & 스타일 */}
          <div className={`space-y-4 p-5 rounded-xl border ${
            item.useSame ? 'bg-[#0D0C16]/80 border-white/10' : 'bg-[#0F0E17] border-white/15'
          }`}>
            <div className="flex items-center justify-between text-base font-extrabold text-slate-100 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span>📱 모바일용 설정</span>
                {item.useSame && (
                  <span className="text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-wider">
                    Linked
                  </span>
                )}
              </div>
              <span className="text-sm text-amber-400 font-mono">
                {(item.useSame ? item.pcSize : item.mobileSize) || 'Def-Size'} / {(item.useSame ? item.pcWeight : item.mobileWeight) || 'Def-Weight'}
              </span>
            </div>

            <textarea
              rows={4}
              value={item.mobile}
              onChange={(e) => handleMobileChange(e.target.value)}
              disabled={item.useSame}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-lg border text-base focus:outline-none whitespace-pre-line leading-relaxed resize-y min-h-[120px] ${
                item.useSame
                  ? 'bg-black/40 border-white/5 text-slate-500 cursor-not-allowed'
                  : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
              }`}
            />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-base font-bold text-slate-200 block mb-2">
                  모바일 글씨 크기
                </label>
                <select
                  value={(item.useSame ? item.pcSize : item.mobileSize) || ''}
                  onChange={(e) => handleMobileSizeChange(e.target.value)}
                  disabled={item.useSame}
                  className={`w-full px-4 py-3 rounded-lg border text-lg focus:outline-none ${
                    item.useSame
                      ? 'bg-black/40 border-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 cursor-pointer'
                  }`}
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-base font-bold text-slate-200 block mb-2">
                  모바일 글씨 굵기
                </label>
                <select
                  value={(item.useSame ? item.pcWeight : item.mobileWeight) || ''}
                  onChange={(e) => handleMobileWeightChange(e.target.value)}
                  disabled={item.useSame}
                  className={`w-full px-4 py-3 rounded-lg border text-lg focus:outline-none ${
                    item.useSame
                      ? 'bg-black/40 border-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 cursor-pointer'
                  }`}
                >
                  {FONT_WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomTextItemField = (
    item: CustomTextItem,
    onChange: (newItem: CustomTextItem) => void,
    label: string,
    placeholder?: string,
    isSingleLine?: boolean
  ) => {
    const currentItem = item || { pc: '', mobile: '', useSame: true };

    const handlePcChange = (val: string) => {
      onChange({
        ...currentItem,
        pc: val,
        mobile: currentItem.useSame ? val : currentItem.mobile,
      });
    };

    const handleMobileChange = (val: string) => {
      onChange({
        ...currentItem,
        mobile: val,
      });
    };

    const handlePcSizeChange = (val: string) => {
      onChange({
        ...currentItem,
        pcSize: val,
        mobileSize: currentItem.useSame ? val : (currentItem.mobileSize || val),
      });
    };

    const handleMobileSizeChange = (val: string) => {
      onChange({
        ...currentItem,
        mobileSize: val,
      });
    };

    const handlePcWeightChange = (val: string) => {
      onChange({
        ...currentItem,
        pcWeight: val,
        mobileWeight: currentItem.useSame ? val : (currentItem.mobileWeight || val),
      });
    };

    const handleMobileWeightChange = (val: string) => {
      onChange({
        ...currentItem,
        mobileWeight: val,
      });
    };

    const handleUseSameToggle = (checked: boolean) => {
      onChange({
        ...currentItem,
        useSame: checked,
        mobile: checked ? currentItem.pc : currentItem.mobile,
        mobileSize: checked ? (currentItem.pcSize || '') : (currentItem.mobileSize || ''),
        mobileWeight: checked ? (currentItem.pcWeight || '') : (currentItem.mobileWeight || ''),
      });
    };

    return (
      <div className="p-6 rounded-2xl bg-[#0B0A12] border border-white/15 space-y-5 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <label className="text-base font-black text-amber-300">
            {label}
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={currentItem.useSame}
              onChange={(e) => handleUseSameToggle(e.target.checked)}
              className="w-5 h-5 rounded bg-[#0F0E17] border-white/30 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm font-bold text-slate-200 hover:text-white transition-colors">
              PC용 문구 및 스타일 동일하게 사용 (모바일 연동)
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PC 문구 & 스타일 */}
          <div className="space-y-3 p-5 rounded-xl bg-[#12111E] border border-white/10">
            <div className="flex items-center justify-between text-sm font-bold text-slate-200 border-b border-white/10 pb-2">
              <span>💻 PC용 설정</span>
              <span className="text-xs text-amber-400 font-mono">
                {currentItem.pcSize || 'Def-Size'} / {currentItem.pcWeight || 'Def-Weight'}
              </span>
            </div>

            {isSingleLine ? (
              <input
                type="text"
                value={currentItem.pc}
                onChange={(e) => handlePcChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                style={{ fontSize: currentItem.pcSize && currentItem.pcSize.startsWith('text-') ? `var(--tw-${currentItem.pcSize.replace('text-', '')})` : undefined, fontWeight: currentItem.pcWeight ? currentItem.pcWeight.replace('font-', '') : undefined }}
              />
            ) : (
              <textarea
                rows={4}
                value={currentItem.pc}
                onChange={(e) => handlePcChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 whitespace-pre-line leading-relaxed resize-y min-h-[120px]"
                style={{ 
                  fontSize: currentItem.pcSize ? `clamp(14px, 1rem, 2rem)` : undefined, 
                  fontWeight: currentItem.pcWeight ? currentItem.pcWeight.replace('font-', '') : undefined 
                }}
              />
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-sm font-bold text-slate-300 block mb-1.5">PC 글씨 크기</label>
                <select
                  value={currentItem.pcSize || ''}
                  onChange={(e) => handlePcSizeChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-base focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-300 block mb-1.5">PC 글씨 굵기</label>
                <select
                  value={currentItem.pcWeight || ''}
                  onChange={(e) => handlePcWeightChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B0B14] border border-white/20 text-white text-base focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {FONT_WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile 문구 & 스타일 */}
          <div className={`space-y-3 p-5 rounded-xl border ${currentItem.useSame ? 'bg-[#0E0D18]/60 border-white/10' : 'bg-[#12111E] border-white/10'}`}>
            <div className="flex items-center justify-between text-sm font-bold text-slate-200 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span>📱 모바일용 설정</span>
                {currentItem.useSame && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                    Linked
                  </span>
                )}
              </div>
              <span className="text-xs text-amber-400 font-mono">
                {(currentItem.useSame ? currentItem.pcSize : currentItem.mobileSize) || 'Def-Size'} / {(currentItem.useSame ? currentItem.pcWeight : currentItem.mobileWeight) || 'Def-Weight'}
              </span>
            </div>

            {isSingleLine ? (
              <input
                type="text"
                value={currentItem.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
                disabled={currentItem.useSame}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-lg border text-base focus:outline-none ${
                  currentItem.useSame ? 'bg-black/30 border-white/10 text-slate-500 cursor-not-allowed' : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                }`}
                style={{ 
                  fontSize: !currentItem.useSame && currentItem.mobileSize && currentItem.mobileSize.startsWith('text-') ? `var(--tw-${currentItem.mobileSize.replace('text-', '')})` : undefined, 
                  fontWeight: !currentItem.useSame && currentItem.mobileWeight ? currentItem.mobileWeight.replace('font-', '') : undefined 
                }}
              />
            ) : (
              <textarea
                rows={4}
                value={currentItem.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
                disabled={currentItem.useSame}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-lg border text-base focus:outline-none whitespace-pre-line leading-relaxed resize-y min-h-[120px] ${
                  currentItem.useSame ? 'bg-black/30 border-white/10 text-slate-500 cursor-not-allowed' : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                }`}
                style={{ 
                  fontSize: !currentItem.useSame && currentItem.mobileSize ? `clamp(14px, 1rem, 2rem)` : undefined, 
                  fontWeight: !currentItem.useSame && currentItem.mobileWeight ? currentItem.mobileWeight.replace('font-', '') : undefined 
                }}
              />
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-sm font-bold text-slate-300 block mb-1.5">모바일 글씨 크기</label>
                <select
                  value={(currentItem.useSame ? currentItem.pcSize : currentItem.mobileSize) || ''}
                  onChange={(e) => handleMobileSizeChange(e.target.value)}
                  disabled={currentItem.useSame}
                  className={`w-full px-3 py-2.5 rounded-lg border text-base focus:outline-none ${
                    currentItem.useSame ? 'bg-black/30 border-white/10 text-slate-500 cursor-not-allowed' : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 cursor-pointer'
                  }`}
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-300 block mb-1.5">모바일 글씨 굵기</label>
                <select
                  value={(currentItem.useSame ? currentItem.pcWeight : currentItem.mobileWeight) || ''}
                  onChange={(e) => handleMobileWeightChange(e.target.value)}
                  disabled={currentItem.useSame}
                  className={`w-full px-3 py-2.5 rounded-lg border text-base focus:outline-none ${
                    currentItem.useSame ? 'bg-black/30 border-white/10 text-slate-500 cursor-not-allowed' : 'bg-[#0B0B14] border-white/20 text-white focus:border-amber-400 cursor-pointer'
                  }`}
                >
                  {FONT_WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-24">
      {/* Top Header with Save & Reset */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-4">
            <FileText className="w-8 h-8 text-amber-400" />
            <span>반응형 텍스트 & 글꼴 커스텀 CMS</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
            기기별(PC/모바일) 마케팅 문구뿐만 아니라 글씨 크기(Font Size)와 굵기(Font Weight)를 섹션별로 정밀 지정할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={handleResetSectionTexts}
            className="px-6 py-4 rounded-xl bg-[#1E1D2E] hover:bg-[#2B2A3E] text-slate-200 font-bold text-base flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-slate-400" />
            <span>설정 전체 초기화</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Check className="w-5 h-5" />
            <span>설정 저장하기</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-100 text-base font-semibold flex items-center gap-3 shadow-lg">
          <Check className="w-6 h-6 text-emerald-400 shrink-0" />
          <span>기기별 모바일 / PC 맞춤 텍스트 문구 및 글자 크기/굵기가 정상 저장되어 실시간 반영되었습니다.</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-px scrollbar-none">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`px-6 py-4 text-sm sm:text-base font-black flex items-center gap-3 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{sec.name}</span>
            </button>
          );
        })}
      </div>


      {/* Form Content Area */}
      <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Hero Section Inputs */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">1. 히어로 메인 헤드라인 & 설명 문구 설정</h4>
                <p className="text-xs text-slate-400 mt-0.5">첫 화면 최상단에 나타나는 뱃지, 헤드라인, 보조 설명 문구 및 글씨 스타일입니다.</p>
              </div>
              {renderCustomField('heroBadge', '헤드라인 상단 뱃지 문구')}
              {renderCustomField('heroTitleLine1', '메인 헤드라인 1행')}
              {renderCustomField('heroTitleHighlight', '메인 헤드라인 강조 문구 (노란색 글씨)')}
              {renderCustomField('heroTitleLine2', '메인 헤드라인 2행 마무리 (빈 칸 가능)')}
              {renderCustomField('heroDescription1', '서브 설명 1행')}
              {renderCustomField('heroDescription2', '서브 설명 2행')}

              {/* 3대 포인트 카드 (01, 02, 03번) 문구 관리 */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                  <h4 className="text-base font-black text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>포인트 카드 (개별 리스트) 관리</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddHeroPill}
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" /> 카드 추가
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  히어로 하단 핵심 특장점 카드를 자유롭게 추가/삭제하고 순서를 관리합니다.
                </p>

                <div className="space-y-4">
                  {heroPills.map((pill, index) => (
                    <div key={pill.id} className="p-4 rounded-2xl bg-[#0F0E17] border border-amber-500/20 space-y-3 relative group">
                      <div className="text-xs font-black text-amber-400 flex items-center justify-between">
                        <span>📌 [{pill.num}번 카드] 포인트 카드</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteHeroPill(pill.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {renderCustomTextItemField(pill.title, (newTitle) => handleUpdateHeroPill(pill.id, { title: newTitle }), `${pill.num}번 카드 메인 제목`, '제목을 입력하세요', true)}
                      {renderCustomTextItemField(pill.desc, (newDesc) => handleUpdateHeroPill(pill.id, { desc: newDesc }), `${pill.num}번 카드 서브 설명`, '설명을 입력하세요')}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3대 포인트 카드 공통 스타일 조절 기능 */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                <div className="border-b border-white/5 pb-2">
                  <h4 className="text-base font-black text-emerald-400 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span>포인트 카드 통합 글씨 크기 및 굵기 커스텀 설정</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    개별 항목 설정 외에도 포인트 카드 타이틀 및 설명의 기본 폰트 사이즈와 굵기를 직관적으로 일괄 변경할 수 있습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#181726]/80 border border-white/5 shadow-inner">
                  {/* 제목 크기 선택 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300 block">
                      제목 기본 글씨 크기 (Title Font Size)
                    </label>
                    <select
                      value={heroPillStyle.titleFontSize}
                      onChange={(e) => setHeroPillStyle(prev => ({ ...prev, titleFontSize: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="text-xs sm:text-sm">text-xs (12px ~ 14px) - 아주 작게</option>
                      <option value="text-sm sm:text-base">text-sm (14px ~ 16px) - 작게</option>
                      <option value="text-base sm:text-lg">text-base (16px ~ 18px) - 보통 [기본값]</option>
                      <option value="text-lg sm:text-xl">text-lg (18px ~ 20px) - 크게</option>
                      <option value="text-xl sm:text-2xl">text-xl (20px ~ 24px) - 더 크게</option>
                      <option value="text-2xl sm:text-3xl">text-2xl (24px ~ 30px) - 매우 크게</option>
                    </select>
                  </div>

                  {/* 제목 굵기 선택 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300 block">
                      제목 기본 글씨 굵기 (Title Font Weight)
                    </label>
                    <select
                      value={heroPillStyle.titleFontWeight}
                      onChange={(e) => setHeroPillStyle(prev => ({ ...prev, titleFontWeight: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="font-normal">Regular (400 - 보통)</option>
                      <option value="font-semibold">SemiBold (600 - 굵게)</option>
                      <option value="font-bold">Bold (700 - 볼드)</option>
                      <option value="font-extrabold">ExtraBold (800 - 두껍게 [기본값])</option>
                      <option value="font-black">Black (900 - 아주 두껍게)</option>
                    </select>
                  </div>

                  {/* 서브 설명 크기 선택 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      서브 설명 기본 글씨 크기 (Desc Font Size)
                    </label>
                    <select
                      value={heroPillStyle.descFontSize}
                      onChange={(e) => setHeroPillStyle(prev => ({ ...prev, descFontSize: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="text-[11px] sm:text-xs">text-[11px] (11px ~ 12px) - 아주 작게</option>
                      <option value="text-xs sm:text-sm">text-xs (12px ~ 14px) - 보통 [기본값]</option>
                      <option value="text-sm sm:text-base">text-sm (14px ~ 16px) - 크게</option>
                      <option value="text-base sm:text-lg">text-base (16px ~ 18px) - 더 크게</option>
                    </select>
                  </div>

                  {/* 서브 설명 굵기 선택 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      서브 설명 기본 글씨 굵기 (Desc Font Weight)
                    </label>
                    <select
                      value={heroPillStyle.descFontWeight}
                      onChange={(e) => setHeroPillStyle(prev => ({ ...prev, descFontWeight: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="font-normal">Regular (400 - 보통 [기본값])</option>
                      <option value="font-medium">Medium (500 - 미디엄)</option>
                      <option value="font-semibold">SemiBold (600 - 굵게)</option>
                      <option value="font-bold">Bold (700 - 볼드)</option>
                      <option value="font-extrabold">ExtraBold (800 - 두껍게)</option>
                      <option value="font-black">Black (900 - 아주 두껍게)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Section Inputs */}
          {activeSection === 'overview' && (
            <div className="space-y-5">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">2. 사업개요 정보 설정</h4>
                <p className="text-xs text-slate-400 mt-0.5">단지 기본 스펙 정보 카드 및 분양 사무실 세부 정보와 각각의 글꼴 스타일입니다.</p>
              </div>
              {renderCustomField('overviewLocation', '대지 위치 명칭')}
              {renderCustomField('overviewLocationDetail', '대지 위치 부가 설명')}
              {renderCustomField('overviewParcelsSummary', '필지 구성 요약')}
              {renderCustomField('overviewParcelsDetail', '필지 구성 부가 설명')}
              {renderCustomField('overviewPriceStart', '토지 최소 시작 가격')}
              {renderCustomField('overviewPriceDetail', '토지 가격 부가 설명')}
              {renderCustomField('officeName', '분양 사무실 상호명')}
              {renderCustomField('officeAddress', '분양 사무실 실소재지 주소')}
            </div>
          )}

          {/* Interactive Map Section Inputs */}
          {activeSection === 'map' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">3. 지적도 & 필지 설명 문구 및 스타일 설정</h4>
                <p className="text-xs text-slate-400 mt-0.5">인터랙티브 번호 지적도 섹션의 메인 안내 문구와 상단 필터 뱃지의 글꼴 스타일을 조정합니다.</p>
              </div>
              {renderCustomField('mapHeadline', '지적도 안내 뱃지 문구 (영문)')}
              {renderCustomField('mapTitle', '지적도 메인 제목')}
              {renderCustomField('mapDescription', '지적도 하단 서브 안내 설명문 (줄바꿈 지원)')}

              <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                <h4 className="text-base font-black text-amber-400">필터 뱃지 버튼 글꼴 스타일</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#181726]/80 border border-white/5 shadow-inner">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300 block">모바일 글씨 크기</label>
                    <select
                      value={badgeStyle.fontSize}
                      onChange={(e) => setBadgeStyle(prev => ({ ...prev, fontSize: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {FONT_SIZE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300 block">모바일 글씨 굵기</label>
                    <select
                      value={badgeStyle.fontWeight}
                      onChange={(e) => setBadgeStyle(prev => ({ ...prev, fontWeight: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B14] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {FONT_WEIGHT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visit Reservation Section Inputs */}
          {activeSection === 'reservation' && (
            <div className="space-y-5">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">4. 현장방문 예약 안내 및 위치/주소 정보 설정</h4>
                <p className="text-xs text-slate-400 mt-0.5">현장 투어 접수 및 유선 상담 안내 문구와 예약 섹션 하단에 표시되는 현장/사무실 주소 및 설명 전체입니다.</p>
              </div>
              {renderCustomField('reservationTitle', '예약 섹션 메인 타이틀')}
              {renderCustomField('reservationDescription', '예약 섹션 서브 설명문')}
              {renderCustomField('reservationNotes', '하단 유의사항 / 상담 가능 시간 표기')}

              <div className="pt-6 border-t border-white/10 space-y-4">
                <h5 className="text-sm font-black text-amber-300">📍 예약 섹션 동적 주소 및 위치 정보 설정</h5>
                {renderCustomField('siteAddressTitle', '현장 위치 홍보관 제목')}
                {renderCustomField('siteAddressText', '현장 주소 문구')}
                {renderCustomField('siteAddressDesc', '현장 추가 설명 (예: 전곡역 5분 등)')}
                {renderCustomField('officeAddressTitle', '분양 사무실 제목')}
                {renderCustomField('officeAddressText', '분양 사무실 주소 문구')}
                {renderCustomField('officeAddressDesc', '분양 사무실 추가 설명 (예: 전곡역 1번 출구 앞 등)')}
              </div>
            </div>
          )}

          {/* Special Values Section Inputs */}
          {activeSection === 'special' && (
            <div className="space-y-5">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">5. 4대 특장점 내용 설정</h4>
                <p className="text-xs text-slate-400 mt-0.5">단지 선택의 이유인 핵심 4대 강점의 제목과 상세내용 및 글꼴 스타일입니다.</p>
              </div>
              {renderCustomField('specialValue1Title', '특장점 1 제목')}
              {renderCustomField('specialValue1Desc', '특장점 1 상세 설명')}
              {renderCustomField('specialValue2Title', '특장점 2 제목')}
              {renderCustomField('specialValue2Desc', '특장점 2 상세 설명')}
              {renderCustomField('specialValue3Title', '특장점 3 제목')}
              {renderCustomField('specialValue3Desc', '특장점 3 상세 설명')}
              {renderCustomField('specialValue4Title', '특장점 4 제목')}
              {renderCustomField('specialValue4Desc', '특장점 4 상세 설명')}
            </div>
          )}

          {/* Location Premium Section Inputs */}
          {activeSection === 'location' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-base font-black text-white">6. 입지 프리미엄 타이틀 & 개별 카드 동적 관리</h4>
                <p className="text-xs text-slate-400 mt-0.5">상단 요약 카드 4개와 하단 상세 카드 목록을 각각 독립적으로 수정, 추가, 삭제할 수 있습니다.</p>
              </div>

              {renderCustomField('locationTitle', '입지 프리미엄 메인 타이틀')}
              {renderCustomField('locationDescription', '입지 프리미엄 보조 설명')}

              {/* 1. 상단 요약 카드 4개 관리 (핵심 하이라이트 배너) */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-sm font-black text-purple-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>입지 프리미엄 상단 요약 카드 ({topLocationCards.length}개)</span>
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      상단에 노출되는 핵심 하이라이트 배너 4개의 태그, 제목, 설명을 하단 카드와 독립적으로 관리합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTopLocationCard}
                    className="px-3.5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ 상단 카드 추가</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {topLocationCards.map((card, idx) => (
                    <div
                      key={card.id || `top-loc-${idx}`}
                      className="p-5 rounded-2xl bg-[#181324] border border-purple-500/20 shadow-lg space-y-4 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white">
                            상단 요약 카드 #{idx + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTopLocationCard(card.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>카드 삭제</span>
                        </button>
                      </div>

                      {/* 카테고리 / 태그 입력 */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-[#0B0A12] border border-white/5">
                        <label className="text-xs font-bold text-purple-400 block">
                          상단 카드 태그 / 라벨 (예: 초역세권, 세제 혜택, 명문대 혜택, 수변 조망 등)
                        </label>
                        <input
                          type="text"
                          value={card.category}
                          onChange={(e) => handleUpdateTopLocationCardCategory(card.id, e.target.value)}
                          placeholder="태그 문구"
                          className="w-full px-3 py-2 rounded-lg bg-[#0F0E17] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      {/* 카드 메인 제목 */}
                      {renderCustomTextItemField(
                        card.title,
                        (updatedTitle) => handleUpdateTopLocationCardTitle(card.id, updatedTitle),
                        '상단 카드 메인 제목 (모바일 / PC 분리 입력)',
                        '상단 카드 메인 제목 입력',
                        true
                      )}

                      {/* 카드 세부 설명 문구 */}
                      {renderCustomTextItemField(
                        card.description,
                        (updatedDesc) => handleUpdateTopLocationCardDescription(card.id, updatedDesc),
                        '상단 카드 세부 설명 문구 (textarea, 줄바꿈 지원)',
                        '세부 설명 문구를 입력해 주세요',
                        false
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleAddTopLocationCard}
                    className="w-full py-3.5 rounded-xl border-2 border-dashed border-purple-500/40 hover:border-purple-400 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ 새로운 상단 요약 카드 추가</span>
                  </button>
                </div>
              </div>

              {/* 2. 하단 상세 카드 목록 관리 */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-sm font-black text-amber-300 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>입지 프리미엄 하단 상세 카드 목록 ({locationCards.length}개)</span>
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      하단에 노출되는 상세 카드 목록의 카테고리 태그, 제목, 상세 설명을 독립적으로 관리합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLocationCard}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ 하단 카드 추가</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {locationCards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="p-5 rounded-2xl bg-[#141322] border border-amber-500/20 shadow-lg space-y-4 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white">
                            입지 프리미엄 카드 #{idx + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLocationCard(card.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>카드 삭제</span>
                        </button>
                      </div>

                      {/* 카테고리 / 태그 입력 */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-[#0B0A12] border border-white/5">
                        <label className="text-xs font-bold text-emerald-400 block">
                          카드 카테고리 / 태그 (예: 교통 환경, 생활 환경, 교육 환경, 미래 가치 등)
                        </label>
                        <input
                          type="text"
                          value={card.category}
                          onChange={(e) => handleUpdateLocationCardCategory(card.id, e.target.value)}
                          placeholder="카테고리 또는 태그 문구"
                          className="w-full px-3 py-2 rounded-lg bg-[#0F0E17] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* 카드 메인 제목 */}
                      {renderCustomTextItemField(
                        card.title,
                        (updatedTitle) => handleUpdateLocationCardTitle(card.id, updatedTitle),
                        '카드 메인 제목 (모바일 / PC 분리 입력)',
                        '카드 메인 제목 입력',
                        true
                      )}

                      {/* 카드 세부 설명 문구 */}
                      {renderCustomTextItemField(
                        card.description,
                        (updatedDesc) => handleUpdateLocationCardDescription(card.id, updatedDesc),
                        '카드 세부 설명 문구 (textarea, 줄바꿈 whitespace-pre-line 지원)',
                        '세부 설명 문구를 입력해 주세요 (줄바꿈 지원)',
                        false
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleAddLocationCard}
                    className="w-full py-3.5 rounded-xl border-2 border-dashed border-amber-400/40 hover:border-amber-400 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ 새로운 입지 프리미엄 카드 추가</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Buttons inside Container too */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>현재 변경된 텍스트 및 글꼴 스타일 저장</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
