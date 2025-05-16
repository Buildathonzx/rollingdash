import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface EarningsCardProps {
  value: string;
  change?: string;
  isPositiveChange?: boolean;
  period?: string;
  onPress?: () => void;
}

export function EarningsCard({
  value,
  change,
  isPositiveChange = true,
  period = 'per minute',
  onPress,
}: EarningsCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const successColor = '#34C759';
  const errorColor = '#FF3B30';
  const changeColor = isPositiveChange ? successColor : errorColor;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ThemedView style={styles.container}>
        <View style={styles.tokenIcon}>
          <IconSymbol name="chart.line.uptrend.xyaxis" color={tintColor} size={28} />
        </View>
        
        <View style={styles.content}>
          <ThemedText style={styles.label}>Earnings</ThemedText>
          
          <View style={styles.valueContainer}>
            <ThemedText style={styles.value}>{value}</ThemedText>
            <ThemedText style={styles.ticker}> DCL</ThemedText>
          </View>
          
          {change && (
            <View style={styles.changeContainer}>
              <IconSymbol 
                name={isPositiveChange ? "arrow.up.right" : "arrow.down.right"}
                color={changeColor}
                size={14}
              />
              <ThemedText style={[styles.change, { color: changeColor }]}>
                {change}
              </ThemedText>
              <ThemedText style={styles.period}>{period}</ThemedText>
            </View>
          )}
        </View>
        
        <View style={styles.actionContainer}>
          <IconSymbol name="chevron.right" color={tintColor} size={20} />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tokenIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
  },
  ticker: {
    fontSize: 14,
    opacity: 0.7,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 2,
  },
  period: {
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 4,
  },
  actionContainer: {
    justifyContent: 'center',
  },
});