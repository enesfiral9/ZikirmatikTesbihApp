import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useKeepAwake } from 'expo-keep-awake';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList, Zikir, ZikirFormData } from '../types';
import { THEMES, Theme } from '../theme/themes';

import TopBar from '../components/ui/TopBar';
import ActionButton from '../components/ui/ActionButton';
import CounterDisplay from '../components/Counter/CounterDisplay';
import CounterButton from '../components/Counter/CounterButton';
import ResetButton from '../components/Counter/ResetButton';
import SaveModal from '../components/modals/SaveModal';
import ThemeModal from '../components/modals/ThemeModal';

import { useCounter } from '../hooks/useCounter';
import { useHaptics } from '../hooks/useHaptics';
import { useZikirDB } from '../hooks/useZikirDB';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Counter'>;
  route: RouteProp<RootStackParamList, 'Counter'>;
};

const CounterScreen: React.FC<Props> = ({ navigation, route }) => {
  useKeepAwake();

  const [activeZikir, setActiveZikir] = useState<Zikir | null>(null);
  const [target, setTarget] = useState(33);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  const { enabled: hapticsEnabled, trigger, triggerSuccess, toggle: toggleHaptics } = useHaptics();
  const { save, updateZikir } = useZikirDB();

  const handleTargetReached = useCallback(async () => {
    await triggerSuccess();
    Alert.alert('🎉 Tebrikler!', `Hedefinize ulaştınız: ${target}`, [
      { text: 'Devam Et' },
    ]);
  }, [target, triggerSuccess]);

  const { count, setCount, increment, reset } = useCounter({
    target,
    onTargetReached: handleTargetReached,
  });

  useEffect(() => {
    if (route.params?.activeZikir) {
      const z = route.params.activeZikir;
      setActiveZikir(z);
      setCount(z.count);
      setTarget(z.target || 33);
    }
  }, [route.params?.activeZikir, setCount]);

  const handleIncrement = useCallback(async () => {
    await trigger();
    increment();
  }, [trigger, increment]);

  const handleReset = useCallback(() => {
    Alert.alert('Sıfırla', 'Sayacı sıfırlamak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sıfırla',
        style: 'destructive',
        onPress: () => {
          reset();
          setActiveZikir(null);
        },
      },
    ]);
  }, [reset]);

  const handleSaveOrUpdate = useCallback(async () => {
    if (activeZikir) {
      await updateZikir(activeZikir.id, count);
      setActiveZikir((prev) => (prev ? { ...prev, count } : null));
      Alert.alert('Üzerine Eklendi ✓', `"${activeZikir.name}" zikri ${count} olarak güncellendi.`);
    } else {
      setSaveModalVisible(true);
    }
  }, [activeZikir, count, updateZikir]);

  const handleModalSave = useCallback(
    async (data: ZikirFormData) => {
      if (activeZikir) {
        await updateZikir(activeZikir.id, count, data);
        setActiveZikir((prev) =>
          prev
            ? { ...prev, name: data.name, arabicName: data.arabicName, target: data.target, count }
            : null
        );
        setSaveModalVisible(false);
        Alert.alert('Güncellendi ✓', `"${data.name}" kaydedildi.`);
      } else {
        const created = await save(data, count);
        setActiveZikir(created);
        setSaveModalVisible(false);
        Alert.alert('Kaydedildi ✓', `"${data.name}" listenize eklendi ve üzerine ekleme moduna geçildi.`);
      }
    },
    [activeZikir, save, updateZikir, count]
  );

  return (
    <View style={styles.root}>
      {/* Dinamik Arka Plan Gradiyenti */}
      <LinearGradient
        colors={currentTheme.bgGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>

        {/* ── Üst bar: 4 daire buton ── */}
        <View style={styles.topSection}>
          <TopBar
            hapticsEnabled={hapticsEnabled}
            onToggleHaptics={toggleHaptics}
            onOpenThemeModal={() => setThemeModalVisible(true)}
            onOpenSettings={() => {}}
            topBtnBg={currentTheme.topBtnBg}
          />
        </View>

        {/* ── Orta: Fiziksel Tesbih Gövdesi ── */}
        <View style={styles.counterSection}>
          <View style={[styles.greenGlow, { shadowColor: currentTheme.glowShadow }]}>
            <View style={[styles.bodyOuter, { backgroundColor: currentTheme.outerBorder }]}>
              <View style={styles.bodyInner}>

                {/* Etiket veya Aktif Zikir İsim */}
                {activeZikir ? (
                  <View
                    style={[
                      styles.activeHeader,
                      {
                        backgroundColor: currentTheme.activeTagBg,
                        borderColor: currentTheme.activeTagBorder,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.activeTitle, { color: currentTheme.activeTagText }]}
                      numberOfLines={1}
                    >
                      📌 {activeZikir.name}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.label}>AKILLI ZİKİRMATİK</Text>
                )}

                {/* LCD Ekran */}
                <View style={styles.displayWrap}>
                  <CounterDisplay count={count} target={target} />
                </View>

                {/* Butonlar */}
                <View style={styles.buttonsArea}>
                  <View style={styles.resetPosition}>
                    <ResetButton onPress={handleReset} />
                  </View>
                  <CounterButton onPress={handleIncrement} />
                </View>

              </View>
            </View>
          </View>
        </View>

        {/* ── Alt: KAYDET / ÜZERİNE EKLE + ZİKİRLERİM ── */}
        <View style={styles.bottomSection}>
          <ActionButton
            label={activeZikir ? 'ÜZERİNE EKLE' : 'KAYDET'}
            onPress={handleSaveOrUpdate}
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
        activeZikir={activeZikir}
        onSave={handleModalSave}
        onCancel={() => setSaveModalVisible(false)}
      />

      <ThemeModal
        visible={themeModalVisible}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onClose={() => setThemeModalVisible(false)}
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

  activeHeader: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.4)',
    maxWidth: '90%',
  },
  activeTitle: {
    color: '#81C784',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
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
