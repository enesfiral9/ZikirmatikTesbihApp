import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
  const [enabled, setEnabled] = useState(true);

  const trigger = useCallback(async () => {
    if (!enabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [enabled]);

  const triggerSuccess = useCallback(async () => {
    if (!enabled) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  return { enabled, trigger, triggerSuccess, toggle };
};
