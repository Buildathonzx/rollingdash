import { useThemeColor } from '@/hooks/useThemeColor';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDisabled?: boolean;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  isLoading = false,
  isDisabled = false,
  style,
  size = 'medium',
}: ButtonProps) {
  const tintColor = useThemeColor({}, 'tint');
  
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          button: [styles.button, styles.primaryButton, { backgroundColor: tintColor }],
          text: [styles.buttonText, styles.primaryText],
          icon: '#FFFFFF',
        };
      case 'secondary':
        return {
          button: [styles.button, styles.secondaryButton, { backgroundColor: `${tintColor}20` }],
          text: [styles.buttonText, styles.secondaryText, { color: tintColor }],
          icon: tintColor,
        };
      case 'outline':
        return {
          button: [styles.button, styles.outlineButton, { borderColor: tintColor }],
          text: [styles.buttonText, { color: tintColor }],
          icon: tintColor,
        };
      case 'danger':
        return {
          button: [styles.button, styles.dangerButton],
          text: [styles.buttonText, styles.dangerText],
          icon: '#FFFFFF',
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return {};
    }
  };
  
  const { button, text, icon: iconColor } = getButtonStyles();
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled || isLoading}
      style={({ pressed }) => [
        ...button,
        getSizeStyles(),
        pressed && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : tintColor} size="small" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <IconSymbol
                name={icon}
                size={18}
                color={iconColor}
                style={styles.leftIcon}
              />
            )}
            <ThemedText style={text}>{title}</ThemedText>
            {icon && iconPosition === 'right' && (
              <IconSymbol
                name={icon}
                size={18}
                color={iconColor}
                style={styles.rightIcon}
              />
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  secondaryText: {
    color: '#007AFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});