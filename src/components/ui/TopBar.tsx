import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface Props {
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
  onOpenThemeModal: () => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  topBtnBg?: string;
}

const ICONS: {
  name: keyof typeof Ionicons.glyphMap;
  key: string;
}[] = [
  { name: 'star-outline',           key: 'star'      },
  { name: 'phone-portrait-outline',  key: 'haptics'   },
  { name: 'color-palette-outline',   key: 'theme'     },
  { name: 'sunny-outline',           key: 'nightMode' },
];

const TopBar: React.FC<Props> = ({
  hapticsEnabled,
  onToggleHaptics,
  onOpenThemeModal,
  isNightMode,
  onToggleNightMode,
  topBtnBg,
}) => {
  const handlers: Record<string, () => void> = {
    star:      () => {},
    haptics:   onToggleHaptics,
    theme:     onOpenThemeModal,
    nightMode: onToggleNightMode,
  };

  return (
    <View style={styles.container}>
      {ICONS.map((btn) => {
        let iconName = btn.name;
        if (btn.key === 'haptics' && !hapticsEnabled) {
          iconName = 'phone-portrait';
        } else if (btn.key === 'nightMode') {
          iconName = isNightMode ? 'moon' : 'sunny-outline';
        }

        return (
          <TouchableOpacity
            key={btn.key}
            style={[
              styles.iconBtn,
              topBtnBg ? { backgroundColor: topBtnBg } : null,
              btn.key === 'nightMode' && isNightMode && styles.nightModeBtnActive,
            ]}
            onPress={handlers[btn.key]}
            activeOpacity={0.75}
          >
            <Ionicons
              name={iconName}
              size={26}
              color={btn.key === 'nightMode' && isNightMode ? '#FFD54F' : colors.textOnDark}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  iconBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  nightModeBtnActive: {
    borderColor: '#FFD54F',
    borderWidth: 1.5,
  },
});

export default TopBar;
