import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightActions?: React.ReactNode;
}

export function AppBar({ 
  title, 
  showBackButton = false, 
  onBackPress, 
  rightActions 
}: AppBarProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={[
      styles.container,
      { 
        paddingTop: insets.top + 8,
        borderBottomColor: useThemeColor({}, 'border')
      }
    ]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <IconSymbol name="chevron.left" color={tintColor} size={24} />
            </TouchableOpacity>
          )}
        </View>
        
        <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
        
        <View style={styles.rightSection}>
          {rightActions}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    height: 52,
  },
  leftSection: {
    width: 60,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  rightSection: {
    width: 60,
    alignItems: 'flex-end',
  }
});