// filepath: /home/nathfavour/Documents/code/buildathonzx/rollingdash/app/(tabs)/settings.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      {/* TODO: Implement Settings UI */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
