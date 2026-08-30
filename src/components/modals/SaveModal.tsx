import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Zikir, ZikirFormData } from '../../types';

interface Props {
  visible: boolean;
  currentCount: number;
  activeZikir?: Zikir | null;
  onSave: (data: ZikirFormData) => void;
  onCancel: () => void;
}

const PRESET_ZIKIRLER = [
  { name: 'Sübhanallah', arabic: 'سُبْحَانَ اللَّهِ' },
  { name: 'Elhamdülillah', arabic: 'الْحَمْدُ لِلَّهِ' },
  { name: 'Allahu Ekber', arabic: 'اللَّهُ أَكْبَرُ' },
  { name: 'La ilahe illallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ' },
  { name: 'Estağfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ' },
  { name: 'Allah', arabic: 'اللَّهُ' },
];

const PRESET_TARGETS = [0, 33, 99, 100, 500, 1000];

const SaveModal: React.FC<Props> = ({
  visible,
  currentCount,
  activeZikir,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [target, setTarget] = useState(33);
  const [customTarget, setCustomTarget] = useState('');
  const [useCustomTarget, setUseCustomTarget] = useState(false);

  React.useEffect(() => {
    if (visible) {
      if (activeZikir) {
        setName(activeZikir.name);
        setArabicName(activeZikir.arabicName || '');
        if (PRESET_TARGETS.includes(activeZikir.target)) {
          setTarget(activeZikir.target);
          setUseCustomTarget(false);
        } else {
          setCustomTarget(String(activeZikir.target));
          setUseCustomTarget(true);
        }
      } else {
        setName('');
        setArabicName('');
        setTarget(33);
        setCustomTarget('');
        setUseCustomTarget(false);
      }
    }
  }, [visible, activeZikir]);

  const handlePreset = (preset: { name: string; arabic: string }) => {
    setName(preset.name);
    setArabicName(preset.arabic);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const finalTarget = useCustomTarget
      ? parseInt(customTarget) || 0
      : target;
    onSave({ name: name.trim(), arabicName: arabicName.trim(), target: finalTarget });
    setName('');
    setArabicName('');
    setTarget(33);
    setCustomTarget('');
    setUseCustomTarget(false);
  };

  const handleCancel = () => {
    setName('');
    setArabicName('');
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            {activeZikir ? 'Zikri Güncelle / Üzerine Ekle' : 'Listeye Kaydet'}
          </Text>
          <Text style={styles.countInfo}>Sayım: {currentCount}</Text>

          {/* Hızlı seçimler */}
          <Text style={styles.sectionLabel}>Hızlı Seç</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.presetsScroll}
          >
            {PRESET_ZIKIRLER.map((p) => (
              <TouchableOpacity
                key={p.name}
                style={[
                  styles.presetChip,
                  name === p.name && styles.presetChipActive,
                ]}
                onPress={() => handlePreset(p)}
              >
                <Text
                  style={[
                    styles.presetText,
                    name === p.name && styles.presetTextActive,
                  ]}
                >
                  {p.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* İsim */}
          <TextInput
            style={styles.input}
            placeholder="Lütfen bir isim belirleyin..."
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          {/* Arapça isim */}
          <TextInput
            style={[styles.input, styles.arabicInput]}
            placeholder="اسم عربي (isteğe bağlı)"
            placeholderTextColor={colors.textSecondary}
            value={arabicName}
            onChangeText={setArabicName}
            textAlign="right"
          />

          {/* Hedef sayı */}
          <Text style={styles.sectionLabel}>Hedef Sayı</Text>
          <View style={styles.targetRow}>
            {PRESET_TARGETS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.targetChip,
                  !useCustomTarget && target === t && styles.targetChipActive,
                ]}
                onPress={() => {
                  setTarget(t);
                  setUseCustomTarget(false);
                }}
              >
                <Text
                  style={[
                    styles.targetText,
                    !useCustomTarget && target === t && styles.targetTextActive,
                  ]}
                >
                  {t === 0 ? '∞' : t}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.targetChip,
                useCustomTarget && styles.targetChipActive,
              ]}
              onPress={() => setUseCustomTarget(true)}
            >
              <Text
                style={[
                  styles.targetText,
                  useCustomTarget && styles.targetTextActive,
                ]}
              >
                Özel
              </Text>
            </TouchableOpacity>
          </View>

          {useCustomTarget && (
            <TextInput
              style={styles.input}
              placeholder="Hedef sayıyı girin..."
              placeholderTextColor={colors.textSecondary}
              value={customTarget}
              onChangeText={setCustomTarget}
              keyboardType="numeric"
            />
          )}

          {/* Butonlar */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>VAZGEÇ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}
              disabled={!name.trim()}
            >
              <Text style={styles.saveText}>
                {activeZikir ? 'ÜZERİNE EKLE' : 'KAYDET'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  countInfo: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryMid,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  presetsScroll: {
    marginBottom: 14,
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presetChipActive: {
    backgroundColor: colors.primaryMid,
    borderColor: colors.primaryMid,
  },
  presetText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  presetTextActive: {
    color: colors.textOnDark,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryMid,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  },
  arabicInput: {
    fontStyle: 'italic',
  },
  targetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  targetChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.backgroundDark,
    borderWidth: 1,
    borderColor: colors.border,
  },
  targetChipActive: {
    backgroundColor: colors.primaryMid,
    borderColor: colors.primaryMid,
  },
  targetText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  targetTextActive: {
    color: colors.textOnDark,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
    marginTop: 8,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  saveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryMid,
    letterSpacing: 1,
  },
});

export default SaveModal;
