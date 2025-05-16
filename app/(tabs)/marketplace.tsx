// filepath: /home/nathfavour/Documents/code/buildathonzx/rollingdash/app/(tabs)/marketplace.tsx
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol'; // Assuming you have an Icon component

// Mock data for marketplace listings - replace with actual data source
const initialDataListings = [
  { id: '1', name: 'Speed Data', description: 'Share your average and max speed.', shared: true, category: 'Metrics' },
  { id: '2', name: 'GPS Location Trails', description: 'Share anonymized location history.', shared: false, category: 'Location' },
  { id: '3', name: 'Fuel Consumption Patterns', description: 'Help optimize city-wide fuel usage.', shared: true, category: 'Efficiency' },
  { id: '4', name: 'Diagnostic Trouble Codes (DTCs)', description: 'Contribute to predictive maintenance models.', shared: false, category: 'Diagnostics' },
  { id: '5', name: 'Engine RPM Data', description: 'Share engine performance metrics.', shared: true, category: 'Metrics' },
];

export default function MarketplaceScreen() {
  const [dataListings, setDataListings] = useState(initialDataListings);

  const toggleShare = (id: string) => {
    setDataListings(prevListings =>
      prevListings.map(item =>
        item.id === id ? { ...item, shared: !item.shared } : item
      )
    );
    // TODO: Add logic to persist this change (e.g., to a backend or local storage)
    console.log(`Toggled sharing for item ${id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.headerContainer}>
          <IconSymbol name="storefront.fill" size={30} style={styles.headerIcon}/>
          <ThemedText type="title">Mobility Data Marketplace</ThemedText>
        </View>
        
        <ThemedText style={styles.description}>
          Choose which data points you want to share with the marketplace. Your contributions can help power new mobility solutions and earn you rewards.
        </ThemedText>

        {dataListings.map(item => (
          <ThemedView key={item.id} style={styles.dataItemCard}>
            <View style={styles.dataItemInfo}>
              <ThemedText type="subtitle" style={styles.dataItemTitle}>{item.name}</ThemedText>
              <ThemedText style={styles.dataItemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.dataItemCategory}>Category: {item.category}</ThemedText>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={item.shared ? '#0a7ea4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleShare(item.id)}
              value={item.shared}
            />
          </ThemedView>
        ))}

        <ThemedView style={styles.actionSection}>
            <Button title="View My Shared Data Summary" onPress={() => console.log("Navigate to shared data summary")} />
            {/* TODO: Implement navigation or modal for summary */}
        </ThemedView>

        <ThemedText style={styles.noteText}>
          (Marketplace functionality is currently a prototype. Data sharing and rewards are simulated.)
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  headerIcon: {
    // Add styles if needed
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  dataItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    // ThemedView provides background
  },
  dataItemInfo: {
    flex: 1,
  },
  dataItemTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  dataItemDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  dataItemCategory: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'gray',
  },
  actionSection: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  noteText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: 'gray',
  },
});
