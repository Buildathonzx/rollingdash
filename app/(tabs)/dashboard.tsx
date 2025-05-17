import React from 'react';
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import { AppBar } from '@/components/AppBar';
import { EarningsCard } from '@/components/EarningsCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Import data simulation
import { DIAGNOSTIC_CODES, useCarData } from '@/features/data-simulation';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function MetricCard({ 
  title, 
  value, 
  unit, 
  icon, 
  color,
  onPress
}: { 
  title: string; 
  value: number | string; 
  unit: string; 
  icon: string;
  color: string;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };
  
  return (
    <AnimatedPressable
      style={[animatedStyle, styles.metricCard]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <ThemedView style={[styles.metricCardInner, { borderLeftColor: color, borderLeftWidth: 4 }]}>
        <View style={styles.metricHeader}>
          <ThemedText style={styles.metricTitle}>{title}</ThemedText>
          <IconSymbol name={icon} size={20} color={color} />
        </View>
        
        <View style={styles.metricValue}>
          <ThemedText style={styles.valueText}>{value}</ThemedText>
          <ThemedText style={styles.unitText}>{unit}</ThemedText>
        </View>
      </ThemedView>
    </AnimatedPressable>
  );
}

function GaugeChart({ value, max, color, title, icon }: { 
  value: number; 
  max: number; 
  color: string;
  title: string;
  icon: string;
}) {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <ThemedView style={styles.gaugeContainer}>
      <View style={styles.gaugeHeaderRow}>
        <IconSymbol name={icon} size={20} color={color} />
        <ThemedText style={styles.gaugeTitle}>{title}</ThemedText>
      </View>
      
      <View style={styles.gaugeTrack}>
        <View 
          style={[
            styles.gaugeFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      
      <View style={styles.gaugeLabels}>
        <ThemedText style={styles.gaugeValue}>{value}</ThemedText>
        <ThemedText style={styles.gaugeMax}>/ {max}</ThemedText>
      </View>
    </ThemedView>
  );
}

export default function DashboardScreen() {
  const { carData, totalEarnings } = useCarData();
  
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  const getDiagnosticStatus = (diagnostics: string[]) => {
    if (diagnostics.includes('No issues')) {
      return { type: 'good', message: 'All systems normal' };
    } else {
      return { 
        type: 'warning', 
        message: 'Issue detected: ' + diagnostics.map(code => 
          code in DIAGNOSTIC_CODES 
            ? `${code} (${DIAGNOSTIC_CODES[code]})` 
            : code
        ).join(', ')
      };
    }
  };

  const { type: statusType, message: statusMessage } = getDiagnosticStatus(carData.diagnostics);
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolateColor(
        scrollY.value,
        [0, 50],
        [1, 0.9]
      ) as any,
      transform: [
        { 
          translateY: interpolateColor(
            scrollY.value,
            [0, 50],
            [0, -10]
          ) as any 
        }
      ]
    };
  });

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
      
      <Animated.ScrollView 
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.headerSection, headerAnimatedStyle]}>
          <ThemedText style={styles.headerTitle}>My Vehicle</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Real-time monitoring</ThemedText>
        </Animated.View>
        
        <View style={styles.statusSection}>
          <StatusIndicator 
            type={statusType as 'good' | 'warning' | 'error' | 'info'} 
            message={statusMessage} 
          />
        </View>
        
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Speed"
            value={carData.speed}
            unit="km/h"
            icon="speedometer"
            color="#4CD964"
          />
          <MetricCard
            title="RPM"
            value={carData.rpm}
            unit="rpm"
            icon="gauge"
            color="#FF9500"
          />
          <MetricCard
            title="Engine Temp"
            value={carData.engineTemp}
            unit="°C"
            icon="thermometer"
            color="#FF3B30"
          />
          <MetricCard
            title="Fuel Level"
            value={carData.fuelLevel.toFixed(1)}
            unit="%"
            icon="drop.fill"
            color="#5AC8FA"
          />
        </View>
        
        <ThemedView style={styles.locationSection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Location</ThemedText>
            <IconSymbol name="location.fill" size={18} color="#FF9500" />
          </View>
          
          <View style={styles.locationDetails}>
            <View style={styles.locationRow}>
              <ThemedText style={styles.locationLabel}>Latitude:</ThemedText>
              <ThemedText style={styles.locationValue}>{carData.gps.latitude}</ThemedText>
            </View>
            <View style={styles.locationRow}>
              <ThemedText style={styles.locationLabel}>Longitude:</ThemedText>
              <ThemedText style={styles.locationValue}>{carData.gps.longitude}</ThemedText>
            </View>
          </View>
          
          <View style={styles.mapPlaceholder}>
            <IconSymbol name="map.fill" size={24} color={tintColor} />
            <ThemedText style={styles.mapPlaceholderText}>Map View</ThemedText>
          </View>
        </ThemedView>
        
        <ThemedView style={styles.gaugeSection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Performance</ThemedText>
            <IconSymbol name="chart.bar.fill" size={18} color={tintColor} />
          </View>
          
          <GaugeChart
            value={carData.engineLoad}
            max={100}
            color="#FF9500"
            title="Engine Load"
            icon="gauge"
          />
          
          <GaugeChart
            value={carData.throttlePosition}
            max={100}
            color="#5856D6"
            title="Throttle Position"
            icon="arrow.up.right"
          />
          
          <GaugeChart
            value={carData.dataPointsCollected}
            max={20}
            color="#4CD964"
            title="Data Points"
            icon="database.fill"
          />
        </ThemedView>
        
        <EarningsCard
          value={totalEarnings.toFixed(4)}
          change="+0.05"
          isPositiveChange={true}
          onPress={() => {}}
        />
        
        <ThemedView style={styles.batterySection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Battery & Range</ThemedText>
            <IconSymbol name="battery.100" size={18} color="#4CD964" />
          </View>
          
          <View style={styles.batteryDetails}>
            <View style={styles.batteryRow}>
              <ThemedText style={styles.batteryLabel}>Battery Level:</ThemedText>
              <ThemedText style={styles.batteryValue}>{carData.batteryLevel?.toFixed(1)}%</ThemedText>
            </View>
            <View style={styles.batteryProgressContainer}>
              <View 
                style={[
                  styles.batteryProgress, 
                  { width: `${carData.batteryLevel || 0}%`, backgroundColor: '#4CD964' }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.batteryStatsRow}>
            <View style={styles.batteryStatItem}>
              <IconSymbol name="bolt.fill" size={16} color="#5AC8FA" />
              <ThemedText style={styles.batteryStatValue}>{carData.efficiency?.toFixed(1)} km/kWh</ThemedText>
              <ThemedText style={styles.batteryStatLabel}>Efficiency</ThemedText>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.batteryStatItem}>
              <IconSymbol name="arrow.right" size={16} color="#5AC8FA" />
              <ThemedText style={styles.batteryStatValue}>{carData.range} km</ThemedText>
              <ThemedText style={styles.batteryStatLabel}>Range</ThemedText>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.batteryStatItem}>
              <IconSymbol name="leaf.fill" size={16} color="#4CD964" />
              <ThemedText style={styles.batteryStatValue}>{carData.emissionsReduced?.toFixed(2)} kg</ThemedText>
              <ThemedText style={styles.batteryStatLabel}>CO₂ Saved</ThemedText>
            </View>
          </View>
        </ThemedView>
      </Animated.ScrollView>
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
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statusSection: {
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: (SCREEN_WIDTH - 40) / 2,
    marginBottom: 8,
  },
  metricCardInner: {
    padding: 14,
    borderRadius: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  metricValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  unitText: {
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.7,
  },
  locationSection: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  locationDetails: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  gaugeSection: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  gaugeContainer: {
    marginBottom: 16,
  },
  gaugeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gaugeTitle: {
    fontSize: 14,
    marginLeft: 8,
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 4,
  },
  gaugeLabels: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  gaugeValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  gaugeMax: {
    fontSize: 12,
    opacity: 0.7,
    marginLeft: 4,
  },
  batterySection: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  batteryDetails: {
    marginBottom: 16,
  },
  batteryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  batteryLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  batteryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  batteryProgressContainer: {
    height: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  batteryProgress: {
    height: '100%',
    borderRadius: 4,
  },
  batteryStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batteryStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  batteryStatValue: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
  },
  batteryStatLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(150, 150, 150, 0.3)',
  },
});
