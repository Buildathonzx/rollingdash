import React from 'react';
import { Button, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  // Placeholder function for starting a simulated drive
  const handleStartSimulation = () => {
    console.log("Simulated drive started!");
    // TODO: Implement actual drive simulation logic
    // This could involve:
    // - Triggering a sequence of data updates in the Dashboard
    // - Showing a map replay
    // - Calculating simulated emissions and rewards
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={200}
          name="map.fill"
          style={styles.headerImage}
          color="#FFFFFF"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Local Drive Simulator</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText>
          Simulate a drive event to see how your vehicle data is generated and how potential rewards could be accrued for sharing it.
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.simulationControlContainer}>
        {/* TODO: Add more controls for simulation parameters if needed */}
        <Button title="Start Simulated Drive" onPress={handleStartSimulation} />
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Simulation Details (Placeholder)</ThemedText>
        <ThemedText>Status: Idle</ThemedText>
        <ThemedText>Estimated Duration: N/A</ThemedText>
        <ThemedText>Potential Rewards: N/A</ThemedText>
        {/* TODO: Update these fields dynamically based on simulation state */}
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.infoText}>
          This feature demonstrates the concept of a "Local Drive Simulator" where the app simulates data output, emissions, and rewards based on a predefined or user-initiated fake drive event.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignSelf: 'center',
    marginTop: 40, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    gap: 8,
    marginBottom: 16,
  },
  simulationControlContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
  }
});
