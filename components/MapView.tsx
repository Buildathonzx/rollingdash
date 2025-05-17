import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface MapViewProps {
  latitude: string | number;
  longitude: string | number;
  width?: number;
  height?: number;
  showPulse?: boolean;
}

export function MapView({
  latitude,
  longitude,
  width = 300,
  height = 200,
  showPulse = true,
}: MapViewProps) {
  const tintColor = useThemeColor({}, 'tint');
  
  // In a real app, this would integrate with a mapping library
  // like react-native-maps or mapbox
  
  return (
    <ThemedView style={[styles.container, { width, height }]}>
      <View style={styles.mapContent}>
        <View style={styles.grid}>
          {Array(6).fill(0).map((_, i) => (
            <View key={`h-${i}`} style={styles.horizontalLine} />
          ))}
          {Array(6).fill(0).map((_, i) => (
            <View key={`v-${i}`} style={styles.verticalLine} />
          ))}
        </View>
        
        <View style={styles.markerContainer}>
          {showPulse && <View style={styles.pulseCircle} />}
          <View style={[styles.marker, { backgroundColor: tintColor }]}>
            <IconSymbol name="location.fill" size={16} color="#FFFFFF" />
          </View>
        </View>
      </View>
      
      <View style={styles.coordinatesBar}>
        <ThemedText style={styles.coordinatesText}>
          {typeof latitude === 'number' ? latitude.toFixed(6) : latitude}, {typeof longitude === 'number' ? longitude.toFixed(6) : longitude}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  mapContent: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Map background color (would be a real map in production)
    position: 'relative',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  pulseCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  coordinatesBar: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  coordinatesText: {
    fontSize: 12,
  },
});