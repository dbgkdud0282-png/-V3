import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Phone,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  MapPin,
  Building,
} from 'lucide-react';

export const ReservationsTab: React.FC = () => {
  const { reservations, updateReservationStatus, deleteReservation, config, updateConfig, getCustomText } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const [addressForm, setAddressForm] = useState({
    siteAddressTitle: getCustomText('siteAddressTitle', '현장 위치 (홍보관)'),
    siteAddressText: getCustomText('siteAddressText', '경기도 연천군 장탄리 847-21'),
    siteAddressDesc: getCustomText('siteAddressDesc', '전곡역 차량 5분 · 한탄강 조망'),
    officeAddressTitle: getCustomText('officeAddressTitle', '분양 사무실'),
    officeAddressText: getCustomText('officeAddressText', '경기도 연천군 전곡역로 67, 1층'),
    officeAddressDesc: getCustomText('officeAddressDesc', '전곡역 1번 출구 앞'),
  });

  const handleSaveAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTc = config.textCustomizer || {};
    updateConfig({
      textCustomizer: {
        ...currentTc,
        siteAddressTitle: { pc: addressForm.siteAddressTitle, mobile: addressForm.siteAddressTitle, useSame: true },
        siteAddressText: { pc: addressForm.siteAddressText, mobile: addressForm.siteAddressText, useSame: true },
        siteAddressDesc: { pc: addressForm.siteAddressDesc, mobile: addressForm.siteAddressDesc, useSame: true },
        officeAddressTitle: { pc: addressForm.officeAddressTitle, mobile: addressForm.officeAddressTitle, useSame: true },
        officeAddressText: { pc: addressForm.officeAddressText, mobile: addressForm.officeAddressText, useSame: true },
        officeAddressDesc: { pc: addressForm.officeAddressDesc, mobile: addressForm.officeAddressDesc, useSame: true },
      },
    });
    setSavedNotification('현장 및 사무실 주소 안내 정보가 성공적으로 저장되었습니다.');
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const filtered = reservations.filter((r) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      r.name.includes(searchTerm) ||
      r.phone.includes(searchTerm) ||
      (r.interestedParcel && r.interestedParcel.includes(searchTerm));
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl border border-emerald-400/40 text-sm font-bold animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            현장방문 예약 고객 관리 및 위치 안내 설정
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            웹사이트 사전예약 내역을 관리하고, 예약 섹션에 노출되는 현장 및 사무실 위치 주소를 직접 편집합니다.
          </p>
        </div>
      </div>

      {/* Address Management Card */}
      <div className="p-6 rounded-3xl bg-[#141322] border border-amber-500/20 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">현장 및 사무실 위치 안내 관리</h3>
              <p className="text-xs text-slate-400">예약 및 상담 섹션에 동적으로 표시될 현장 및 사무실 주소 정보를 수정하고 영구 저장합니다.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveAddresses} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 📍 현장 주소 입력 */}
            <div className="p-5 rounded-2xl bg-[#181729] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>[📍 현장 위치 안내 설정]</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">위치 타이틀</label>
                <input
                  type="text"
                  value={addressForm.siteAddressTitle}
                  onChange={(e) => setAddressForm({ ...addressForm, siteAddressTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 font-bold"
                  placeholder="예: 현장 위치 (홍보관)"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">상세 주소</label>
                <input
                  type="text"
                  value={addressForm.siteAddressText}
                  onChange={(e) => setAddressForm({ ...addressForm, siteAddressText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 font-semibold"
                  placeholder="예: 경기도 연천군 장탄리 847-21"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">추가 설명 (전곡역 5분 등)</label>
                <input
                  type="text"
                  value={addressForm.siteAddressDesc}
                  onChange={(e) => setAddressForm({ ...addressForm, siteAddressDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-amber-400"
                  placeholder="예: 전곡역 차량 5분 · 한탄강 조망"
                  required
                />
              </div>
            </div>

            {/* 🏢 사무실 위치 입력 */}
            <div className="p-5 rounded-2xl bg-[#181729] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>[🏢 사무실 위치 안내 설정]</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">사무실 타이틀</label>
                <input
                  type="text"
                  value={addressForm.officeAddressTitle}
                  onChange={(e) => setAddressForm({ ...addressForm, officeAddressTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400 font-bold"
                  placeholder="예: 분양 사무실"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">사무실 주소</label>
                <input
                  type="text"
                  value={addressForm.officeAddressText}
                  onChange={(e) => setAddressForm({ ...addressForm, officeAddressText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400 font-semibold"
                  placeholder="예: 경기도 연천군 전곡역로 67, 1층"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">추가 설명 (전곡역 1번 출구 앞 등)</label>
                <input
                  type="text"
                  value={addressForm.officeAddressDesc}
                  onChange={(e) => setAddressForm({ ...addressForm, officeAddressDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#100F1E] border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-emerald-400"
                  placeholder="예: 전곡역 1번 출구 앞"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              주소 안내 정보 저장
            </button>
          </div>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#13121F] border border-white/5">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="고객명, 연락처, 필지 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1A192A] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              statusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#1A192A] text-slate-300'
            }`}
          >
            전체 ({reservations.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              statusFilter === 'pending' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#1A192A] text-slate-300'
            }`}
          >
            접수대기 ({reservations.filter((r) => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              statusFilter === 'confirmed' ? 'bg-emerald-600 text-white font-bold' : 'bg-[#1A192A] text-slate-300'
            }`}
          >
            예약확정 ({reservations.filter((r) => r.status === 'confirmed').length})
          </button>
        </div>
      </div>

      {/* Reservations List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-2xl bg-[#13121F] border border-white/5 text-slate-400 text-xs">
          등록된 현장방문 예약 내역이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#13121F] border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Customer Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-black text-white">
                    {res.name} 고객님
                  </span>
                  <a
                    href={`tel:${res.phone.replace(/[^0-9]/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 hover:bg-emerald-500/30"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{res.phone}</span>
                  </a>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      res.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : res.status === 'cancelled'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {res.status === 'confirmed'
                      ? '상담/예약 확정'
                      : res.status === 'cancelled'
                      ? '취소됨'
                      : '접수 대기중'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>방문 일시: {res.visitDate} {res.visitTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">관심 필지: </span>
                    <strong className="text-white">{res.interestedParcel || '전체 상담'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">선호 면적: </span>
                    <span className="text-slate-200">{res.preferredSize}</span>
                  </div>
                </div>

                {res.notes && (
                  <p className="text-xs text-slate-400 bg-[#1A192A] p-2.5 rounded-xl border border-white/5">
                    <strong>고객 요청사항:</strong> {res.notes}
                  </p>
                )}

                <div className="text-[10px] text-slate-500">
                  신청 접수 시각: {res.createdAt}
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateReservationStatus(res.id, 'confirmed')}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>예약 확정</span>
                </button>

                <button
                  onClick={() => updateReservationStatus(res.id, 'cancelled')}
                  className="px-3 py-2 rounded-xl bg-[#1E1D2E] hover:bg-[#28273D] text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  <span>취소 처리</span>
                </button>

                <button
                  onClick={() => deleteReservation(res.id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
