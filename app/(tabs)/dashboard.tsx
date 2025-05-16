// filepath: /home/nathfavour/Documents/code/buildathonzx/rollingdash/app/(tabs)/dashboard.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Dashboard</ThemedText>
      {/* TODO: Implement Dashboard UI */}
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
