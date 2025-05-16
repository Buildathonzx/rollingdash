import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

type StatusType = 'good' | 'warning' | 'error' | 'info';

interface StatusIndicatorProps {
  type: StatusType;
  message: string;
}

export function StatusIndicator({ type, message }: StatusIndicatorProps) {
  const getStatusConfig = (type: StatusType) => {
    switch (type) {
      case 'good':
        return { color: '#34C759', icon: 'checkmark.circle.fill' };
      case 'warning':
        return { color: '#FF9500', icon: 'exclamationmark.triangle.fill' };
      case 'error':
        return { color: '#FF3B30', icon: 'xmark.circle.fill' };
      case 'info':
      default:
        return { color: '#007AFF', icon: 'info.circle.fill' };
    }
  };

  const { color, icon } = getStatusConfig(type);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <IconSymbol name={icon} size={24} color={color} />
        <ThemedText style={[styles.message, { color }]}>{message}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});