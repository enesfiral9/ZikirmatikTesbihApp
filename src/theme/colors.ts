export const colors = {
  // Ana yeşil tonları (İslami yeşil)
  primary: '#1B5E20',
  primaryDark: '#0A3D0A',
  primaryMid: '#2E7D32',
  primaryLight: '#388E3C',
  primaryBright: '#4CAF50',
  primaryGlow: '#66BB6A',

  // Altın/sarı vurgu (banner, aksan)
  accent: '#F9A825',
  accentLight: '#FDD835',

  // Arka planlar
  background: '#F1F8E9',
  backgroundDark: '#E8F5E9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // LCD / Sayaç
  counterBody: '#1A1A1A',
  counterBodyBorder: '#3CAF50',
  lcdBackground: '#2B2B1E',
  lcdText: '#8BFF2E',
  lcdTextDim: '#3A5C10',

  // Metalik buton (büyük sayaç butonu)
  buttonMetalLight: '#E0E0E0',
  buttonMetalMid: '#BDBDBD',
  buttonMetalDark: '#9E9E9E',
  buttonMetalShadow: '#757575',

  // Metin
  text: '#1B5E20',
  textSecondary: '#757575',
  textOnDark: '#FFFFFF',
  textOnAccent: '#1B5E20',

  // Badge
  badgeBg: '#2E7D32',
  badgeText: '#FFFFFF',

  // Gölge / border
  border: '#C8E6C9',
  shadow: 'rgba(0,0,0,0.15)',
  shadowDeep: 'rgba(0,0,0,0.3)',

  // Tehlike / silme
  danger: '#D32F2F',
  dangerLight: '#FFCDD2',
};

export const gradients = {
  counterBody: ['#1A1A1A', '#2D2D2D', '#1A1A1A'] as const,
  screen: ['#1B5E20', '#2E7D32', '#388E3C'] as const,
  metalButton: ['#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575'] as const,
};
