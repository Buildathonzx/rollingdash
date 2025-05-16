import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native'; // Removed View

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { getSimulatedCarData } from '@/features/data-simulation'; // Placeholder

// Placeholder for actual data simulation
const getSimulatedCarData = () => ({
  speed: Math.floor(Math.random() * 120), // km/h
  rpm: Math.floor(Math.random() * 5000), // RPM
  fuelLevel: Math.random() * 100, // Percentage
  engineTemp: Math.floor(Math.random() * 50) + 70, // Celsius
  gps: {
    latitude: (Math.random() * 180 - 90).toFixed(6),
    longitude: (Math.random() * 360 - 180).toFixed(6),
  },
  diagnostics: Math.random() > 0.9 ? ['P0420'] : ['No issues'],
  simulatedEarnings: (Math.random() * 0.1).toFixed(4), // Simulated token earnings
});

export default function DashboardScreen() {
  const [carData, setCarData] = useState(getSimulatedCarData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCarData(getSimulatedCarData());
    }, 2000); // Update data every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <ThemedText type="title" style={styles.header}>Real-time Vehicle Data</ThemedText>

        <ThemedView style={styles.dataCard}>
          <ThemedText type="subtitle">Metrics</ThemedText>
          <ThemedText style={styles.dataText}>Speed: {carData.speed} km/h</ThemedText>
          <ThemedText style={styles.dataText}>RPM: {carData.rpm}</ThemedText>
          <ThemedText style={styles.dataText}>Fuel Level: {carData.fuelLevel.toFixed(1)}%</ThemedText>
          <ThemedText style={styles.dataText}>Engine Temp: {carData.engineTemp}°C</ThemedText>
        </ThemedView>

        <ThemedView style={styles.dataCard}>
          <ThemedText type="subtitle">Location (GPS)</ThemedText>
          <ThemedText style={styles.dataText}>Latitude: {carData.gps.latitude}</ThemedText>
          <ThemedText style={styles.dataText}>Longitude: {carData.gps.longitude}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.dataCard}>
          <ThemedText type="subtitle">Diagnostics</ThemedText>
          <ThemedText style={styles.dataText}>{carData.diagnostics.join(', ')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.dataCard}>
          <ThemedText type="subtitle">Simulated Earnings</ThemedText>
          <ThemedText style={styles.dataText}>{carData.simulatedEarnings} tokens/min (est.)</ThemedText>
          <ThemedText style={styles.noteText}>(This is a simulation for demo purposes)</ThemedText>
        </ThemedView>
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
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  dataCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    // ThemedView will apply background color
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  }
});
