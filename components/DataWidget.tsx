import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface DataWidgetProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  style?: ViewStyle;
  iconColor?: string;
}

export function DataWidget({
  title,
  value,
  unit,
  icon,
  style,
  iconColor,
}: DataWidgetProps) {
  const tintColor = useThemeColor({}, 'tint');
  const defaultIconColor = iconColor || tintColor;

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <IconSymbol name={icon} size={24} color={defaultIconColor} />
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <View style={styles.valueContainer}>
          <ThemedText style={styles.value}>{value}</ThemedText>
          {unit && <ThemedText style={styles.unit}>{unit}</ThemedText>}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
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
  unit: {
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.7,
  },
});