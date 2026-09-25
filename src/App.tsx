import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OverviewSection, OverviewPhotoSlider } from './components/OverviewSection';
import { LocationSection, TopLocationCards } from './components/LocationSection';
import { SpecialValuesSection } from './components/SpecialValuesSection';
import { ParcelsSection } from './components/ParcelsSection';

import { ReservationSection } from './components/ReservationSection';
import { ReservationModal } from './components/ReservationModal';
import { PhoneConsultModal } from './components/PhoneConsultModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Phone, ShieldCheck, Calendar } from 'lucide-react';

declare function gtag(...args: any[]): void;
declare function kakaoPixel(trackId: string): any;

const WebsiteContent: React.FC = () => {
  const {
    isAdmin,
    setIsAdmin,
    config,
    openReservationModal,
    openPhoneConsultModal,
    isAdminLoginOpen,
    setIsAdminLoginOpen
  } = useApp();

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen text-slate-100 flex flex-col bg-[#0B0B0F] selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* PC Version Only: Overview Section right below Hero/Scroll */}
      <div className="hidden md:block">
        <OverviewSection />
      </div>

      {/* Mobile Version Only: Slide Image Area from Overview Section right above Parcels Section */}
      <div
        id="mobile-photo-slider"
        className="block md:hidden w-full bg-[#0B0B0F]"
      >
        <OverviewPhotoSlider />

        {/* 모바일 화면 전용: 현장 사진 Carousel/갤러리 바로 아래에 배치되는 입지 프리미엄 핵심 카드 4개 */}
        <div className="px-3.5 sm:px-6 py-5 bg-[#0B0B0F] border-b border-white/10">
          <TopLocationCards />
        </div>
      </div>

      {/* 3. Section 4: Parcels & Cadastral Map */}
      <ParcelsSection />

      {/* Duplicate Reservation Section right below Parcels Section */}
      <ReservationSection />

      {/* Mobile Version Only: Overview Section in original position */}
      <div className="block md:hidden">
        <OverviewSection />
      </div>

      {/* 5. Section 2: Location */}
      <LocationSection />

      {/* 6. Section 3: Special Values */}
      <SpecialValuesSection />

      {/* 8. Section 6: Onsite Visit Reservation Form */}
      <ReservationSection />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating Sticky Quick Action Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 sm:gap-3.5">

        {/* PC 전화 상담 버튼 */}
        <button
          id="floating-call-btn-pc"
          type="button"
          onClick={() => openPhoneConsultModal()}
          className="hidden lg:flex group items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg lg:text-xl shadow-2xl shadow-amber-500/50 border-2 border-amber-300 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 fill-current animate-bounce" />
          <span>{config.phone}</span>
        </button>

        {/* 모바일 전화 직통 연결 버튼 */}
        <a
          id="floating-call-btn-mobile"
          href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
          onClick={() => {
            // Google Ads 전화 전환
            gtag('event', 'conversion', {
              send_to: 'AW-18267857134/IPrkCMnE-oQdEO7B5YZE'
            });

            // Kakao 잠재고객(전화 상담) 전환
            kakaoPixel('956063720725496209').participation();
          }}
          className="flex lg:hidden group items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg lg:text-xl shadow-2xl shadow-amber-500/50 border-2 border-amber-300 transition-all duration-300 hover:scale-105"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 fill-current animate-bounce" />
          <span>{config.phone}</span>
        </a>

        {/* Floating Quick Reservation Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openReservationModal()}
            className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-[#00593B] hover:bg-[#006E49] text-white font-black text-sm sm:text-base lg:text-lg shadow-2xl border-2 border-emerald-400/40 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
            <span>현장방문 예약</span>
          </button>
        </div>
      </div>

      {/* Quick Reservation Modal */}
      <ReservationModal />

      {/* PC Phone Consultation Modal */}
      <PhoneConsultModal />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={() => setIsAdmin(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <WebsiteContent />
    </AppProvider>
  );
}