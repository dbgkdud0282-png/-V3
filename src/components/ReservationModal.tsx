import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone, CheckCircle, MessageSquare, Calendar, Send, ShieldCheck } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const {
    isReservationModalOpen,
    closeReservationModal,
    reservationTargetParcel,
    addReservation,
    openPhoneConsultModal,
    isMobile,
  } = useApp();

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [interestedParcel, setInterestedParcel] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSmsBody, setLastSmsBody] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (reservationTargetParcel) {
      setInterestedParcel(reservationTargetParcel);
    }
    setIsSuccess(false);
  }, [reservationTargetParcel, isReservationModalOpen]);

  if (!isReservationModalOpen) return null;

  // Intercept on PC (when isMobile from context is false OR screen width is wide)
  const isActuallyPc = !isMobile && (typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  if (isActuallyPc) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#141322] border-2 border-amber-500/40 rounded-3xl w-full max-w-md relative shadow-2xl p-8 space-y-6 animate-scaleUp">
          {/* Close Button */}
          <button
            onClick={closeReservationModal}
            className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center py-4 space-y-5">
            {/* Header Icon */}
            <div className="text-5xl animate-bounce">📢</div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                현장방문 예약 안내
              </h3>
              <div className="h-0.5 w-16 bg-amber-400 mx-auto rounded-full my-3"></div>
            </div>

            <p className="text-slate-200 text-base leading-relaxed font-semibold whitespace-pre-line">
              PC 환경에서는 전화문의 또는 문자문의로 연락 주시면 친절하고 빠른 안내 도와드리겠습니다!
            </p>

            {/* 대표 전화 안내 박스 */}
            <div className="p-5 rounded-2xl bg-[#1B1A2C]/90 border border-amber-400/30 text-center shadow-inner">
              <span className="text-slate-400 text-xs font-bold block mb-1">골든포레스트 분양 본부</span>
              <strong className="text-amber-300 font-black text-2xl tracking-tight block">
                📞 010-8389-0045
              </strong>
            </div>

            <div className="pt-4">
              <button
                onClick={closeReservationModal}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const buildSmsMessage = () => {
    let body = `[골든포레스트 현장방문 예약]\n`;
    body += `• 성함: ${name.trim()}\n`;
    if (phone.trim()) {
      body += `• 연락처: ${phone.trim()}\n`;
    }
    body += `• 방문일자: ${visitDate}\n`;
    if (interestedParcel) {
      body += `• 관심필지: ${interestedParcel.trim()}\n`;
    }
    if (notes.trim()) {
      body += `• 요청사항: ${notes.trim()}\n`;
    }
    return body;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }

    if (isDesktop && !phone.trim()) {
      alert('상담 받으실 전화번호(연락처)를 입력해주세요.');
      return;
    }

    if (!visitDate) {
      alert('방문 희망 일자를 선택해주세요.');
      return;
    }

    // 1. 내부 관리자 CMS 예약 목록에 등록
    addReservation({
      name: name.trim(),
      phone: phone.trim() || '문자 발송',
      visitDate,
      visitTime: '일정 협의',
      interestedParcel: interestedParcel || '전체 필지 상담',
      preferredSize: '26개 필지 맞춤 상담',
      notes: notes.trim(),
    });

    // 2. PC 환경과 모바일 환경 동작 분리
    if (isDesktop) {
      // PC: 문자 앱을 열지 않고 관리자 CMS에 바로 등록 후 성공 화면 표시
      setIsSuccess(true);
    } else {
      // 모바일: 기존 그대로 문자 앱 본문 연동 및 실행
      const smsBody = buildSmsMessage();
      setLastSmsBody(smsBody);
      const smsUrl = `sms:010-8389-0045?body=${encodeURIComponent(smsBody)}`;
      window.location.href = smsUrl;
      setIsSuccess(true);
    }
  };

  const handleResendSms = () => {
    if (!lastSmsBody) return;
    const smsUrl = `sms:010-8389-0045?body=${encodeURIComponent(lastSmsBody)}`;
    window.location.href = smsUrl;
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setVisitDate('');
    setInterestedParcel('');
    setNotes('');
    setIsSuccess(false);
    closeReservationModal();
  };

  const todayString = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-[#141322] border border-amber-500/30 rounded-3xl w-full relative shadow-2xl animate-scaleUp ${
        isDesktop ? 'max-w-xl p-8 space-y-6' : 'max-w-lg p-5 space-y-3.5'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
        >
          <X className={isDesktop ? "w-6 h-6" : "w-5 h-5"} />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className={`rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 ${
              isDesktop ? 'w-16 h-16' : 'w-14 h-14'
            }`}>
              <CheckCircle className={isDesktop ? "w-8 h-8" : "w-7 h-7"} />
            </div>

            {isDesktop ? (
              <>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  현장방문 예약이 정상 접수되었습니다!
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                  입력하신 예약 정보가 골든포레스트 관리자 시스템에 실시간으로 등록되었습니다.<br />
                  전문 분양 상담사가 확인 후 남겨주신 연락처로 신속히 연락드리겠습니다.
                </p>

                {/* PC 접수 확인 카드 */}
                <div className="p-5 rounded-2xl bg-[#1B1A2C] border border-emerald-500/30 text-left text-sm space-y-3 text-slate-300">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400 text-sm">접수 상태</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                      실시간 접수 완료 (대기중)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate-400 block text-xs">예약자 성함</span>
                      <strong className="text-white font-bold text-base">{name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">연락처</span>
                      <strong className="text-amber-300 font-bold text-base">{phone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">방문 희망일</span>
                      <strong className="text-white font-bold text-base">{visitDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">관심 필지</span>
                      <strong className="text-white font-bold text-base">{interestedParcel || '전체 필지 상담'}</strong>
                    </div>
                  </div>
                  {notes && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block text-xs">요청사항</span>
                      <p className="text-slate-200 text-sm mt-0.5">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-center">
                  <button
                    onClick={handleResetAndClose}
                    className="px-10 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-white">
                  문자 앱으로 예약 내용이 전송되었습니다!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  입력하신 예약 정보가 문자 메시지 본문에 자동으로 입력되었습니다.<br />
                  문자 앱에서 [전송]을 누르시면 담당자가 확인 후 신속히 안내해 드립니다.
                </p>

                {/* 입력 내용 요약 카드 */}
                <div className="p-3.5 rounded-2xl bg-[#1B1A2C] border border-white/10 text-left text-xs space-y-1 text-slate-300 whitespace-pre-line font-mono">
                  {lastSmsBody}
                </div>

                <div className="pt-2 flex items-center justify-center gap-2.5">
                  <button
                    onClick={handleResendSms}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>문자 앱 다시 열기</span>
                  </button>
                  <button
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div>
              <span className={`font-bold text-amber-400 uppercase tracking-wider block mb-1 ${
                isDesktop ? 'text-xs' : 'text-[11px]'
              }`}>
                {isDesktop ? 'VIP VISIT RESERVATION · ONLINE FORM' : 'GOLDEN FOREST VISIT RESERVATION'}
              </span>
              <h3 className={isDesktop ? "text-2xl sm:text-3xl font-black text-white" : "text-xl sm:text-2xl font-black text-white"}>
                {isDesktop ? '현장방문 온라인 예약 신청' : '현장방문 예약 신청'}
              </h3>
              <p className={`text-slate-400 mt-1 ${isDesktop ? 'text-sm' : 'text-xs'}`}>
                {interestedParcel
                  ? `지정 필지: ${interestedParcel}`
                  : isDesktop
                  ? '정보를 입력하시면 관리자 시스템에 실시간 등록되어 전문 상담사가 직접 안내해 드립니다.'
                  : '원하시는 일정에 전문 상담사가 현장을 직접 안내해 드립니다.'}
              </p>
            </div>

            {/* 직통 전화 상담 바 (PC: 전화 상담 안내 팝업 모달창 오픈, 모바일: 직통 전화 연결) */}
            {isDesktop ? (
              <div className="flex items-center justify-between rounded-2xl bg-[#1B1A2C] border border-white/10 p-4">
                <div>
                  <span className="font-bold text-slate-300 block text-sm">
                    직통 전화 빠른 상담
                  </span>
                  <span className="text-slate-400 text-xs">
                    010-8389-0045 (분양 총괄 본부)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openPhoneConsultModal()}
                  className="rounded-xl bg-[#00593B] hover:bg-[#006E49] text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950/40 border border-emerald-400/30 py-2.5 px-4 text-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-200" />
                  <span>[전화로 문의하기]</span>
                </button>
              </div>
            ) : (
              <a
                href="tel:010-8389-0045"
                className="w-full py-3 px-4 rounded-xl bg-[#00593B] hover:bg-[#006E49] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/40 border border-emerald-400/30"
              >
                <Phone className="w-4 h-4 text-emerald-200" />
                <span>[전화로 문의하기 (010-8389-0045)]</span>
              </a>
            )}

            <form onSubmit={handleSubmit} className={isDesktop ? "space-y-4" : "space-y-3"}>
              <div>
                <label className={`block font-bold text-slate-300 mb-1 ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>
                  성함 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl bg-[#1B1A2C] border border-white/10 text-white focus:outline-none focus:border-amber-400 transition-colors ${
                    isDesktop ? 'px-4 py-3 text-base' : 'px-3.5 py-2 text-sm sm:text-base'
                  }`}
                />
              </div>

              {/* PC 환경에서는 전화번호(연락처) 입력 칸 필수 제공 */}
              {isDesktop && (
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1.5">
                    연락처 (휴대폰 번호) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="예: 010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1A2C] border border-amber-400/30 text-white text-base focus:outline-none focus:border-amber-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              )}

              <div>
                <label htmlFor="visit-date" className={`block font-bold text-slate-300 mb-1 ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>
                  방문 희망 일자 <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="visit-date"
                    type="date"
                    required
                    min={todayString}
                    value={visitDate}
                    onClick={(e) => {
                      try {
                        (e.currentTarget as any).showPicker?.();
                      } catch (_) {}
                    }}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className={`w-full rounded-xl bg-[#1B1A2C] border border-white/10 text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer [color-scheme:dark] ${
                      isDesktop ? 'px-4 py-3 text-base' : 'px-3.5 py-2 text-sm sm:text-base'
                    }`}
                  />
                  <div
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                      if (input) {
                        try {
                          (input as any).showPicker?.();
                        } catch (_) {
                          input.focus();
                        }
                      }
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer pointer-events-auto"
                  >
                    <Calendar className={isDesktop ? "w-5 h-5" : "w-4.5 h-4.5"} />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block font-bold text-slate-300 mb-1 ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>
                  문의 및 요청사항
                </label>
                <input
                  type="text"
                  placeholder="예: 토지 인허가 서류 확인 요청, 주택 가설계 상담 등"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full rounded-xl bg-[#1B1A2C] border border-white/10 text-white focus:outline-none focus:border-amber-400 transition-colors ${
                    isDesktop ? 'px-4 py-3 text-base placeholder:text-slate-500' : 'px-3.5 py-2 text-sm sm:text-base placeholder:text-slate-500'
                  }`}
                />
              </div>

              {/* 하단 전송 버튼 (PC: 예약 접수하기, 모바일: 문자 앱 바로 연결) */}
              <div className="pt-1.5">
                {isDesktop ? (
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-5 h-5 text-slate-950" />
                    <span>[예약 접수하기]</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>[문자로 예약하기]</span>
                  </button>
                )}

                <p className={`text-slate-400 text-center mt-1.5 ${isDesktop ? 'text-xs' : 'text-xs'}`}>
                  {isDesktop
                    ? '신청 즉시 관리자 CMS에 실시간 접수되며, 전문 상담사가 신속히 확인하여 안내드립니다.'
                    : '클릭 시 입력하신 성함·일정이 문자 앱 본문에 자동으로 채워져 바로 전송됩니다.'}
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

