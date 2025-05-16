import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import { AppBar } from '@/components/AppBar';
import { DataWidget } from '@/components/DataWidget';
import { EarningsCard } from '@/components/EarningsCard';
import { MetricChart } from '@/components/MetricChart';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Import data simulation
import { CarData, getSimulatedCarData } from '@/features/data-simulation';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function DashboardScreen() {
  const [carData, setCarData] = useState<CarData>(getSimulatedCarData());
  const [speedHistory, setSpeedHistory] = useState<number[]>([]);
  const [rpmHistory, setRpmHistory] = useState<number[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getSimulatedCarData();
      setCarData(newData);
      
      // Update chart data
      setSpeedHistory(prev => [...prev.slice(-11), newData.speed]);
      setRpmHistory(prev => [...prev.slice(-11), newData.rpm]);
      
      // Update total earnings
      setTotalEarnings(prev => prev + parseFloat(newData.simulatedEarnings));
    }, 2000); // Update data every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getDiagnosticStatus = (diagnostics: string[]) => {
    if (diagnostics.includes('No issues')) {
      return { type: 'good', message: 'All systems normal' };
    } else {
      return { type: 'warning', message: `Issue detected: ${diagnostics.join(', ')}` };
    }
  };

  const { type: statusType, message: statusMessage } = getDiagnosticStatus(carData.diagnostics);

  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="Vehicle Dashboard" 
        rightActions={
          <TouchableOpacity style={styles.refreshButton}>
            <IconSymbol name="arrow.clockwise" size={22} color={tintColor} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <StatusIndicator 
          type={statusType as 'good' | 'warning' | 'error' | 'info'} 
          message={statusMessage} 
        />
        
        <View style={styles.dataWidgetsRow}>
          <DataWidget
            title="Speed"
            value={carData.speed}
            unit="km/h"
            icon="speedometer"
            style={styles.dataWidgetHalf}
          />
          <DataWidget
            title="RPM"
            value={carData.rpm}
            unit="rpm"
            icon="gauge"
            style={styles.dataWidgetHalf}
          />
        </View>
        
        <View style={styles.dataWidgetsRow}>
          <DataWidget
            title="Fuel"
            value={carData.fuelLevel.toFixed(1)}
            unit="%"
            icon="drop.fill"
            style={styles.dataWidgetHalf}
            iconColor="#3498db"
          />
          <DataWidget
            title="Temp"
            value={carData.engineTemp}
            unit="°C"
            icon="thermometer"
            style={styles.dataWidgetHalf}
            iconColor="#e74c3c"
          />
        </View>
        
        <MetricChart
          title="Speed Trend"
          data={speedHistory.length > 0 ? speedHistory : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          label="Last 2 minutes"
          color="#4cd964"
        />
        
        <EarningsCard
          value={totalEarnings.toFixed(4)}
          change="+0.05"
          isPositiveChange={true}
          onPress={() => {}}
        />
        
        <ThemedView style={styles.locationCard}>
          <ThemedText type="subtitle" style={styles.locationTitle}>Location Data</ThemedText>
          <View style={styles.locationDetails}>
            <IconSymbol name="location.fill" size={24} color="#FF9500" />
            <View style={styles.locationText}>
              <ThemedText style={styles.coordinateLabel}>Coordinates</ThemedText>
              <ThemedText style={styles.coordinates}>
                {carData.gps.latitude}, {carData.gps.longitude}
              </ThemedText>
            </View>
          </View>
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
  refreshButton: {
    padding: 8,
  },
  dataWidgetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataWidgetHalf: {
    width: (Dimensions.get('window').width - 48) / 2,
  },
  locationCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationTitle: {
    marginBottom: 16,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 16,
  },
  coordinateLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 16,
    fontWeight: '500',
  },
});
