import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewTab } from './OverviewTab';
import { ParcelsManagerTab } from './ParcelsManagerTab';
import { ReservationsTab } from './ReservationsTab';
import { MapMarkerCustomizerTab } from './MapMarkerCustomizerTab';
import { ContentCustomizerTab } from './ContentCustomizerTab';
import { SettingsTab } from './SettingsTab';
import {
  LayoutDashboard,
  Map,
  Calendar,
  FileText,
  Settings,
  Eye,
  Sparkles,
  Phone,
  Sliders,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { config, setIsAdmin, reservations } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'parcels' | 'reservations' | 'mapMarker' | 'content' | 'settings'>('overview');

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  const navTabs = [
    { id: 'overview', label: '대시보드 개요', icon: LayoutDashboard },
    { id: 'parcels', label: '26필지 상태·가격 관리', icon: Map },
    {
      id: 'reservations',
      label: `현장예약 관리${pendingCount > 0 ? ` (${pendingCount})` : ''}`,
      icon: Calendar,
    },
    { id: 'mapMarker', label: '지도·마커 UI 커스텀', icon: Sliders },
    { id: 'content', label: '텍스트 CMS 관리', icon: FileText },
    { id: 'settings', label: '데이터 백업 & 리셋', icon: Settings },
  ] as const;

  return (
    <div
      id="admin-dashboard-root"
      className="min-h-screen text-slate-100 flex flex-col"
      style={{ backgroundColor: '#0B0A11' }}
    >
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#11101A]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-lg bg-[#00593B] border border-emerald-400/40">
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">
                {config.brandName}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                분양 관리 콘솔
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {config.subBrandName} • 대표전화: {config.phone}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            id="admin-exit-view-btn"
            onClick={() => setIsAdmin(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#1F1E2E] hover:bg-[#2A293E] border border-white/10 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>분양 홍보관 웹사이트 보기</span>
          </button>
        </div>
      </header>

      {/* Admin Tab Navigation Bar */}
      <div className="bg-[#141320] border-b border-white/5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'overview' && (
          <OverviewTab onNavigateTab={(tab) => setActiveTab(tab as any)} />
        )}
        {activeTab === 'parcels' && <ParcelsManagerTab />}
        {activeTab === 'reservations' && <ReservationsTab />}
        {activeTab === 'mapMarker' && <MapMarkerCustomizerTab />}
        {activeTab === 'content' && <ContentCustomizerTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-white/5 py-4 px-6 text-center text-xs text-slate-500">
        골든포레스트 한탄강 전원주택지 분양 관리자 콘솔 v3.0 • 자동 저장 활성화됨
      </footer>
    </div>
  );
};
