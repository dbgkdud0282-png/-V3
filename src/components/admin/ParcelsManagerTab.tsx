import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Parcel26Item } from '../../data/parcels26Data';
import {
  Map,
  CheckCircle2,
  Search,
  Edit3,
  X,
  Save,
  RotateCcw,
  Sparkles,
  Compass,
  Home,
  Tag,
  SlidersHorizontal,
  Check,
  Building,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';

export const ParcelsManagerTab: React.FC = () => {
  const { parcels26, updateParcel26, toggleParcel26Status, resetParcels26, updateAllParcels26UnitPrice } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'completed'>('all');
  const [globalUnitPrice, setGlobalUnitPrice] = useState<number | string>(85);
  
  // 편집 대상 필지 모달 상태
  const [editingParcel, setEditingParcel] = useState<Parcel26Item | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    jibun: string;
    status: '분양 가능' | '분양 완료';
    price: string;
    unitPrice: number | string;
    area: string;
    exclusiveArea: string;
    totalAreaM2: string;
    orientation: '남향' | '남서향' | '동남향' | string;
    recommendedHouse: string;
    featuresText: string;
  }>({
    name: '',
    jibun: '',
    status: '분양 가능',
    price: '',
    unitPrice: 85,
    area: '',
    exclusiveArea: '',
    totalAreaM2: '',
    orientation: '남향',
    recommendedHouse: '',
    featuresText: '',
  });

  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const availableList = parcels26.filter((p) => p.status === '분양 가능');
  const completedList = parcels26.filter((p) => p.status === '분양 완료');

  const filtered = parcels26.filter((p) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      term === '' ||
      p.name.toLowerCase().includes(term) ||
      p.jibun.toLowerCase().includes(term) ||
      p.recommendedHouse.toLowerCase().includes(term) ||
      p.orientation.toLowerCase().includes(term) ||
      p.area.toLowerCase().includes(term) ||
      String(p.lotNumber).includes(term);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'available' && p.status === '분양 가능') ||
      (statusFilter === 'completed' && p.status === '분양 완료');

    return matchesSearch && matchesStatus;
  });

  const handleOpenEditModal = (parcel: Parcel26Item) => {
    const pNum = parseFloat(parcel.area.replace(/[^0-9.]/g, '')) || 100;
    const priceNum = parseFloat(parcel.price.replace(/[^0-9.]/g, '')) || 7500;
    const estimatedUnitPrice = parcel.unitPrice || (pNum > 0 ? Math.round(priceNum / pNum) : 85);

    setEditingParcel(parcel);
    setEditForm({
      name: parcel.name,
      jibun: parcel.jibun,
      status: parcel.status,
      price: parcel.price,
      unitPrice: estimatedUnitPrice,
      area: parcel.area,
      exclusiveArea: parcel.exclusiveArea,
      totalAreaM2: parcel.totalAreaM2,
      orientation: parcel.orientation,
      recommendedHouse: parcel.recommendedHouse,
      featuresText: parcel.features.join('\n'),
    });
  };

  const handleAreaChange = (val: string) => {
    setEditForm((prev) => {
      const pNum = parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
      const unitNum = parseFloat(String(prev.unitPrice).replace(/[^0-9.]/g, '')) || 85;
      
      let newM2 = prev.totalAreaM2;
      let newPrice = prev.price;
      
      if (pNum > 0) {
        const calculatedM2 = Math.round(pNum * 3.30578);
        newM2 = `${calculatedM2}㎡`;

        const totalWan = Math.round(pNum * unitNum);
        newPrice = totalWan >= 10000
          ? `${Math.floor(totalWan / 10000)}억 ${totalWan % 10000 > 0 ? (totalWan % 10000).toLocaleString() + '만원' : ''}`.trim()
          : `${totalWan.toLocaleString()}만원`;
      }
      return { ...prev, area: val, totalAreaM2: newM2, price: newPrice };
    });
  };

  const handleUnitPriceChange = (val: string | number) => {
    setEditForm((prev) => {
      const unitNum = parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
      const pNum = parseFloat(prev.area.replace(/[^0-9.]/g, '')) || 0;
      
      let newPrice = prev.price;
      if (pNum > 0 && unitNum > 0) {
        const totalWan = Math.round(pNum * unitNum);
        newPrice = totalWan >= 10000
          ? `${Math.floor(totalWan / 10000)}억 ${totalWan % 10000 > 0 ? (totalWan % 10000).toLocaleString() + '만원' : ''}`.trim()
          : `${totalWan.toLocaleString()}만원`;
      }
      return { ...prev, unitPrice: val, price: newPrice };
    });
  };

  const handleCloseModal = () => {
    setEditingParcel(null);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParcel) return;

    const features = editForm.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedData: Partial<Parcel26Item> = {
      name: editForm.name.trim() || `${editingParcel.lotNumber}번 필지`,
      jibun: editForm.jibun.trim(),
      status: editForm.status,
      price: editForm.price.trim() || (editForm.status === '분양 완료' ? '계약 완료' : '7,500만원'),
      unitPrice: Number(editForm.unitPrice) || 85,
      area: editForm.area.trim(),
      exclusiveArea: editForm.exclusiveArea.trim(),
      totalAreaM2: editForm.totalAreaM2.trim(),
      orientation: editForm.orientation as any,
      recommendedHouse: editForm.recommendedHouse.trim(),
      features: features.length > 0 ? features : editingParcel.features,
    };

    updateParcel26(editingParcel.id, updatedData);
    setSavedNotification(`${editingParcel.lotNumber}번 필지(${editForm.jibun})의 제원이 성공적으로 저장되었습니다.`);
    setTimeout(() => setSavedNotification(null), 3500);
    setEditingParcel(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl border border-emerald-400/40 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              26개 필지 제원 및 분양 상태 관리
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              지적도 1:1 매핑
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            각 필지의 분양 상태, 가격, 지번, 면적(평/㎡), 향, 추천 주택 형태 등 핵심 제원을 실시간으로 편집하고 영구 저장합니다.
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161524] border border-white/10 text-xs font-semibold">
            <span className="text-slate-400">총 필지:</span>
            <span className="font-extrabold text-white">{parcels26.length}필지</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
            <span className="text-amber-300">분양 가능:</span>
            <span className="font-extrabold text-amber-200">{availableList.length}필지</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
            <span className="text-red-300">분양 완료:</span>
            <span className="font-extrabold text-red-200">{completedList.length}필지</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('모든 필지의 제원 및 상태를 초기 기본값으로 복원하시겠습니까?')) {
                resetParcels26();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1F1E30] hover:bg-[#2A2840] border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
            title="기본값으로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>기본값 복원</span>
          </button>
        </div>
      </div>

      {/* Global Batch Unit Price Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#161524] border border-amber-500/20 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">전체 필지 평단가 일괄 변경</h3>
            <p className="text-xs text-slate-400">기준 평단가(만원)를 입력하고 일괄 적용하면 모든 필지의 분양가가 자동 산출됩니다.</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex items-center">
            <input
              type="number"
              value={globalUnitPrice}
              onChange={(e) => setGlobalUnitPrice(e.target.value)}
              className="w-32 px-3.5 py-2 rounded-xl bg-[#1D1C2E] border border-amber-500/30 text-amber-300 font-black text-sm focus:outline-none focus:border-amber-400"
              placeholder="85"
            />
            <span className="absolute right-3 text-xs font-bold text-slate-400">만원/평</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const uPrice = Number(globalUnitPrice) || 85;
              if (window.confirm(`모든 필지의 평단가를 ${uPrice}만원으로 일괄 적용하고 분양가를 재계산하시겠습니까?`)) {
                updateAllParcels26UnitPrice(uPrice);
                setSavedNotification(`모든 필지(${parcels26.length}개)의 평단가(${uPrice}만원/평)가 일괄 적용되었습니다.`);
                setTimeout(() => setSavedNotification(null), 3500);
              }
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md shadow-amber-500/20 whitespace-nowrap"
          >
            전체 평단가 적용
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#13121F] border border-white/5 shadow-inner">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="지번 (847-1), 번호, 주택형태 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A192A] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                : 'bg-[#1A192A] text-slate-300 hover:bg-[#252438]'
            }`}
          >
            전체 ({parcels26.length})
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
              statusFilter === 'available'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'bg-[#1A192A] text-slate-300 hover:bg-[#252438]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            분양가능 ({availableList.length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
              statusFilter === 'completed'
                ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                : 'bg-[#1A192A] text-slate-300 hover:bg-[#252438]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            분양완료 ({completedList.length})
          </button>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#13121F] shadow-xl">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead className="bg-[#181728] text-slate-400 uppercase font-bold border-b border-white/10 text-[11px]">
            <tr>
              <th className="px-4 py-3.5 text-center w-16">번호</th>
              <th className="px-4 py-3.5">지번 (지적도)</th>
              <th className="px-4 py-3.5">분양 상태 (원클릭 전환)</th>
              <th className="px-4 py-3.5">분양 예정가</th>
              <th className="px-4 py-3.5">면적 (총분양 / 전용 / ㎡)</th>
              <th className="px-4 py-3.5">향</th>
              <th className="px-4 py-3.5">추천 주택 형태</th>
              <th className="px-4 py-3.5 text-center">제원 편집</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  일치하는 필지가 없습니다. 검색어를 확인해 주세요.
                </td>
              </tr>
            ) : (
              filtered.map((parcel) => {
                const isAvailable = parcel.status === '분양 가능';
                return (
                  <tr
                    key={parcel.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* 번호 */}
                    <td className="px-4 py-3.5 text-center font-black">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black shadow-sm ${
                          isAvailable
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/40'
                            : 'bg-red-600 text-white ring-2 ring-red-600/40'
                        }`}
                      >
                        {parcel.lotNumber}
                      </span>
                    </td>

                    {/* 지번 */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white text-sm">
                        {parcel.name}
                      </div>
                      <div className="text-[11px] text-amber-400/90 font-mono">
                        지번: {parcel.jibun}
                      </div>
                    </td>

                    {/* 분양 상태 */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleOpenEditModal(parcel)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                          isAvailable
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                        }`}
                        title="클릭하여 제원 및 분양 상태를 수정하고 저장합니다"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAvailable ? 'bg-amber-400' : 'bg-red-500'
                          }`}
                        ></span>
                        <span>{parcel.status}</span>
                        <Edit3 className="w-3 h-3 opacity-60 ml-0.5" />
                      </button>
                    </td>

                    {/* 분양 예정가 */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-black text-sm ${
                          isAvailable ? 'text-amber-400' : 'text-slate-400 line-through'
                        }`}
                      >
                        {parcel.price}
                      </span>
                    </td>

                    {/* 면적 */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-200">
                        {parcel.area}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        전용 {parcel.exclusiveArea} · {parcel.totalAreaM2}
                      </div>
                    </td>

                    {/* 향 */}
                    <td className="px-4 py-3.5 font-semibold text-slate-300">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px]">
                        <Compass className="w-3 h-3 text-amber-400" />
                        {parcel.orientation}
                      </span>
                    </td>

                    {/* 추천 주택 형태 */}
                    <td className="px-4 py-3.5 text-slate-300 max-w-xs">
                      <p className="line-clamp-2 text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
                        {parcel.recommendedHouse}
                      </p>
                    </td>

                    {/* 제원 상세 편집 버튼 */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => handleOpenEditModal(parcel)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#201F33] hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow-purple-600/30"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>상세 제원 수정</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Edit Modal */}
      {editingParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#151424] border-2 border-white/20 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/10 sticky top-0 bg-[#151424]/95 backdrop-blur z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/25 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex flex-wrap items-center gap-2.5">
                    <span>{editingParcel.name} 제원 상세 편집</span>
                    <span className="text-sm px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold">
                      지번: {editingParcel.jibun}
                    </span>
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5">
                    분양 상태, 가격, 지번, 평수/㎡ 면적, 조망 향, 추천 주택 형태 및 강조 포인트를 수정합니다.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveForm} className="p-7 sm:p-8 space-y-6">
              {/* Row 1: 명칭 & 지번 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    필지 명칭
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 1번 필지"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    지적도 지번
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.jibun}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, jibun: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 847-1"
                  />
                </div>
              </div>

              {/* Row 2: 분양 상태 & 평당 단가 & 총 분양가 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    분양 상태
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: '분양 가능',
                          price: prev.price === '계약 완료' ? '7,500만원' : prev.price,
                        }))
                      }
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        editForm.status === '분양 가능'
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                          : 'bg-[#1D1C2E] text-slate-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      분양 가능
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: '분양 완료',
                          price: '계약 완료',
                        }))
                      }
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        editForm.status === '분양 완료'
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-[#1D1C2E] text-slate-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      분양 완료
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    평당 단가 (만원)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={editForm.unitPrice}
                      onChange={(e) => handleUnitPriceChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-amber-300 font-black text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      placeholder="85"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">만원</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    총 분양가 (자동/수동)
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, price: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-amber-400 font-black text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 7,500만원 또는 계약 완료"
                  />
                </div>
              </div>

              {/* Row 3: 면적 제원 3총사 (총분양평수, 전용면적, 면적㎡) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    총 분양 면적 (평)
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.area}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 104.4평"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    전용 면적 (평)
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.exclusiveArea}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        exclusiveArea: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 87.0평"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    면적 (㎡)
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.totalAreaM2}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        totalAreaM2: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 345㎡"
                  />
                </div>
              </div>

              {/* Row 4: 향 & 추천 주택 형태 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    향 (조망 방향)
                  </label>
                  <select
                    value={editForm.orientation}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        orientation: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="남향">남향</option>
                    <option value="남서향">남서향</option>
                    <option value="동남향">동남향</option>
                    <option value="동향">동향</option>
                    <option value="서향">서향</option>
                    <option value="북향">북향</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                    추천 주택 형태
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.recommendedHouse}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        recommendedHouse: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base sm:text-lg font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="예: 단층 모던 테라스 주택 (건폐율 20% 최적)"
                  />
                </div>
              </div>

              {/* Row 5: 주요 특장점 (Features) */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-200 mb-2">
                  주요 특장점 (줄바꿈으로 구분)
                </label>
                <textarea
                  rows={4}
                  value={editForm.featuresText}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      featuresText: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#1D1C2E] border border-white/15 text-white text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none font-sans leading-relaxed"
                  placeholder="예:&#10;북서측 코너 독립 필지&#10;탁 트인 조망 및 파노라마 뷰&#10;10m 주 진입도로 인접"
                />
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                  * 필지 말풍선 및 상세 팝업에 표시되는 핵심 강조 포인트 항목입니다.
                </p>
              </div>

              {/* Input Value Draft Preview & Save Notice */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#181729] border border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span>입력 내용 확인 (임시 미리보기)</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400">
                    * 저장 버튼 클릭 전까지 임시 상태로 유지됩니다
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base bg-[#100F1E] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-inner">
                  <div>
                    <span className="font-black text-white text-base sm:text-xl">
                      {editForm.name || `${editingParcel.lotNumber}번 필지`} ({editForm.jibun || editingParcel.jibun})
                    </span>
                    <span className="text-slate-300 font-semibold ml-3 text-sm sm:text-base">
                      {editForm.area} (전용 {editForm.exclusiveArea} · {editForm.totalAreaM2})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-black ${
                        editForm.status === '분양 가능'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {editForm.status}
                    </span>
                    <span className="font-black text-lg sm:text-2xl text-amber-400 tracking-tight">{editForm.price}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 text-xs sm:text-sm text-amber-200/90 font-medium leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    입력창 값을 수정하는 동안에는 메인 화면에 반영되지 않으며, 하단의 <strong>[제원 및 분양상태 최종 저장]</strong> 버튼을 클릭해야 메인 사이트에 영구 저장되고 즉시 반영됩니다.
                  </span>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-4 pt-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-sm sm:text-base font-bold transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-base sm:text-lg font-black shadow-xl shadow-amber-500/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-5 h-5" />
                  <span>제원 및 분양상태 최종 저장</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
