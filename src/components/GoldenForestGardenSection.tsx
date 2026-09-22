import React, { useState } from 'react';
import { Home, Sparkles, CheckCircle2, Trees, Shield, Eye, X, ZoomIn, Train, Layers, Compass } from 'lucide-react';

interface SitePhotoItem {
  id: string;
  title: string;
  category: 'render' | 'civil' | 'station';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  features: string[];
}

export const GoldenForestGardenSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<SitePhotoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'civil' | 'render' | 'station'>('all');

  const sitePhotos: SitePhotoItem[] = [
    {
      id: 'photo-render',
      title: '골든포레스트 완공 조감도 & 프리미엄 조경',
      category: 'render',
      categoryLabel: '단지 투시도',
      imageUrl: '/assets/real/golden_forest_render_1789389192364.jpg',
      description: '도심 속 자연을 품은 품격 있는 전원주택 라이프. 인터로킹 보도블록 마당과 계단식 석축 조경, 은은한 정원 조명등이 어우러진 미래 완공 모습입니다.',
      features: ['단독 잔디정원 & 테라스', '단지 내 감성 정원등', '모던 전원주택 최적화'],
    },
    {
      id: 'photo-civil-wall',
      title: '보강토 옹벽 & 아스팔트 포장 진입도로',
      category: 'civil',
      categoryLabel: '토목 시공 실사',
      imageUrl: '/assets/real/retaining_wall_road_1789389175473.jpg',
      description: '견고하게 시공된 석재 질감의 보강토 옹벽과 블랙 안전 펜스, 그리고 완만한 경사의 아스팔트 포장 진입로로 안전하고 쾌적한 통행을 보장합니다.',
      features: ['보강토 축대 공사 완료', '블랙 안전 난간 설치', '완만한 진입 경사로'],
    },
    {
      id: 'photo-road-construction',
      title: '단지 진입 10M 광폭 도로 확포장 공사 현장',
      category: 'civil',
      categoryLabel: '도로 공사 실사',
      imageUrl: '/assets/real/road_10m_construction.jpg',
      description: '단지 진입 편의성을 극대화하기 위한 10미터 메인 광폭 도로 확포장 공사가 활발히 진행 중입니다. 양방향 원활한 교행과 대형 차량의 쾌적한 진출입을 확보합니다.',
      features: ['10M 메인 도로 확포장 진행', '안전 시설물 완비', '양방향 교행 및 진출입 최적'],
    },
    {
      id: 'photo-civil-grading',
      title: '계단식 평탄화 필지 & 탁 트인 조망',
      category: 'civil',
      categoryLabel: '대지 조성 실사',
      imageUrl: '/assets/real/terraced_plots_site_1789389207307.jpg',
      description: '푸른 하늘과 울창한 숲을 배경으로 전 필지 평탄화 및 부지 조성이 완료되어, 복잡한 토목 공사 없이 바로 기초 타설 및 건축에 착수할 수 있습니다.',
      features: ['전 필지 평탄화 완료', '화이트 메쉬 안전펜스', '단차를 고려한 조망권 보장'],
    },
    {
      id: 'photo-hero-sunset',
      title: '한탄강 조망 토지분양 현장 실사',
      category: 'civil',
      categoryLabel: '현장 실사',
      imageUrl: '/assets/real/hero_hantan_view_1789389135058.jpg',
      description: '황금빛 노을이 쏟아지는 한탄강 수변을 바라보는 총 29개 필지(남향·남서향 위주). 현장에서 직접 확인하실 수 있는 준비된 땅입니다.',
      features: ['남향·남서향 명당 채광', '토지가격 7,500만원부터', '상·하수도 관로 인입 완료'],
    },
    {
      id: 'photo-station-jeongok',
      title: '수도권 1호선 전곡역 신축 역사 (차량 5분)',
      category: 'station',
      categoryLabel: '광역 교통망',
      imageUrl: '/assets/real/jeongok_station_user.jpg',
      description: '동두천~연천 1호선 전철 연장 개통으로 완성된 최신식 전곡역사. 서울 중심부까지 환승 없이 직결되어 편리한 출퇴근과 주말 별장 이동이 가능합니다.',
      features: ['1호선 직결 전철역', '단지에서 차량 5분 거리', '서울 및 수도권 쾌속 통근'],
    },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? sitePhotos
    : sitePhotos.filter((p) => p.category === activeCategory);

  return (
    <section
      id="garden-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Golden Forest Emblem */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/15 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center">
                <Home className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-white tracking-tight">
                  골든포레스트
                </h3>
                <span className="text-[11px] text-amber-400/90 font-medium tracking-wide">
                  GOLDEN FOREST
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            ※ 도심 속 자연을 품다. 쾌적한 주거 환경.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            토목공사와 보강토 옹벽, 조경정원 및 기반시설이 완비된 골든포레스트의 실제 시공 현장과 완공 비전을 확인하세요.
          </p>
        </div>

        {/* Feature Visual Hero Card: Golden Forest Perspective Render */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#12111D] shadow-2xl mb-16">
          <div className="grid lg:grid-cols-12">
            {/* Main Landscaped Image matching photo 6 (Golden Forest 3D Rendering) */}
            <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[440px] bg-slate-900 overflow-hidden group">
              <img
                src="/assets/real/golden_forest_render_1789389192364.jpg"
                alt="골든포레스트 조감도 및 주거 단지 비전"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                {/* Visual Golden Forest Badge Overlay */}
                <div className="bg-white/95 text-slate-900 px-6 py-4 rounded-2xl max-w-sm shadow-2xl border border-slate-200 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-5 h-5 text-slate-900" />
                    <span className="text-lg font-black text-slate-900 tracking-tight">
                      골든포레스트
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-700">
                    ※ 도심 속 자연을 품다. 쾌적한 주거 환경.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Information Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                  SITE INFRASTRUCTURE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                  복잡한 토목·인허가 걱정 없는<br />준비된 명품 전원 필지
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  일반 임야나 농지는 매입 후 인허가와 토목공사, 전용부담금으로 인해 수천만 원의 추가 비용과 오랜 시간이 소요됩니다. 골든포레스트는 모든 공정을 사전에 완료하여 바로 건축이 가능합니다.
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">보강토 옹벽 및 평탄화 시공 완료:</strong>
                      <span className="text-slate-300"> 각 단별 단차를 고려한 조망권 확보</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">상·하수도 및 전기 인입 완료:</strong>
                      <span className="text-slate-300"> 개별 지하수 개발 부담 없이 쾌적한 인프라</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">단지 내 10m 도로망 확보:</strong>
                      <span className="text-slate-300"> 847-40도 메인 도로로 양방향 차량 교행 원활</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">수도권 1호선 전곡역 5분:</strong>
                      <span className="text-slate-300"> 서울 청량리·종로 방면 환승 없는 쾌속 철도망</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quote Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="text-amber-400 font-bold block mb-1">골든포레스트 약속</span>
                "토지 구입 즉시 나만의 전원주택을 착공할 수 있도록 모든 인프라를 완벽하게 준비했습니다."
              </div>
            </div>
          </div>
        </div>

        {/* Site Reality Gallery Section (Matching User Uploaded Photos) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                REAL SITE GALLERY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                현장 실사 & 시공 갤러리
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                경기도 연천군 장탄리 847-21 현장의 실제 토목 시공 모습과 1호선 전곡역사를 확인하세요.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                전체보기
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('civil')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'civil'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                현장 토목·필지
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('render')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'render'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                단지 조감도
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('station')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'station'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1호선 전곡역
              </button>
            </div>
          </div>

          {/* Gallery Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#13121D] border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {photo.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      사진 크게보기
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {photo.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {photo.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-300"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#13121D] rounded-3xl border border-white/20 overflow-hidden shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] sm:max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[68vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">
                    경기도 연천군 장탄리 847-21 일원
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {selectedPhoto.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {selectedPhoto.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

