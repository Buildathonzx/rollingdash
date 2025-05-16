// filepath: /home/nathfavour/Documents/code/buildathonzx/rollingdash/app/(tabs)/marketplace.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function MarketplaceScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Marketplace</ThemedText>
      {/* TODO: Implement Marketplace UI */}
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
