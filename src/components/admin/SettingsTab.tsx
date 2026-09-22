import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Upload,
  RotateCcw,
  Shield,
  Building,
  Check,
  AlertTriangle,
  FileJson,
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const {
    config,
    updateConfig,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
  } = useApp();

  const [companyName, setCompanyName] = useState(config.footer.companyName);
  const [businessNumber, setBusinessNumber] = useState(config.footer.businessNumber);
  const [address, setAddress] = useState(config.footer.address);
  const [copyright, setCopyright] = useState(config.footer.copyright);

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const accentColor = config.theme.accentColor || '#8B5CF6';

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      footer: {
        companyName,
        businessNumber,
        address,
        copyright,
      },
    });
    setStatusMessage('기업 및 사업자 정보가 성공적으로 저장되었습니다.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataFromJson(content);
        if (ok) {
          setStatusMessage('백업 데이터 파일이 성공적으로 복원되었습니다.');
        } else {
          setStatusMessage('JSON 파일 형식이 올바르지 않습니다.');
        }
        setTimeout(() => setStatusMessage(null), 3500);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmResetOpen(false);
    setStatusMessage('초기 샘플 데이터로 복원되었습니다.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">데이터 백업 & 시스템 설정</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          게시글과 테마 데이터를 안전하게 내보내고 불러오거나 초기 상태로 복원합니다.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-purple-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Backup & Restore Box */}
      <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <FileJson className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">데이터 백업 및 마이그레이션</h3>
        </div>
        <p className="text-xs text-slate-400">
          현재 작성된 모든 게시글, 사용자 정의 테마 설정, SEO 메타데이터를 하나의 JSON 파일로 백업합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Export */}
          <div className="p-4 rounded-2xl bg-[#181726] border border-white/5 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white mb-1">JSON 백업 파일 다운로드</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                현재 모든 데이터를 로컬 PC로 즉시 저장합니다.
              </p>
            </div>
            <button
              onClick={exportDataAsJson}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>백업 파일 내보내기</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-2xl bg-[#181726] border border-white/5 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white mb-1">외부 백업 파일 복원</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                이전에 내보낸 JSON 백업 파일을 선택하여 복구합니다.
              </p>
            </div>
            <label className="w-full py-2.5 px-4 rounded-xl bg-[#232236] hover:bg-[#2C2B42] text-slate-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-purple-300" />
              <span>백업 파일 불러오기</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Business Footer Info */}
      <div className="p-6 rounded-3xl bg-[#13121F] border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">푸터 사업자 및 법적 정보</h3>
        </div>

        <form onSubmit={handleSaveCompany} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                상호 및 법인명
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#181726] border border-white/10 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                사업자등록번호
              </label>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#181726] border border-white/10 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                사업장 소재지 주소
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#181726] border border-white/10 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                카피라이트 표기
              </label>
              <input
                type="text"
                value={copyright}
                onChange={(e) => setCopyright(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#181726] border border-white/10 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              사업자 정보 저장
            </button>
          </div>
        </form>
      </div>

      {/* 3. Factory Reset Section */}
      <div className="p-6 rounded-3xl bg-[#1C1217] border border-rose-500/20 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-rose-200">초기 샘플 데이터 복원 (초기화)</h3>
        </div>
        <p className="text-xs text-slate-300">
          테스트하면서 추가한 글이나 변경한 테마 설정을 처음 제공된 고품질 샘플 콘텐츠 상태로 되돌립니다.
        </p>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer"
        >
          초기 샘플 데이터로 리셋하기
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-[#181726] border border-white/10 max-w-sm w-full text-center space-y-4">
            <h3 className="text-base font-bold text-white">데이터를 초기화하시겠습니까?</h3>
            <p className="text-xs text-slate-300">
              현재 저장된 모든 게시글 및 커스텀 설정이 초기 샘플 상태로 덮어씌워집니다.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#252438] text-xs font-semibold text-slate-300"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white"
              >
                초기화 진행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
