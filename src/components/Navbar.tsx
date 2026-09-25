import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Menu, X, Home, ShieldCheck, MapPin, Sparkles, Calendar } from 'lucide-react';

declare function kakaoPixel(trackId: string): any;

export const Navbar: React.FC = () => {
  const { config, setIsAdmin, openReservationModal, openPhoneConsultModal, setIsAdminLoginOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string, isMobile = false) => {
    setMobileMenuOpen(false);

    if (isMobile) {
      // 모바일 메뉴 드로어가 닫히면서 레이아웃이 정리된 직후 정확한 위치 계산
      setTimeout(() => {
        let elem = document.getElementById(id);

        // overview-section의 경우 모바일 화면에 실제 노출되는 엘리먼트 선택
        if (id === 'overview-section') {
          const allOverviews = document.querySelectorAll('#overview-section');
          for (let i = 0; i < allOverviews.length; i++) {
            const el = allOverviews[i] as HTMLElement;
            if (el.offsetParent !== null) {
              elem = el;
              break;
            }
          }
        }

        if (!elem) return;

        // 섹션 상단 헤더 컨테이너 또는 h2 타이틀 바로 상단 배지부터 정확하게 보이도록 계산
        const headerContainer = elem.querySelector('.text-center') || elem.querySelector('h2') || elem;
        const rect = headerContainer.getBoundingClientRect();

        // 고정 헤더 높이: 80px + 여백 12px
        const fixedNavHeight = 80;
        const targetScrollTop = window.pageYOffset + rect.top - fixedNavHeight - 12;

        window.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth',
        });
      }, 50);
    } else {
      // PC 화면: 기본 스무스 스크롤 동작 보존
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0F]/90 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00593B] to-[#0A3D28] border border-emerald-500/40 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {config.brandName}
              </span>
            </div>
            <p className="text-[11px] font-medium text-emerald-400 tracking-wider">
              {config.subBrandName}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-200">
          <button
            onClick={() => scrollToSection('overview-section')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            사업개요
          </button>

          <button
            onClick={() => scrollToSection('parcels-section')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            분양현황
          </button>

          <button
            onClick={() => scrollToSection('location-section')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            입지환경
          </button>

          <button
            onClick={() => scrollToSection('special-value-section')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            특장점
          </button>

          <button
            onClick={() => scrollToSection('reservation-section')}
            className="hover:text-emerald-400 transition-colors cursor-pointer text-amber-300"
          >
            현장방문 예약
          </button>
        </nav>

        {/* PC 전화 상담 + 관리자 버튼 */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => openPhoneConsultModal()}
            className="px-4 py-2.5 rounded-full bg-[#00593B] hover:bg-[#006E49] border border-emerald-400/40 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>{config.phone}</span>
          </button>

          <button
            onClick={() => setIsAdminLoginOpen(true)}
            className="px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="관리자 CMS 콘솔로 전환"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>관리자 CMS</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">

          {/* 모바일 상단 전화 아이콘 */}
          <a
            href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
            onClick={() => {
              // Kakao 잠재고객(전화 상담) 전환
              kakaoPixel('956063720725496209').participation();
            }}
            className="p-2.5 rounded-full bg-[#00593B] text-white"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101018] border-b border-white/10 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-semibold">

            <button
              onClick={() => scrollToSection('parcels-section', true)}
              className="text-left py-2 text-slate-200 hover:text-emerald-400 cursor-pointer"
            >
              분양현황
            </button>

            <button
              onClick={() => scrollToSection('overview-section', true)}
              className="text-left py-2 text-slate-200 hover:text-emerald-400 cursor-pointer"
            >
              사업개요
            </button>

            <button
              onClick={() => scrollToSection('location-section', true)}
              className="text-left py-2 text-slate-200 hover:text-emerald-400 cursor-pointer"
            >
              입지환경
            </button>

            <button
              onClick={() => scrollToSection('special-value-section', true)}
              className="text-left py-2 text-slate-200 hover:text-emerald-400 cursor-pointer"
            >
              특장점
            </button>

            <button
              onClick={() => scrollToSection('reservation-section', true)}
              className="text-left py-2 text-amber-400 font-bold cursor-pointer"
            >
              현장방문 예약
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openReservationModal();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>현장방문 예약 신청</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminLoginOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-semibold text-center"
            >
              관리자 CMS 콘솔 열기
            </button>

          </div>
        </div>
      )}
    </header>
  );
};