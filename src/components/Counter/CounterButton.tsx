import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';

interface Props {
  onPress: () => void;
}

const CounterButton: React.FC<Props> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 10,
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
        {/* En dış gölge halkası */}
        <View style={styles.ring4}>
          {/* Koyu gri dış kenar */}
          <View style={styles.ring3}>
            {/* Orta gümüş */}
            <View style={styles.ring2}>
              {/* Parlak iç yüzey */}
              <View style={styles.ring1}>
                {/* Üst parlaklık yansıması */}
                <View style={styles.shine} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SIZE = 150;

const styles = StyleSheet.create({
  wrap: {
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    borderRadius: SIZE / 2,
  },
  btn: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  ring4: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#5A5A5A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring3: {
    width: SIZE - 8,
    height: SIZE - 8,
    borderRadius: (SIZE - 8) / 2,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring2: {
    width: SIZE - 18,
    height: SIZE - 18,
    borderRadius: (SIZE - 18) / 2,
    backgroundColor: '#C8C8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring1: {
    width: SIZE - 30,
    height: SIZE - 30,
    borderRadius: (SIZE - 30) / 2,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 8,
    left: 14,
    width: 48,
    height: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.65)',
    transform: [{ rotate: '-25deg' }],
  },
});

export default CounterButton;
