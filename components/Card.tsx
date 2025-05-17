import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  icon,
  iconColor,
  rightContent,
  onPress,
  style,
  children,
}: CardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const defaultIconColor = iconColor || tintColor;
  
  const content = (
    <>
      <View style={styles.header}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${defaultIconColor}20` }]}>
            <IconSymbol name={icon} color={defaultIconColor} size={24} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          {description && (
            <ThemedText style={styles.description}>{description}</ThemedText>
          )}
        </View>
        {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
      </View>
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress}
      >
        <ThemedView style={[styles.container, style]}>
          {content}
        </ThemedView>
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView style={[styles.container, style]}>
      {content}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  rightContent: {
    marginLeft: 8,
  },
  childrenContainer: {
    marginTop: 16,
  },
});