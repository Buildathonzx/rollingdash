import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

interface HapticTabProps {
  onPress: () => void;
  children: React.ReactNode;
}

export function HapticTab({ onPress, children, ...rest }: HapticTabProps) {
  const handlePress = () => {
    // Trigger light haptic feedback when tab is pressed
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.selectionAsync();
    }
    
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
