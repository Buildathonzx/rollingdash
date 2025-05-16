import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface MetricChartProps {
  title: string;
  data: number[];
  label: string;
  color?: string;
}

export function MetricChart({ title, data, label, color }: MetricChartProps) {
  const chartWidth = Dimensions.get('window').width - 32;
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'card');
  const tintColor = color || useThemeColor({}, 'tint');
  
  const chartConfig = {
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    color: (opacity = 1) => `rgba(${parseInt(tintColor.slice(1, 3), 16)}, ${parseInt(tintColor.slice(3, 5), 16)}, ${parseInt(tintColor.slice(5, 7), 16)}, ${opacity})`,
    labelColor: () => textColor,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      
      <LineChart
        data={{
          labels: Array(data.length).fill(''),
          datasets: [
            {
              data,
              color: (opacity = 1) => tintColor,
              strokeWidth: 2,
            },
          ],
        }}
        width={chartWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={true}
        withVerticalLabels={false}
        yAxisLabel=""
        yAxisSuffix=""
      />
      
      <ThemedText style={styles.label}>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
  },
});