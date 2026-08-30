import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  count: number;
  target: number;
  isNightMode?: boolean;
}

const CounterDisplay: React.FC<Props> = ({ count, target, isNightMode = false }) => {
  const displayStr = String(count);
  // Referanstaki gibi: mevcut hane kadar dim '8' + gerçek değer üstte
  const totalDigits = Math.max(displayStr.length, 5);
  const dimStr = '8'.repeat(totalDigits);
  const progress = target > 0 ? Math.min(count / target, 1) : 0;
  const barWidth = `${Math.round(progress * 100)}%` as any;

  return (
    <View style={styles.wrapper}>
      {/* LCD Gri/Gümüş veya Gece OLED Ekranı */}
      <View style={[styles.lcdOuter, isNightMode && styles.lcdOuterNight]}>
        <View style={[styles.lcdInner, isNightMode && styles.lcdInnerNight]}>
          {/* Dim segment arka planı */}
          <Text style={[styles.dimText, isNightMode && styles.dimTextNight]}>{dimStr}</Text>
          {/* Gerçek değer */}
          <Text style={[styles.valueText, isNightMode && styles.valueTextNight]}>{displayStr}</Text>
        </View>
      </View>

      {/* Hedef progress — sadece hedef varsa */}
      {target > 0 && (
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: barWidth }]} />
        </View>
      )}
      {target > 0 && (
        <Text style={styles.targetLabel}>
          {count} / {target}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  lcdOuter: {
    width: '100%',
    backgroundColor: '#8A9A7B',   // dış çerçeve — koyu gri yeşil
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  lcdOuterNight: {
    backgroundColor: '#1B2E17',
  },
  lcdInner: {
    backgroundColor: '#B5C4A0',   // referanstaki açık gri-yeşim LCD yüzeyi
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  lcdInnerNight: {
    backgroundColor: '#0F1A0E',
  },
  dimText: {
    position: 'absolute',
    fontSize: 44,
    fontFamily: 'monospace',
    color: 'rgba(0,0,0,0.12)',     // çok soluk — referanstaki dim segment
    letterSpacing: 6,
    includeFontPadding: false,
  },
  dimTextNight: {
    color: 'rgba(118, 255, 3, 0.12)',
  },
  valueText: {
    fontSize: 44,
    fontFamily: 'monospace',
    color: '#1A2A12',              // koyu yeşil-siyah — referanstaki aktif segment
    letterSpacing: 6,
    includeFontPadding: false,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },
  valueTextNight: {
    color: '#76FF03',              // neon parlayan yeşil — gece modu
    textShadowColor: 'rgba(118, 255, 3, 0.5)',
    textShadowRadius: 6,
  },
  progressTrack: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
  },
  targetLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontFamily: 'monospace',
    marginTop: 4,
  },
});

export default CounterDisplay;
