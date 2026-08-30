export interface Theme {
  id: string;
  name: string;
  bgGradient: [string, string, string];
  outerBorder: string;
  glowShadow: string;
  topBtnBg: string;
  activeTagBg: string;
  activeTagBorder: string;
  activeTagText: string;
}

export const THEMES: Theme[] = [
  {
    id: 'emerald',
    name: 'Zümrüt Yeşil',
    bgGradient: ['#1E6B24', '#2E7D32', '#1E6B24'],
    outerBorder: '#5EC962',
    glowShadow: '#4CAF50',
    topBtnBg: '#0A3D0A',
    activeTagBg: 'rgba(76, 175, 80, 0.25)',
    activeTagBorder: 'rgba(76, 175, 80, 0.5)',
    activeTagText: '#81C784',
  },
  {
    id: 'ruby',
    name: 'Yakut Kırmızı',
    bgGradient: ['#7B1FA2', '#B71C1C', '#880E4F'],
    outerBorder: '#FF5252',
    glowShadow: '#E53935',
    topBtnBg: '#4A0007',
    activeTagBg: 'rgba(244, 67, 54, 0.25)',
    activeTagBorder: 'rgba(244, 67, 54, 0.5)',
    activeTagText: '#FF8A80',
  },
  {
    id: 'sapphire',
    name: 'Safir Mavi',
    bgGradient: ['#0D47A1', '#1565C0', '#0D47A1'],
    outerBorder: '#448AFF',
    glowShadow: '#1E88E5',
    topBtnBg: '#051E3E',
    activeTagBg: 'rgba(33, 150, 243, 0.25)',
    activeTagBorder: 'rgba(33, 150, 243, 0.5)',
    activeTagText: '#82B1FF',
  },
  {
    id: 'onyx',
    name: 'Gece Siyahı',
    bgGradient: ['#181818', '#2D2D2D', '#181818'],
    outerBorder: '#78909C',
    glowShadow: '#607D8B',
    topBtnBg: '#0B0B0B',
    activeTagBg: 'rgba(120, 144, 156, 0.25)',
    activeTagBorder: 'rgba(120, 144, 156, 0.5)',
    activeTagText: '#CFD8DC',
  },
  {
    id: 'gold',
    name: 'Altın Sarı',
    bgGradient: ['#4E342E', '#6D4C41', '#3E2723'],
    outerBorder: '#FFC107',
    glowShadow: '#FFA000',
    topBtnBg: '#21130D',
    activeTagBg: 'rgba(255, 193, 7, 0.25)',
    activeTagBorder: 'rgba(255, 193, 7, 0.5)',
    activeTagText: '#FFE082',
  },
  {
    id: 'rose',
    name: 'Gül Pembe',
    bgGradient: ['#880E4F', '#C2185B', '#6A1B9A'],
    outerBorder: '#FF4081',
    glowShadow: '#E91E63',
    topBtnBg: '#3B001F',
    activeTagBg: 'rgba(233, 30, 99, 0.25)',
    activeTagBorder: 'rgba(233, 30, 99, 0.5)',
    activeTagText: '#FF80AB',
  },
];
