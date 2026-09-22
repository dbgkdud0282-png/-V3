import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Map,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tab: any) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { parcels26, reservations, activityLogs, config } = useApp();

  const totalParcels = parcels26.length;
  const availableCount = parcels26.filter((p) => p.status === '분양 가능').length;
  const completedCount = parcels26.filter((p) => p.status === '분양 완료').length;
  const pendingReservations = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00593B]/40 via-[#181728] to-[#121120] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>골든포레스트 분양 관리 센터</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {config.brandName} CMS 콘솔
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            총 {totalParcels}개 필지의 분양 상태·핵심 제원과 현장방문 예약 고객을 한곳에서 실시간으로 관리하세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('reservations')}
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>예약 고객 관리 ({reservations.length})</span>
          </button>

          <button
            onClick={() => onNavigateTab('parcels')}
            className="px-4 py-3 rounded-xl bg-[#212035] hover:bg-[#2B2A45] border border-white/10 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Map className="w-4 h-4 text-emerald-400" />
            <span>26개 필지 제원·상태 변경</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-[#13121F] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>총 분양 필지</span>
            <Map className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalParcels}개
          </div>
          <p className="text-[11px] text-slate-400">지적도 1번 ~ 26번 필지</p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-[#13121F] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>분양 가능 필지 (노란색)</span>
            <CheckCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {availableCount}개
          </div>
          <p className="text-[11px] text-amber-500/80 font-semibold">즉시 분양 및 건축 가능</p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-[#13121F] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>분양 완료 필지 (빨간색)</span>
            <Clock className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400">
            {completedCount}개
          </div>
          <p className="text-[11px] text-red-500/80 font-semibold">계약 및 분양 완료</p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-[#13121F] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>현장방문 예약 접수</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {reservations.length}건
          </div>
          <p className="text-[11px] text-indigo-400">
            미확정 {pendingReservations}건
          </p>
        </div>
      </div>

      {/* Grid: Recent Reservations & Activity Logs */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Latest Visit Reservations */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>최근 현장방문 예약 고객</span>
            </h3>
            <button
              onClick={() => onNavigateTab('reservations')}
              className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
            >
              전체 예약 보기 →
            </button>
          </div>

          <div className="space-y-3">
            {reservations.slice(0, 4).map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-[#181728] border border-white/5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{res.name} 고객님</span>
                    <span className="text-xs text-slate-400">({res.phone})</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        res.status === 'confirmed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {res.status === 'confirmed' ? '예약확정' : '접수대기'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    방문일시: <strong className="text-amber-300">{res.visitDate} {res.visitTime}</strong> | 희망필지: {res.interestedParcel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Activity Logs */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>시스템 및 운영 로그</span>
          </h3>

          <div className="space-y-3">
            {activityLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#181728] border border-white/5 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{log.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
