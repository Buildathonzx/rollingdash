import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DataWidget } from '@/components/DataWidget';
import { MapView } from '@/components/MapView';
import { MetricChart } from '@/components/MetricChart';
import { ProgressRing } from '@/components/ProgressRing';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Import data simulation
import { dtcCodes, useCarData } from '@/features/data-simulation';
import { useThemeColor } from '@/hooks/useThemeColor';

const AnimatedCard = Animated.createAnimatedComponent(Card);
const AnimatedDataWidget = Animated.createAnimatedComponent(DataWidget);

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export default function DashboardScreen() {
  const { carData, dataHistory } = useCarData(2000);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Update total earnings
    setTotalEarnings(prev => prev + parseFloat(carData.simulatedEarnings));
  }, [carData.simulatedEarnings]);

  const getDiagnosticStatus = (diagnostics: string[]) => {
    if (diagnostics.includes('No issues')) {
      return { type: 'good', message: 'All systems normal' };
    } else {
      const dtcMessage = diagnostics.map(code => dtcCodes[code as keyof typeof dtcCodes] || code).join(', ');
      return { type: 'warning', message: `Issue detected: ${dtcMessage}` };
    }
  };

  const { type: statusType, message: statusMessage } = getDiagnosticStatus(carData.diagnostics);
  
  const categories: CategoryItem[] = [
    { id: 'all', name: 'All Data', icon: 'chart.line.uptrend.xyaxis' },
    { id: 'battery', name: 'Battery', icon: 'battery.100' },
    { id: 'efficiency', name: 'Efficiency', icon: 'leaf.fill' },
    { id: 'location', name: 'Location', icon: 'location.fill' },
  ];
  
  const CategoryButton = ({ category }: { category: CategoryItem }) => {
    const textColor = useThemeColor({}, 'text');
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          activeCategory === category.id && { backgroundColor: `${tintColor}20` }
        ]}
        onPress={() => setActiveCategory(category.id)}
      >
        <IconSymbol 
          name={category.icon} 
          size={20} 
          color={activeCategory === category.id ? tintColor : textColor} 
        />
        <ThemedText 
          style={[
            styles.categoryText,
            activeCategory === category.id && { color: tintColor, fontWeight: '600' }
          ]}
        >
          {category.name}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title={carData.carModel || "Vehicle Dashboard"} 
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
        
        <View style={styles.statsOverview}>
          <Animated.View 
            entering={FadeInDown.delay(200).duration(500)} 
            style={styles.statCard}
          >
            <ProgressRing 
              progress={carData.fuelLevel} 
              size={100} 
              label="Fuel Level" 
              color="#3498db" 
            />
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(400).duration(500)} 
            style={styles.statInfo}
          >
            <ThemedText type="title" style={styles.earnings}>
              {totalEarnings.toFixed(4)} <ThemedText style={styles.token}>DCL</ThemedText>
            </ThemedText>
            <ThemedText style={styles.earningsLabel}>
              Total earnings from your data
            </ThemedText>
            <Button 
              title="Share More Data" 
              onPress={() => {}} 
              variant="secondary" 
              icon="square.and.arrow.up" 
              size="small"
              style={styles.shareButton}
            />
          </Animated.View>
        </View>
        
        <View style={styles.categoryList}>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => <CategoryButton category={item} />}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>
        
        <Animated.View 
          entering={FadeInRight.delay(300).duration(500)} 
          style={styles.speedSection}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Current Speed
          </ThemedText>
          <View style={styles.speedDisplay}>
            <ThemedText style={styles.speedValue}>{carData.speed}</ThemedText>
            <ThemedText style={styles.speedUnit}>km/h</ThemedText>
          </View>
          
          <MetricChart
            title="Speed Trend"
            data={dataHistory.speed.length > 0 ? dataHistory.speed : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            label="Last 30 seconds"
            color="#4cd964"
          />
        </Animated.View>
        
        <View style={styles.dataWidgetsRow}>
          <AnimatedDataWidget
            entering={FadeInDown.delay(500).duration(500)}
            title="RPM"
            value={carData.rpm}
            unit="rpm"
            icon="gauge"
            style={styles.dataWidgetHalf}
            iconColor="#e74c3c"
          />
          <AnimatedDataWidget
            entering={FadeInDown.delay(600).duration(500)}
            title="Engine Temp"
            value={carData.engineTemp}
            unit="°C"
            icon="thermometer"
            style={styles.dataWidgetHalf}
            iconColor="#e67e22"
          />
        </View>
        
        <View style={styles.dataWidgetsRow}>
          <AnimatedDataWidget
            entering={FadeInDown.delay(700).duration(500)}
            title="Battery"
            value={carData.batteryLevel.toFixed(1)}
            unit="%"
            icon="battery.100"
            style={styles.dataWidgetHalf}
            iconColor="#27ae60"
          />
          <AnimatedDataWidget
            entering={FadeInDown.delay(800).duration(500)}
            title="Range"
            value={carData.range}
            unit="km"
            icon="car.side.fill"
            style={styles.dataWidgetHalf}
            iconColor="#3498db"
          />
        </View>
        
        <AnimatedCard
          entering={FadeInDown.delay(900).duration(500)}
          title="Vehicle Location"
          icon="location.fill"
          iconColor="#FF9500"
        >
          <MapView
            latitude={carData.gps.latitude}
            longitude={carData.gps.longitude}
            width={Dimensions.get('window').width - 64}
            height={180}
          />
        </AnimatedCard>
        
        <AnimatedCard
          entering={FadeInDown.delay(1000).duration(500)}
          title="Eco Impact"
          description="Environmental benefits from your shared data"
          icon="leaf.fill"
          iconColor="#4cd964"
        >
          <View style={styles.ecoStatsRow}>
            <View style={styles.ecoStat}>
              <ThemedText style={styles.ecoValue}>{carData.emissionsReduced.toFixed(2)}</ThemedText>
              <ThemedText style={styles.ecoUnit}>kg CO2 saved</ThemedText>
            </View>
            <View style={styles.ecoStat}>
              <ThemedText style={styles.ecoValue}>{carData.efficiency.toFixed(2)}</ThemedText>
              <ThemedText style={styles.ecoUnit}>km/kWh efficiency</ThemedText>
            </View>
          </View>
        </AnimatedCard>
        
        <View style={styles.actionButtons}>
          <Button
            title="View Full Analytics"
            onPress={() => {}}
            variant="primary"
            icon="chart.bar.fill"
            style={styles.actionButton}
          />
          <Button
            title="Check Diagnostics"
            onPress={() => {}}
            variant="outline"
            icon="waveform.path.ecg"
            style={styles.actionButton}
          />
        </View>
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
  statsOverview: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  earnings: {
    fontSize: 26,
  },
  token: {
    fontSize: 14,
    opacity: 0.7,
  },
  earningsLabel: {
    opacity: 0.7,
    marginBottom: 12,
  },
  shareButton: {
    alignSelf: 'flex-start',
  },
  categoryList: {
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
  },
  speedSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  speedDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  speedValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  speedUnit: {
    fontSize: 20,
    marginLeft: 8,
    opacity: 0.7,
  },
  dataWidgetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataWidgetHalf: {
    width: (Dimensions.get('window').width - 48) / 2,
  },
  ecoStatsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  ecoStat: {
    flex: 1,
    alignItems: 'center',
  },
  ecoValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ecoUnit: {
    fontSize: 14,
    opacity: 0.7,
  },
  actionButtons: {
    marginTop: 16,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
