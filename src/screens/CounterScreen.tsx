import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useKeepAwake } from 'expo-keep-awake';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, ZikirFormData } from '../types';

import TopBar from '../components/ui/TopBar';
import ActionButton from '../components/ui/ActionButton';
import CounterDisplay from '../components/Counter/CounterDisplay';
import CounterButton from '../components/Counter/CounterButton';
import ResetButton from '../components/Counter/ResetButton';
import SaveModal from '../components/modals/SaveModal';

import { useCounter } from '../hooks/useCounter';
import { useHaptics } from '../hooks/useHaptics';
import { useZikirDB } from '../hooks/useZikirDB';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Counter'>;
};

const CounterScreen: React.FC<Props> = ({ navigation }) => {
  useKeepAwake();

  const [target] = useState(33);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const { enabled: hapticsEnabled, trigger, triggerSuccess, toggle: toggleHaptics } = useHaptics();
  const { save } = useZikirDB();

  const handleTargetReached = useCallback(async () => {
    await triggerSuccess();
    Alert.alert('🎉 Tebrikler!', `Hedefinize ulaştınız: ${target}`, [
      { text: 'Devam Et' },
    ]);
  }, [target, triggerSuccess]);

  const { count, increment, reset } = useCounter({
    target,
    onTargetReached: handleTargetReached,
  });

  const handleIncrement = useCallback(async () => {
    await trigger();
    increment();
  }, [trigger, increment]);

  const handleReset = useCallback(() => {
    Alert.alert('Sıfırla', 'Sayacı sıfırlamak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sıfırla', onPress: reset, style: 'destructive' },
    ]);
  }, [reset]);

  const handleSave = useCallback(
    async (data: ZikirFormData) => {
      await save(data, count);
      setSaveModalVisible(false);
      Alert.alert('Kaydedildi ✓', `"${data.name}" listenize eklendi.`);
    },
    [save, count]
  );

  return (
    <View style={styles.root}>
      {/* Yeşil arka plan */}
      <LinearGradient
        colors={['#1E6B24', '#2E7D32', '#1E6B24']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>

        {/* ── Üst bar: 4 koyu yeşil daire ── */}
        <View style={styles.topSection}>
          <TopBar
            hapticsEnabled={hapticsEnabled}
            onToggleHaptics={toggleHaptics}
            onOpenSettings={() => {}}
          />
        </View>

        {/* ── Orta: Fiziksel Tesbih Gövdesi ── */}
        <View style={styles.counterSection}>
          {/*
            Referanstaki şekil: üstten baskıca oval,
            altta daha geniş — rounded pentagon gibi
          */}
          <View style={styles.greenGlow}>
            {/* Parlak yeşil dış kenar */}
            <View style={styles.bodyOuter}>
              {/* Siyah/koyu gövde */}
              <View style={styles.bodyInner}>

                {/* Etiket */}
                <Text style={styles.label}>AKILLI ZİKİRMATİK</Text>

                {/* LCD Ekran */}
                <View style={styles.displayWrap}>
                  <CounterDisplay count={count} target={target} />
                </View>

                {/* Butonlar:
                    - Küçük reset üstte-sağda
                    - Büyük metalik tam ortada-altta
                */}
                <View style={styles.buttonsArea}>
                  {/* Küçük reset — sağ üst köşe */}
                  <View style={styles.resetPosition}>
                    <ResetButton onPress={handleReset} />
                  </View>
                  {/* Büyük metalik sayaç butonu — tam ortada */}
                  <CounterButton onPress={handleIncrement} />
                </View>

              </View>
            </View>
          </View>
        </View>

        {/* ── Alt: KAYDET + ZİKİRLERİM ── */}
        <View style={styles.bottomSection}>
          <ActionButton
            label="KAYDET"
            onPress={() => setSaveModalVisible(true)}
          />
          <ActionButton
            label="ZİKİRLERİM"
            onPress={() => navigation.navigate('Zikirlerim')}
          />
        </View>

      </SafeAreaView>

      <SaveModal
        visible={saveModalVisible}
        currentCount={count}
        onSave={handleSave}
        onCancel={() => setSaveModalVisible(false)}
      />
    </View>
  );
};

const BODY_W = 280;
const BODY_H = 320;
const RADIUS = 80;

const styles = StyleSheet.create({
  root: { flex: 1 },

  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },

  /* Üst */
  topSection: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },

  /* Orta */
  counterSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Parlayan yeşil hâle — referanstaki brightness */
  greenGlow: {
    shadowColor: '#4CAF50',
    shadowOpacity: 0.9,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
    borderRadius: RADIUS + 8,
  },

  /* Parlak yeşil dış yüzey */
  bodyOuter: {
    width: BODY_W + 16,
    height: BODY_H + 16,
    borderRadius: RADIUS + 8,
    backgroundColor: '#5EC962',     // parlak yeşil kenar
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Koyu siyah gövde */
  bodyInner: {
    width: BODY_W,
    height: BODY_H,
    borderRadius: RADIUS,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 22,
    paddingHorizontal: 18,
  },

  /* "AKILLI ZİKİRMATİK" etiketi */
  label: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 9,
    letterSpacing: 2.5,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },

  /* LCD sarmalayıcı */
  displayWrap: {
    width: '100%',
  },

  /* Büyük buton + küçük reset konumlandırması */
  buttonsArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 158,
  },

  /* Küçük reset: büyük butonun sağ üst köşesine konumluyoruz */
  resetPosition: {
    position: 'absolute',
    right: 28,
    top: 0,
    zIndex: 10,
  },

  /* Alt */
  bottomSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
});

export default CounterScreen;
