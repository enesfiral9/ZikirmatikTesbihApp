import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEMES, Theme } from '../../theme/themes';
import { colors } from '../../theme/colors';

interface Props {
  visible: boolean;
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  onClose: () => void;
}

const ThemeModal: React.FC<Props> = ({
  visible,
  currentTheme,
  onSelectTheme,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="color-palette-outline" size={24} color={colors.primaryMid} />
            <Text style={styles.title}>Tema Rengi Seçin</Text>
          </View>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme.id;
              return (
                <TouchableOpacity
                  key={theme.id}
                  style={[
                    styles.themeItem,
                    isSelected && styles.themeItemSelected,
                  ]}
                  onPress={() => {
                    onSelectTheme(theme);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.left}>
                    {/* Renk Önizleme Çemberi */}
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: theme.outerBorder, borderColor: theme.glowShadow },
                      ]}
                    />
                    <Text style={styles.themeName}>{theme.name}</Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={22} color={colors.primaryMid} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>KAPAT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  list: {
    marginVertical: 4,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: colors.backgroundDark,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  themeItemSelected: {
    borderColor: colors.primaryMid,
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  themeName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  closeBtn: {
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryMid,
    letterSpacing: 1,
  },
});

export default ThemeModal;
