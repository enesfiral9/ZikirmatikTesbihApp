import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Zikir } from '../../types';
import ZikirBadge from './ZikirBadge';
import { colors } from '../../theme/colors';

interface Props {
  item: Zikir;
  onSelect?: (item: Zikir) => void;
  onDelete: (id: number) => void;
}

const ZikirListItem: React.FC<Props> = ({ item, onSelect, onDelete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleMenu = () => {
    Alert.alert(item.name, item.arabicName ? item.arabicName : undefined, [
      {
        text: 'Devam Et',
        onPress: () => onSelect?.(item),
      },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => onDelete(item.id),
      },
      { text: 'İptal', style: 'cancel' },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onSelect?.(item)}
      activeOpacity={0.7}
    >
      {/* Sol — isim + tarih */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        {item.arabicName ? (
          <Text style={styles.arabic}>{item.arabicName}</Text>
        ) : null}
        <Text style={styles.date}>{item.createdAt}</Text>
        {item.target > 0 && (
          <Text style={styles.target}>Hedef: {item.target}</Text>
        )}
      </View>

      {/* Sağ — rozet + menü */}
      <View style={styles.right}>
        <ZikirBadge count={item.count} />
        <TouchableOpacity onPress={handleMenu} style={styles.menuBtn}>
          <Ionicons name="menu" size={22} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  arabic: {
    fontSize: 14,
    color: colors.primaryMid,
    marginBottom: 2,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  target: {
    fontSize: 11,
    color: colors.primaryLight,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuBtn: {
    padding: 4,
  },
});

export default ZikirListItem;
