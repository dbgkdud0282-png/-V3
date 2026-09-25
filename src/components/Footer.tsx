import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Phone, MapPin, Clock, Shield } from 'lucide-react';

declare function kakaoPixel(trackId: string): any;

export const Footer: React.FC = () => {
  const { config, setIsAdmin, openPhoneConsultModal } = useApp();

  return (
    <footer className="bg-[#07060B] border-t border-white/10 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Intro */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00593B] flex items-center justify-center text-white">
                <Home className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">
                  {config.brandName}
                </h4>

                <p className="text-[11px] text-amber-400 font-semibold">
                  {config.subBrandName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              한탄강의 수려한 조망과 완벽한 인프라를 품은 명품 전원주택지
            </p>
          </div>

          {/* Col 2: Project Outline */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              사업지 및 상담 정보
            </h5>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {config.overview.location}{' '}
                  {config.overview.locationDetail}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  분양사무실: 경기도 연천군 전곡역로 67, 1층 행복부동산
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.footer.consultationHours}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />

                {/* PC: 전화 상담 안내 팝업 */}
                <button
                  type="button"
                  onClick={() => openPhoneConsultModal()}
                  className="hidden lg:inline font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                  title="직통 전화 상담 안내 보기"
                >
                  {config.phone}
                </button>

                {/* 모바일: 실제 전화 연결 + Kakao 전환 */}
                <a
                  href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                  onClick={() => {
                    if (typeof kakaoPixel === 'function') {
                      kakaoPixel(
                        '956063720725496209'
                      ).participation();
                    }
                  }}
                  className="inline lg:hidden font-bold text-white hover:text-amber-400 transition-colors"
                >
                  {config.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              바로가기
            </h5>

            <ul className="space-y-2">
              <li>
                <a
                  href="#parcels-section"
                  className="hover:text-amber-400"
                >
                  분양현황 (PARCELS)
                </a>
              </li>

              <li>
                <a
                  href="#location-section"
                  className="hover:text-amber-400"
                >
                  입지환경 (한탄강 & 전곡역)
                </a>
              </li>

              <li>
                <a
                  href="#special-value-section"
                  className="hover:text-amber-400"
                >
                  특장점 (SPECIAL VALUE)
                </a>
              </li>

              <li>
                <a
                  href="#parcels-section"
                  className="hover:text-amber-400"
                >
                  필지안내 (지적도면 29구획)
                </a>
              </li>

              <li>
                <a
                  href="#reservation-section"
                  className="hover:text-amber-400 text-amber-300 font-semibold"
                >
                  현장방문 예약
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Business Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>상호: {config.footer.companyName}</span>
            <span className="mx-2">|</span>
            <span>
              사업자등록번호: {config.footer.businessNumber}
            </span>
            <span className="mx-2">|</span>
            <span>주소: {config.footer.address}</span>

            <p className="mt-1 text-slate-400 font-medium">
              분양사무실: 경기도 연천군 전곡역로 67, 1층 행복부동산
            </p>

            <p className="mt-1">
              {config.footer.copyright}
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsAdmin(true)}
              className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              관리자 모드 로그인
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};