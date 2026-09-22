import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReservationSection: React.FC = () => {
  const { openReservationModal, openPhoneConsultModal, config, getCustomText, getCustomTextStyle } = useApp();

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentTitle = getCustomText('reservationTitle', '현장방문 예약 및 상담');
  const currentDesc = getCustomText('reservationDescription', '전화 및 온라인 예약으로 연락 주시면 실시간 필지 현황과 방문 일정을 즉시 안내해 드립니다.');
  const currentNotes = getCustomText('reservationNotes', '상담 가능 시간: 연중무휴');

  const siteTitle = getCustomText('siteAddressTitle', getCustomText('overviewLocation', '현장 위치 (홍보관)'));
  const siteText = getCustomText('siteAddressText', getCustomText('overviewLocationDetail', '경기도 연천군 장탄리 847-21'));
  const siteDesc = getCustomText('siteAddressDesc', '전곡역 차량 5분 · 한탄강 조망');

  const officeTitle = getCustomText('officeAddressTitle', getCustomText('officeName', '분양 사무실'));
  const officeText = getCustomText('officeAddressText', getCustomText('officeAddress', '경기도 연천군 전곡역로 67, 1층'));
  const officeDesc = getCustomText('officeAddressDesc', '전곡역 1번 출구 앞');

  const titleStyle = getCustomTextStyle('reservationTitle', 'text-4xl', 'text-3xl', 'font-black', 'font-black');
  const descStyle = getCustomTextStyle('reservationDescription', 'text-base', 'text-sm', 'font-normal', 'font-normal');
  const notesStyle = getCustomTextStyle('reservationNotes', 'text-xs', 'text-xs', 'font-semibold', 'font-semibold');

  const siteTitleStyle = getCustomTextStyle('siteAddressTitle', 'text-xs', 'text-xs', 'font-black', 'font-black');
  const siteTextStyle = getCustomTextStyle('siteAddressText', 'text-sm', 'text-xs', 'font-bold', 'font-bold');
  const siteDescStyle = getCustomTextStyle('siteAddressDesc', 'text-[11px]', 'text-[11px]', 'font-normal', 'font-normal');

  const officeTitleStyle = getCustomTextStyle('officeAddressTitle', 'text-xs', 'text-xs', 'font-black', 'font-black');
  const officeTextStyle = getCustomTextStyle('officeAddressText', 'text-sm', 'text-xs', 'font-bold', 'font-bold');
  const officeDescStyle = getCustomTextStyle('officeAddressDesc', 'text-[11px]', 'text-[11px]', 'font-normal', 'font-normal');

  return (
    <section
      id="reservation-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090810] text-white border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>VIP ONSITE CONSULTATION</span>
          </div>
          <h2 className={`text-white tracking-tight mb-3 whitespace-pre-line ${titleStyle.className}`}>
            {currentTitle}
          </h2>
          <p className={`text-slate-300 whitespace-pre-line ${descStyle.className}`}>
            {currentDesc}
          </p>
        </div>

        {/* Quick Action Buttons Box */}
        <div className="mb-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141322] border border-amber-500/30 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* [전화로 문의하기] 버튼 (모바일: 바로 tel 링크 / PC: 직통 전화 상담 안내 팝업창 오픈) */}
              {isDesktop ? (
                <button
                  id="btn-reservation-call-pc"
                  type="button"
                  onClick={() => openPhoneConsultModal()}
                  className={`py-4 px-6 rounded-2xl bg-[#00593B] hover:bg-[#006E49] text-white ${titleStyle.weight} flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/40 cursor-pointer text-left w-full`}
                >
                  <Phone className="w-5 h-5 text-emerald-200 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-emerald-200">직통 전화 상담 ({config.phone})</div>
                    <div className="text-base font-black">[전화로 문의하기]</div>
                  </div>
                </button>
              ) : (
                <a
                  id="btn-reservation-call"
                  href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                  className="py-4 px-6 rounded-2xl bg-[#00593B] hover:bg-[#006E49] text-white font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/40 cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-emerald-200 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-emerald-200">직통 전화 상담 ({config.phone})</div>
                    <div className="text-base font-black">[전화로 문의하기]</div>
                  </div>
                </a>
              )}

              {/* PC: 온라인 실시간 예약 폼 열기 / 모바일: 문자 앱 바로 연결 */}
              {isDesktop ? (
                <button
                  id="btn-reservation-pc"
                  onClick={() => openReservationModal()}
                  className="py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] border border-amber-300/40 cursor-pointer text-left"
                >
                  <Calendar className="w-5 h-5 text-slate-950 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-800 font-bold">온라인 실시간 접수 (PC)</div>
                    <div className="text-base font-black">[현장방문 예약 신청]</div>
                  </div>
                </button>
              ) : (
                <a
                  id="btn-reservation-sms"
                  href={`sms:${config.phone.replace(/[^0-9]/g, '')}?body=${encodeURIComponent('[골든포레스트 방문 예약 문의] 성함과 희망 방문 일시를 남겨주시면 신속히 연락드리겠습니다.')}`}
                  className="py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] border border-amber-300/40 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-slate-950 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-slate-800 font-bold">문자 앱 바로 연결</div>
                    <div className="text-base font-black">[문자로 예약하기]</div>
                  </div>
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5 gap-2">
              <span className={`flex items-center gap-1.5 whitespace-pre-line ${notesStyle.className}`}>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {currentNotes}
              </span>
            </div>

            {/* Dynamic Site & Office Address Guidance Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-[#100F1E] border border-amber-500/30 space-y-1.5">
                <div className={`flex items-center gap-1.5 text-amber-400 ${siteTitleStyle.weight} ${siteTitleStyle.size}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{siteTitle}</span>
                </div>
                <div className={`text-white ${siteTextStyle.weight} ${siteTextStyle.size}`}>{siteText}</div>
                <div className={`text-slate-400 ${siteDescStyle.weight} ${siteDescStyle.size}`}>{siteDesc}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#100F1E] border border-emerald-500/30 space-y-1.5">
                <div className={`flex items-center gap-1.5 text-emerald-400 ${officeTitleStyle.weight} ${officeTitleStyle.size}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{officeTitle}</span>
                </div>
                <div className={`text-white ${officeTextStyle.weight} ${officeTextStyle.size}`}>{officeText}</div>
                <div className={`text-slate-400 ${officeDescStyle.weight} ${officeDescStyle.size}`}>{officeDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

