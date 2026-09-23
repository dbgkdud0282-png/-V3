import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Parcel,
  ParcelStatus,
  SiteConfig,
  VisitReservation,
  ActivityLog,
  TextCustomizerConfig,
} from '../types';
import {
  INITIAL_PARCELS,
  INITIAL_CONFIG,
  INITIAL_RESERVATIONS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_MAP_MARKER_CONFIG,
  INITIAL_SECTION_CONTENT_CONFIG,
  INITIAL_HERO_PILL_STYLE,
} from '../data/initialData';
import {
  PARCELS_26_DATA,
  Parcel26Item,
} from '../data/parcels26Data';

interface AppContextType {
  parcels: Parcel[];
  parcels26: Parcel26Item[];
  config: SiteConfig;
  reservations: VisitReservation[];
  activityLogs: ActivityLog[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (val: boolean) => void;
  selectedParcel: Parcel | null;
  setSelectedParcel: (p: Parcel | null) => void;
  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (val: boolean) => void;
  reservationTargetParcel: string | undefined;
  openReservationModal: (parcelNumber?: string) => void;
  closeReservationModal: () => void;
  isPhoneConsultModalOpen: boolean;
  setIsPhoneConsultModalOpen: (val: boolean) => void;
  openPhoneConsultModal: () => void;
  closePhoneConsultModal: () => void;

  updateParcelStatus: (id: string, status: ParcelStatus) => void;
  updateParcelPrice: (id: string, priceMillionWon: number) => void;
  updateParcel26: (id: number, updatedData: Partial<Parcel26Item>) => void;
  toggleParcel26Status: (id: number) => void;
  updateAllParcels26UnitPrice: (unitPrice: number) => void;
  resetParcels26: () => void;
  addReservation: (
    data: Omit<VisitReservation, 'id' | 'createdAt' | 'status'>
  ) => boolean;
  updateReservationStatus: (
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled'
  ) => void;
  deleteReservation: (id: string) => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => void;
  importDataFromJson: (jsonString: string) => boolean;
  getCustomText: (key: keyof TextCustomizerConfig, fallback: string) => string;
  getCustomTextStyle: (
    key: keyof TextCustomizerConfig,
    defaultPcSize?: string,
    defaultMobileSize?: string,
    defaultPcWeight?: string,
    defaultMobileWeight?: string
  ) => { size: string; weight: string; className: string };
  isMobile: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DATA_VERSION = 'goldenforest_v5_prod_20260922';

const STORAGE_KEYS = {
  VERSION: 'goldenforest_app_version',
  PARCELS: 'goldenforest_parcels_v5',
  PARCELS26: 'goldenforest_parcels26_v5',
  CONFIG: 'goldenforest_config_v5',
  RESERVATIONS: 'goldenforest_reservations_v5',
  LOGS: 'goldenforest_logs_v5',
  IS_ADMIN: 'goldenforest_is_admin_v1',
};

// Immediate cleanup of legacy keys from prior releases to guarantee no stale data leakage
if (typeof window !== 'undefined') {
  try {
    const savedVer = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (savedVer !== DATA_VERSION) {
      const staleKeys = [
        'site_config_data',
        'goldenforest_parcels_v1',
        'goldenforest_parcels_v2',
        'goldenforest_parcels_v3',
        'goldenforest_parcels_v4',
        'goldenforest_parcels26_v1',
        'goldenforest_parcels26_v2',
        'goldenforest_parcels26_v3',
        'goldenforest_parcels26_v4',
        'goldenforest_config_v1',
        'goldenforest_config_v2',
        'goldenforest_config_v3',
        'goldenforest_config_v4',
        'goldenforest_reservations_v1',
        'goldenforest_reservations_v2',
        'goldenforest_logs_v1',
        'goldenforest_logs_v2',
      ];
      staleKeys.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(STORAGE_KEYS.VERSION, DATA_VERSION);
    }
  } catch (err) {
    console.warn('Storage migration notice:', err);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Always initialize directly from default master data - never let stale localStorage take priority over server
  const [parcels, setParcels] = useState<Parcel[]>(INITIAL_PARCELS);
  const [parcels26, setParcels26] = useState<Parcel26Item[]>(PARCELS_26_DATA);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [reservations, setReservations] = useState<VisitReservation[]>(INITIAL_RESERVATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IS_ADMIN);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationTargetParcel, setReservationTargetParcel] = useState<
    string | undefined
  >(undefined);
  const [isPhoneConsultModalOpen, setIsPhoneConsultModalOpen] = useState(false);

  const isDataLoadedRef = React.useRef(false);
  const isInitialMount = React.useRef(true);
  const lastUpdatedAtRef = React.useRef<string>('');
  const isFetchingRef = React.useRef(false);

  // Real-time server data fetcher with cache-busting & fallback
  const fetchServerData = React.useCallback(async (force = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      let serverData: any = null;
      const timestamp = Date.now();

      // 1. Fetch from /.netlify/functions/api with strict no-cache headers & timestamp
      try {
        const res = await fetch(`/.netlify/functions/api?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success && json.data) {
            serverData = json.data;
          }
        }
      } catch (e) {
        console.log('Primary /.netlify/functions/api fetch notice, trying static fallback', e);
      }

      // 2. If not obtained, try static /server-data.json with timestamp
      if (!serverData) {
        try {
          const fallbackRes = await fetch(`/server-data.json?t=${timestamp}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
            },
          });
          if (fallbackRes.ok) {
            const fallbackJson = await fallbackRes.json();
            if (fallbackJson && (fallbackJson.parcels || fallbackJson.config || fallbackJson.parcels26)) {
              serverData = fallbackJson;
            }
          }
        } catch (e) {
          console.log('Fallback /server-data.json fetch notice', e);
        }
      }

      if (serverData) {
        const currentUpdated = serverData.updatedAt || '';
        // If not forced and update timestamp hasn't changed, skip unnecessary re-renders
        if (!force && lastUpdatedAtRef.current && lastUpdatedAtRef.current === currentUpdated) {
          return;
        }
        if (currentUpdated) {
          lastUpdatedAtRef.current = currentUpdated;
        }

        const {
          parcels: sParcels,
          parcels26: sParcels26,
          config: sConfig,
          reservations: sRes,
          activityLogs: sLogs
        } = serverData;

        if (Array.isArray(sParcels) && sParcels.length > 0) {
          setParcels(sParcels);
        }

        if (Array.isArray(sParcels26) && sParcels26.length > 0) {
          setParcels26(sParcels26);
        }

        if (sConfig && typeof sConfig === 'object') {
          setConfig(() => {
            const merged: SiteConfig = {
              ...INITIAL_CONFIG,
              ...sConfig,
              overview: { ...INITIAL_CONFIG.overview, ...(sConfig.overview || {}) },
              specialValues: sConfig.specialValues || INITIAL_CONFIG.specialValues,
              locationCards: (sConfig.locationCards && sConfig.locationCards.length > 0) ? sConfig.locationCards : INITIAL_CONFIG.locationCards,
              topLocationCards: (sConfig.topLocationCards && sConfig.topLocationCards.length > 0) ? sConfig.topLocationCards : INITIAL_CONFIG.topLocationCards,
              mapMarker: { ...INITIAL_MAP_MARKER_CONFIG, ...(sConfig.mapMarker || {}) },
              sectionContent: { ...INITIAL_SECTION_CONTENT_CONFIG, ...(sConfig.sectionContent || {}) },
              textCustomizer: { ...INITIAL_CONFIG.textCustomizer, ...(sConfig.textCustomizer || {}) },
              heroPills: (sConfig.heroPills && sConfig.heroPills.length >= 4) ? sConfig.heroPills : INITIAL_CONFIG.heroPills,
              heroQuickPills: sConfig.heroQuickPills || INITIAL_CONFIG.heroQuickPills,
              heroPillStyle: { ...INITIAL_HERO_PILL_STYLE, ...(sConfig.heroPillStyle || {}) },
              badgeStyle: sConfig.badgeStyle || INITIAL_CONFIG.badgeStyle,
            };
            return merged;
          });
        }

        if (Array.isArray(sRes)) {
          setReservations(sRes);
        }

        if (Array.isArray(sLogs)) {
          setActivityLogs(sLogs);
        }

        isDataLoadedRef.current = true;
      } else {
        isDataLoadedRef.current = true;
      }
    } catch (err) {
      console.warn('Data loader fallback error:', err);
      isDataLoadedRef.current = true;
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  // Sync to server function (immediate POST)
  const syncToServer = (overrideData?: any) => {
    const updatedAt = new Date().toISOString();
    lastUpdatedAtRef.current = updatedAt;
    const payload = overrideData || {
      parcels,
      parcels26,
      config,
      reservations,
      activityLogs,
      updatedAt,
    };
    if (!payload.updatedAt) {
      payload.updatedAt = updatedAt;
    }
    fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify(payload),
    }).catch((err) => console.error('Failed to sync data to server:', err));
  };

  // Real-time synchronization: initial load, periodic polling, visibility change, and window focus
  useEffect(() => {
    // 1. Initial immediate load
    fetchServerData(true);

    // 2. Periodic background polling every 10 seconds for instant CMS updates
    const pollInterval = setInterval(() => {
      fetchServerData(false);
    }, 10000);

    // 3. Tab visibility change listener (when visitor returns to tab from Naver ad or other app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchServerData(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Window focus listener
    const handleWindowFocus = () => {
      fetchServerData(false);
    };
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [fetchServerData]);

  // Only auto sync to server on admin modifications AFTER server data is loaded
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only persist back to server if data was loaded and user is authenticated admin
    if (!isDataLoadedRef.current || !isAdmin) return;

    const timer = setTimeout(() => {
      syncToServer();
    }, 800);
    return () => clearTimeout(timer);
  }, [parcels, parcels26, config, reservations, activityLogs, isAdmin]);

  // Persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(parcels));
    } catch {}
  }, [parcels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARCELS26, JSON.stringify(parcels26));
    } catch {}
  }, [parcels26]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch {}
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch {}
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
    } catch {}
  }, [activityLogs]);

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, String(val));
  };

  const addLog = (
    action: string,
    target: string,
    type: 'create' | 'update' | 'delete' | 'settings' = 'update'
  ) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      target,
      timestamp: '방금 전',
      type,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  const updateParcelStatus = (id: string, status: ParcelStatus) => {
    let nextParcels: Parcel[] = [];
    setParcels((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, status } : p));
      nextParcels = next;
      return next;
    });
    const target = parcels.find((p) => p.id === id);
    const statusKorean =
      status === 'available'
        ? '분양가능'
        : status === 'consulting'
        ? '상담진행중'
        : '분양완료';
    addLog('필지 상태 변경', `${target?.number || id} -> [${statusKorean}]`, 'update');
    if (isAdmin) {
      syncToServer({
        parcels: nextParcels.length > 0 ? nextParcels : parcels,
        parcels26,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const updateParcelPrice = (id: string, priceMillionWon: number) => {
    let nextParcels: Parcel[] = [];
    setParcels((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, priceMillionWon } : p));
      nextParcels = next;
      return next;
    });
    const target = parcels.find((p) => p.id === id);
    addLog(
      '필지 가격 수정',
      `${target?.number || id} -> ${priceMillionWon.toLocaleString()}만원`,
      'update'
    );
    if (isAdmin) {
      syncToServer({
        parcels: nextParcels.length > 0 ? nextParcels : parcels,
        parcels26,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // 26개 필지 마스터 데이터 핵심 제원 및 상태 편집
  const updateParcel26 = (id: number, updatedData: Partial<Parcel26Item>) => {
    let nextParcels26: Parcel26Item[] = [];
    setParcels26((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
      nextParcels26 = next;
      try {
        localStorage.setItem(STORAGE_KEYS.PARCELS26, JSON.stringify(next));
      } catch {}
      return next;
    });
    const target = parcels26.find((p) => p.id === id);
    addLog(
      '26개 필지 제원 수정',
      `${target?.name || id + '번 필지'} (${target?.jibun || ''}) 제원 저장`,
      'update'
    );
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26: nextParcels26.length > 0 ? nextParcels26 : parcels26,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // 26개 필지 분양 상태 토글 (분양 가능 <-> 분양 완료)
  const toggleParcel26Status = (id: number) => {
    let nextParcels26: Parcel26Item[] = [];
    setParcels26((prev) => {
      const next = prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === '분양 완료' ? '분양 가능' : '분양 완료';
          const nextPrice = nextStatus === '분양 완료' ? '계약 완료' : (p.price === '계약 완료' ? '7,500만원' : p.price);
          return {
            ...p,
            status: nextStatus,
            price: nextPrice,
          };
        }
        return p;
      });
      nextParcels26 = next;
      try {
        localStorage.setItem(STORAGE_KEYS.PARCELS26, JSON.stringify(next));
      } catch {}
      return next;
    });
    const target = parcels26.find((p) => p.id === id);
    const nextStatusKorean = target?.status === '분양 완료' ? '분양 가능' : '분양 완료';
    addLog(
      '26개 필지 상태 전환',
      `${target?.name || id + '번 필지'} -> [${nextStatusKorean}]`,
      'update'
    );
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26: nextParcels26.length > 0 ? nextParcels26 : parcels26,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const updateAllParcels26UnitPrice = (unitPrice: number) => {
    let nextParcels26: Parcel26Item[] = [];
    setParcels26((prev) => {
      const next = prev.map((p) => {
        const pNum = parseFloat(p.area.replace(/[^0-9.]/g, '')) || 100;
        const totalWan = Math.round(pNum * unitPrice);
        const formattedPrice = totalWan >= 10000
          ? `${Math.floor(totalWan / 10000)}억 ${totalWan % 10000 > 0 ? (totalWan % 10000).toLocaleString() + '만원' : ''}`.trim()
          : `${totalWan.toLocaleString()}만원`;
        return {
          ...p,
          unitPrice,
          price: p.status === '분양 완료' ? p.price : formattedPrice,
        };
      });
      nextParcels26 = next;
      try {
        localStorage.setItem(STORAGE_KEYS.PARCELS26, JSON.stringify(next));
      } catch {}
      return next;
    });
    addLog('전체 필지 평단가 일괄 변경', `평당 ${unitPrice}만원 일괄 적용`, 'update');
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26: nextParcels26.length > 0 ? nextParcels26 : parcels26,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const resetParcels26 = () => {
    setParcels26(PARCELS_26_DATA);
    try {
      localStorage.removeItem(STORAGE_KEYS.PARCELS26);
    } catch {}
    addLog('26개 필지 데이터 초기화', '초기 26개 지적도 기본값으로 복원', 'settings');
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26: PARCELS_26_DATA,
        config,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const addReservation = (
    data: Omit<VisitReservation, 'id' | 'createdAt' | 'status'>
  ): boolean => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(now.getDate()).padStart(2, '0')} ${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRes: VisitReservation = {
      ...data,
      id: `res-${Date.now()}`,
      createdAt: dateStr,
      status: 'pending',
    };

    setReservations((prev) => {
      const next = [newRes, ...prev];
      syncToServer({
        parcels,
        parcels26,
        config,
        reservations: next,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
      return next;
    });
    addLog(
      '현장방문 예약 접수',
      `${data.name} 고객님 (${data.interestedParcel || '전체 필지'})`,
      'create'
    );
    return true;
  };

  const updateReservationStatus = (
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled'
  ) => {
    let nextReservations: VisitReservation[] = [];
    setReservations((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, status } : r));
      nextReservations = next;
      return next;
    });
    const target = reservations.find((r) => r.id === id);
    const statusKorean =
      status === 'confirmed'
        ? '상담/예약 확정'
        : status === 'cancelled'
        ? '예약 취소'
        : '접수 대기';
    addLog(
      '예약 상태 업데이트',
      `${target?.name || id} 고객님 -> [${statusKorean}]`,
      'update'
    );
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26,
        config,
        reservations: nextReservations.length > 0 ? nextReservations : reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const deleteReservation = (id: string) => {
    const target = reservations.find((r) => r.id === id);
    let nextReservations: VisitReservation[] = [];
    setReservations((prev) => {
      const next = prev.filter((r) => r.id !== id);
      nextReservations = next;
      return next;
    });
    addLog('예약 내역 삭제', `${target?.name || id} 고객님 예약 기록`, 'delete');
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26,
        config,
        reservations: nextReservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    let nextConfigResult: SiteConfig = config;
    setConfig((prev) => {
      const prevCopy = JSON.parse(JSON.stringify(prev));
      const nextConfig = {
        ...prevCopy,
        ...newConfig,
        theme: { ...prevCopy.theme, ...(newConfig.theme || {}) },
        overview: { ...prevCopy.overview, ...(newConfig.overview || {}) },
        seo: { ...prevCopy.seo, ...(newConfig.seo || {}) },
        footer: { ...prevCopy.footer, ...(newConfig.footer || {}) },
        mapMarker: { ...(prevCopy.mapMarker || INITIAL_MAP_MARKER_CONFIG), ...(newConfig.mapMarker || {}) },
        sectionContent: { ...(prevCopy.sectionContent || INITIAL_SECTION_CONTENT_CONFIG), ...(newConfig.sectionContent || {}) },
        textCustomizer: { ...(prevCopy.textCustomizer || {}), ...(newConfig.textCustomizer || {}) },
        heroPillStyle: { ...(prevCopy.heroPillStyle || {}), ...(newConfig.heroPillStyle || {}) },
      };
      nextConfigResult = nextConfig;
      try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(nextConfig));
      } catch {}
      return nextConfig;
    });
    addLog('사이트 설정 변경', '정보 및 텍스트/테마 업데이트', 'settings');
    if (isAdmin) {
      syncToServer({
        parcels,
        parcels26,
        config: nextConfigResult,
        reservations,
        activityLogs,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const resetToDefaults = () => {
    setParcels(INITIAL_PARCELS);
    setParcels26(PARCELS_26_DATA);
    setConfig(INITIAL_CONFIG);
    setReservations(INITIAL_RESERVATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    try {
      localStorage.removeItem(STORAGE_KEYS.PARCELS);
      localStorage.removeItem(STORAGE_KEYS.PARCELS26);
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
      localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
      localStorage.removeItem(STORAGE_KEYS.LOGS);
    } catch {}
    addLog('시스템 초기화', '초기 26개 필지 및 골든포레스트 데이터로 복원', 'settings');
    if (isAdmin) {
      syncToServer({
        parcels: INITIAL_PARCELS,
        parcels26: PARCELS_26_DATA,
        config: INITIAL_CONFIG,
        reservations: INITIAL_RESERVATIONS,
        activityLogs: INITIAL_ACTIVITY_LOGS,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const exportDataAsJson = () => {
    const data = {
      parcels,
      parcels26,
      config,
      reservations,
      activityLogs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `golden_forest_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataFromJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      let newParcels = parcels;
      let newParcels26 = parcels26;
      let newConfig = config;
      let newRes = reservations;
      let newLogs = activityLogs;

      if (parsed.parcels && Array.isArray(parsed.parcels)) {
        newParcels = parsed.parcels;
        setParcels(newParcels);
      }
      if (parsed.parcels26 && Array.isArray(parsed.parcels26)) {
        newParcels26 = parsed.parcels26;
        setParcels26(newParcels26);
      }
      if (parsed.config) {
        newConfig = { ...config, ...parsed.config };
        setConfig(newConfig);
      }
      if (parsed.reservations && Array.isArray(parsed.reservations)) {
        newRes = parsed.reservations;
        setReservations(newRes);
      }
      if (parsed.activityLogs && Array.isArray(parsed.activityLogs)) {
        newLogs = parsed.activityLogs;
        setActivityLogs(newLogs);
      }
      addLog('데이터 복원 완료', '외부 백업 JSON 파일로부터 성공적 복원', 'settings');
      syncToServer({
        parcels: newParcels,
        parcels26: newParcels26,
        config: newConfig,
        reservations: newRes,
        activityLogs: newLogs,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const openReservationModal = (parcelNumber?: string) => {
    setReservationTargetParcel(parcelNumber);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setReservationTargetParcel(undefined);
  };

  const openPhoneConsultModal = () => {
    setIsPhoneConsultModalOpen(true);
  };

  const closePhoneConsultModal = () => {
    setIsPhoneConsultModalOpen(false);
  };

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCustomText = (key: keyof TextCustomizerConfig, fallback: string): string => {
    const customizer = config.textCustomizer;
    if (!customizer || !customizer[key]) return fallback;
    const item = customizer[key];
    if (isMobile) {
      return item.useSame ? item.pc : item.mobile;
    }
    return item.pc;
  };

  const getCustomTextStyle = (
    key: keyof TextCustomizerConfig,
    defaultPcSize: string = '',
    defaultMobileSize: string = '',
    defaultPcWeight: string = '',
    defaultMobileWeight: string = ''
  ): { size: string; weight: string; className: string } => {
    const customizer = config.textCustomizer;
    if (!customizer || !customizer[key]) {
      const sz = isMobile ? (defaultMobileSize || defaultPcSize) : (defaultPcSize || defaultMobileSize);
      const wt = isMobile ? (defaultMobileWeight || defaultPcWeight) : (defaultPcWeight || defaultMobileWeight);
      return { size: sz, weight: wt, className: `${sz} ${wt}`.trim() };
    }

    const item = customizer[key];
    const pcSz = item.pcSize || defaultPcSize;
    const mbSz = item.useSame ? (item.pcSize || defaultPcSize) : (item.mobileSize || defaultMobileSize || defaultPcSize);
    const pcWt = item.pcWeight || defaultPcWeight;
    const mbWt = item.useSame ? (item.pcWeight || defaultPcWeight) : (item.mobileWeight || defaultMobileWeight || defaultPcWeight);

    const size = isMobile ? mbSz : pcSz;
    const weight = isMobile ? mbWt : pcWt;

    return {
      size,
      weight,
      className: `${size} ${weight}`.trim(),
    };
  };

  return (
    <AppContext.Provider
      value={{
        parcels,
        parcels26,
        config,
        reservations,
        activityLogs,
        getCustomText,
        getCustomTextStyle,
        isMobile,
        isAdmin,
        setIsAdmin,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        selectedParcel,
        setSelectedParcel,
        isReservationModalOpen,
        setIsReservationModalOpen,
        reservationTargetParcel,
        openReservationModal,
        closeReservationModal,
        isPhoneConsultModalOpen,
        setIsPhoneConsultModalOpen,
        openPhoneConsultModal,
        closePhoneConsultModal,
        updateParcelStatus,
        updateParcelPrice,
        updateParcel26,
        toggleParcel26Status,
        resetParcels26,
        addReservation,
        updateReservationStatus,
        deleteReservation,
        updateConfig,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
