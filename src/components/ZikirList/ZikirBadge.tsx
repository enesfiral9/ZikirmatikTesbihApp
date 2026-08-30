import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  count: number;
}

const ZikirBadge: React.FC<Props> = ({ count }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    color: colors.badgeText,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ZikirBadge;
