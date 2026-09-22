import React, { useState } from 'react';
import { Phone, X, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhoneConsultModal: React.FC = () => {
  const { config, isPhoneConsultModalOpen, setIsPhoneConsultModalOpen } = useApp();
  const [isCopied, setIsCopied] = useState(false);

  if (!isPhoneConsultModalOpen) return null;

  const handleCopyNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(config.phone);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] hidden lg:flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsPhoneConsultModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-[#131224] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsPhoneConsultModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 아이콘 및 배지 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-950/50">
            <Phone className="w-8 h-8 animate-pulse" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
            {config.brandName} 분양 총괄 본부
          </span>
        </div>

        {/* 안내 텍스트 */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            직통 전화 상담 안내
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            필지 분양가, 현황 및 방문 예약 문의 시 담당자가 친절하고 신속하게 상담해 드립니다.
          </p>
        </div>

        {/* 번호 카드 박스 */}
        <div className="p-4 rounded-2xl bg-[#0B0A16] border border-emerald-500/30 space-y-2">
          <span className="text-xs text-slate-400 font-medium">직통 상담 전화번호</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-wider">
            {config.phone}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>상담 가능 시간: 연중무휴 24시간 문의 가능</span>
          </div>
        </div>

        {/* 액션 버튼 그룹 (번호 복사 & 즉시 통화) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleCopyNumber}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>번호 복사</span>
              </>
            )}
          </button>

          <a
            href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
            className="py-3 px-4 rounded-xl bg-[#00593B] hover:bg-[#006E49] text-white text-sm font-black flex items-center justify-center gap-2 border border-emerald-400/40 shadow-md shadow-emerald-950/40 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-200" />
            <span>지금 통화</span>
          </a>
        </div>
      </div>
    </div>
  );
};
