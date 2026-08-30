export interface Theme {
  id: string;
  name: string;
  // Day mode
  bgGradient: [string, string, string];
  outerBorder: string;
  glowShadow: string;
  topBtnBg: string;
  activeTagBg: string;
  activeTagBorder: string;
  activeTagText: string;
  // Night mode (Theme-harmonized Dark Mode)
  nightBgGradient: [string, string, string];
  nightOuterBorder: string;
  nightGlowShadow: string;
  nightTopBtnBg: string;
  nightLcdOuter: string;
  nightLcdInner: string;
  nightLcdText: string;
  nightDimText: string;
  nightActiveTagBg: string;
  nightActiveTagBorder: string;
  nightActiveTagText: string;
}

export const THEMES: Theme[] = [
  {
    id: 'emerald',
    name: 'Zümrüt Yeşil',
    // Day
    bgGradient: ['#1E6B24', '#2E7D32', '#1E6B24'],
    outerBorder: '#5EC962',
    glowShadow: '#4CAF50',
    topBtnBg: '#0A3D0A',
    activeTagBg: 'rgba(76, 175, 80, 0.25)',
    activeTagBorder: 'rgba(76, 175, 80, 0.5)',
    activeTagText: '#81C784',
    // Night
    nightBgGradient: ['#051206', '#0D240E', '#051206'],
    nightOuterBorder: '#2E7D32',
    nightGlowShadow: '#4CAF50',
    nightTopBtnBg: '#051806',
    nightLcdOuter: '#1B2E17',
    nightLcdInner: '#0B1A0C',
    nightLcdText: '#66FF66',
    nightDimText: 'rgba(102, 255, 102, 0.12)',
    nightActiveTagBg: 'rgba(102, 255, 102, 0.15)',
    nightActiveTagBorder: 'rgba(102, 255, 102, 0.35)',
    nightActiveTagText: '#81C784',
  },
  {
    id: 'ruby',
    name: 'Yakut Kırmızı',
    // Day
    bgGradient: ['#7B1FA2', '#B71C1C', '#880E4F'],
    outerBorder: '#FF5252',
    glowShadow: '#E53935',
    topBtnBg: '#4A0007',
    activeTagBg: 'rgba(244, 67, 54, 0.25)',
    activeTagBorder: 'rgba(244, 67, 54, 0.5)',
    activeTagText: '#FF8A80',
    // Night
    nightBgGradient: ['#140205', '#280509', '#140205'],
    nightOuterBorder: '#C62828',
    nightGlowShadow: '#FF5252',
    nightTopBtnBg: '#180003',
    nightLcdOuter: '#33080B',
    nightLcdInner: '#1C0406',
    nightLcdText: '#FF5252',
    nightDimText: 'rgba(255, 82, 82, 0.12)',
    nightActiveTagBg: 'rgba(255, 82, 82, 0.15)',
    nightActiveTagBorder: 'rgba(255, 82, 82, 0.35)',
    nightActiveTagText: '#FF8A80',
  },
  {
    id: 'sapphire',
    name: 'Safir Mavi',
    // Day
    bgGradient: ['#0D47A1', '#1565C0', '#0D47A1'],
    outerBorder: '#448AFF',
    glowShadow: '#1E88E5',
    topBtnBg: '#051E3E',
    activeTagBg: 'rgba(33, 150, 243, 0.25)',
    activeTagBorder: 'rgba(33, 150, 243, 0.5)',
    activeTagText: '#82B1FF',
    // Night
    nightBgGradient: ['#020A16', '#05162D', '#020A16'],
    nightOuterBorder: '#1565C0',
    nightGlowShadow: '#448AFF',
    nightTopBtnBg: '#020D1B',
    nightLcdOuter: '#0A254A',
    nightLcdInner: '#041124',
    nightLcdText: '#40C4FF',
    nightDimText: 'rgba(64, 196, 255, 0.12)',
    nightActiveTagBg: 'rgba(64, 196, 255, 0.15)',
    nightActiveTagBorder: 'rgba(64, 196, 255, 0.35)',
    nightActiveTagText: '#82B1FF',
  },
  {
    id: 'onyx',
    name: 'Gece Siyahı',
    // Day
    bgGradient: ['#181818', '#2D2D2D', '#181818'],
    outerBorder: '#78909C',
    glowShadow: '#607D8B',
    topBtnBg: '#0B0B0B',
    activeTagBg: 'rgba(120, 144, 156, 0.25)',
    activeTagBorder: 'rgba(120, 144, 156, 0.5)',
    activeTagText: '#CFD8DC',
    // Night
    nightBgGradient: ['#080808', '#121212', '#080808'],
    nightOuterBorder: '#455A64',
    nightGlowShadow: '#78909C',
    nightTopBtnBg: '#050505',
    nightLcdOuter: '#1E272C',
    nightLcdInner: '#0D1113',
    nightLcdText: '#ECEFF1',
    nightDimText: 'rgba(236, 239, 241, 0.12)',
    nightActiveTagBg: 'rgba(236, 239, 241, 0.15)',
    nightActiveTagBorder: 'rgba(236, 239, 241, 0.35)',
    nightActiveTagText: '#ECEFF1',
  },
  {
    id: 'gold',
    name: 'Altın Sarı',
    // Day
    bgGradient: ['#4E342E', '#6D4C41', '#3E2723'],
    outerBorder: '#FFC107',
    glowShadow: '#FFA000',
    topBtnBg: '#21130D',
    activeTagBg: 'rgba(255, 193, 7, 0.25)',
    activeTagBorder: 'rgba(255, 193, 7, 0.5)',
    activeTagText: '#FFE082',
    // Night
    nightBgGradient: ['#120B07', '#22140D', '#120B07'],
    nightOuterBorder: '#FF8F00',
    nightGlowShadow: '#FFC107',
    nightTopBtnBg: '#0F0804',
    nightLcdOuter: '#382306',
    nightLcdInner: '#1C1103',
    nightLcdText: '#FFD54F',
    nightDimText: 'rgba(255, 213, 79, 0.12)',
    nightActiveTagBg: 'rgba(255, 213, 79, 0.15)',
    nightActiveTagBorder: 'rgba(255, 213, 79, 0.35)',
    nightActiveTagText: '#FFE082',
  },
  {
    id: 'rose',
    name: 'Gül Pembe',
    // Day
    bgGradient: ['#880E4F', '#C2185B', '#6A1B9A'],
    outerBorder: '#FF4081',
    glowShadow: '#E91E63',
    topBtnBg: '#3B001F',
    activeTagBg: 'rgba(233, 30, 99, 0.25)',
    activeTagBorder: 'rgba(233, 30, 99, 0.5)',
    activeTagText: '#FF80AB',
    // Night
    nightBgGradient: ['#14020A', '#270415', '#14020A'],
    nightOuterBorder: '#C2185B',
    nightGlowShadow: '#FF4081',
    nightTopBtnBg: '#110008',
    nightLcdOuter: '#38061F',
    nightLcdInner: '#1A020E',
    nightLcdText: '#FF80AB',
    nightDimText: 'rgba(255, 128, 171, 0.12)',
    nightActiveTagBg: 'rgba(255, 128, 171, 0.15)',
    nightActiveTagBorder: 'rgba(255, 128, 171, 0.35)',
    nightActiveTagText: '#FF80AB',
  },
];
