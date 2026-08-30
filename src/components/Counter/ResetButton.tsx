import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';

interface Props {
  onPress: () => void;
}

const ResetButton: React.FC<Props> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 60,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 12,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.btn}
      >
        <View style={styles.outer}>
          <View style={styles.inner}>
            <View style={styles.shine} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderRadius: 24,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  outer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 5,
    left: 7,
    width: 18,
    height: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
    transform: [{ rotate: '-20deg' }],
  },
});

export default ResetButton;
