export interface ColorPreset {
  id: string;
  name: string;
  accentColor: string;
  hoverColor: string;
  glowColor: string;
  badgeBg: string;
  description: string;
}

export const ACCENT_COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'nebula-violet',
    name: '네뷸라 바이올렛 (권장)',
    accentColor: '#8B5CF6',
    hoverColor: '#7C3AED',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    description: '고급스럽고 신비로운 대표 보라색 포인트 컬러',
  },
  {
    id: 'neon-amethyst',
    name: '네온 자수정 (Amethyst)',
    accentColor: '#A855F7',
    hoverColor: '#9333EA',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    description: '화려하고 세련된 비비드 네온 퍼플',
  },
  {
    id: 'electric-indigo',
    name: '일렉트릭 인디고 (Indigo)',
    accentColor: '#6366F1',
    hoverColor: '#4F46E5',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    description: '테크 감성이 돋보이는 딥 블루 바이올렛',
  },
  {
    id: 'royal-purple',
    name: '로열 딥 퍼플 (Deep Purple)',
    accentColor: '#7E22CE',
    hoverColor: '#6B21A8',
    glowColor: 'rgba(126, 34, 206, 0.35)',
    badgeBg: 'rgba(126, 34, 206, 0.15)',
    description: '중후하고 권위 있는 클래식 딥 퍼플',
  },
  {
    id: 'fuchsia-rose',
    name: '퓨샤 로즈 바이올렛',
    accentColor: '#D946EF',
    hoverColor: '#C026D3',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    badgeBg: 'rgba(217, 70, 239, 0.15)',
    description: '감각적인 트렌디 핑크 바이올렛 악센트',
  },
];

export interface BackgroundPreset {
  id: string;
  name: string;
  darkBg: string;
  cardBg: string;
  borderTone: string;
  description: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'obsidian-black',
    name: '흑요석 블랙 (#0B0B0F)',
    darkBg: '#0B0B0F',
    cardBg: '#13121D',
    borderTone: 'rgba(255, 255, 255, 0.08)',
    description: '가장 깊이감 있고 눈이 편안한 스탠다드 다크',
  },
  {
    id: 'midnight-violet',
    name: '미드나잇 퍼플 틴트 (#0E0C16)',
    darkBg: '#0E0C16',
    cardBg: '#171424',
    borderTone: 'rgba(139, 92, 246, 0.15)',
    description: '은은한 보라빛이 감도는 몽환적인 다크 배경',
  },
  {
    id: 'pure-carbon',
    name: '카본 제트 블랙 (#070709)',
    darkBg: '#070709',
    cardBg: '#101015',
    borderTone: 'rgba(255, 255, 255, 0.06)',
    description: '극강의 명도 대비를 자랑하는 하이엔드 제트 블랙',
  },
];
