import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface Props {
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
  onOpenThemeModal: () => void;
  onOpenSettings: () => void;
  topBtnBg?: string;
}

const ICONS: {
  name: keyof typeof Ionicons.glyphMap;
  key: string;
}[] = [
  { name: 'star-outline',          key: 'star'     },
  { name: 'phone-portrait-outline', key: 'haptics'  },
  { name: 'color-palette-outline',  key: 'theme'    },
  { name: 'settings-outline',       key: 'settings' },
];

const TopBar: React.FC<Props> = ({
  hapticsEnabled,
  onToggleHaptics,
  onOpenThemeModal,
  onOpenSettings,
  topBtnBg,
}) => {
  const handlers: Record<string, () => void> = {
    star:     () => {},
    haptics:  onToggleHaptics,
    theme:    onOpenThemeModal,
    settings: onOpenSettings,
  };

  return (
    <View style={styles.container}>
      {ICONS.map((btn) => (
        <TouchableOpacity
          key={btn.key}
          style={[
            styles.iconBtn,
            topBtnBg ? { backgroundColor: topBtnBg } : null,
          ]}
          onPress={handlers[btn.key]}
          activeOpacity={0.75}
        >
          <Ionicons
            name={
              btn.key === 'haptics' && !hapticsEnabled
                ? 'phone-portrait'
                : btn.name
            }
            size={26}
            color={colors.textOnDark}
          />
        </TouchableOpacity>
      ))}
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
});

export default TopBar;
