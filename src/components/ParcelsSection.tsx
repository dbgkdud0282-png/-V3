import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Map,
  Star,
} from 'lucide-react';
import { InteractiveParcelMap } from './InteractiveParcelMap';

export const ParcelsSection: React.FC = () => {
  const { openReservationModal, config, getCustomText, getCustomTextStyle } = useApp();

  const currentMapHeadline = getCustomText('mapHeadline', 'INTERACTIVE CADASTRAL MAP');
  const currentMapTitle = getCustomText('mapTitle', '분양 현황 및 필지 안내');
  const currentMapDesc = getCustomText('mapDescription', '원하시는 필지 번호(핀)를 클릭하시면 실시간 분양 상태, 전용면적, 추천 주택형 및 분양가를 바로 확인하실 수 있습니다.\n※ 붉은색 마커는 이미 계약 체결된 필지이며, 노란색 마커는 즉시 계약 가능한 필지입니다.');

  const headlineStyle = getCustomTextStyle('mapHeadline', 'text-xs', 'text-xs', 'font-bold', 'font-bold');
  const titleStyle = getCustomTextStyle('mapTitle', 'text-4xl', 'text-3xl', 'font-black', 'font-black');
  const descStyle = getCustomTextStyle('mapDescription', 'text-base', 'text-sm', 'font-normal', 'font-normal');

  return (
    <section
      id="parcels-section"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0D17] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Map className="w-3.5 h-3.5" />
            <span className={headlineStyle.className}>{currentMapHeadline}</span>
          </div>
          <h2 className={`text-white tracking-tight ${titleStyle.className}`}>
            {currentMapTitle}
          </h2>
          <p className={`text-slate-300 max-w-2xl mx-auto leading-relaxed whitespace-pre-line ${descStyle.className}`}>
            {currentMapDesc}
          </p>
        </div>

        {/* Interactive Aerial Parcel Map Component */}
        <InteractiveParcelMap
          onOpenReservationModal={openReservationModal}
        />
      </div>
    </section>
  );
};

