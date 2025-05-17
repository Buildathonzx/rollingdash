import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { ThemedText } from './ThemedText';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  valueLabel?: string;
  color?: string;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 12,
  label,
  valueLabel,
  color: customColor,
}: ProgressRingProps) {
  const tintColor = useThemeColor({}, 'tint');
  const color = customColor || tintColor;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const progressValue = useSharedValue(0);
  
  // Update the progress value with animation
  React.useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress, progressValue]);
  
  // Calculate the stroke dash offset based on progress
  const strokeDashoffset = useDerivedValue(() => {
    return circumference - (progressValue.value / 100) * circumference;
  });
  
  // Create animated props for the circle
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
        
        {/* Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      
      <View style={styles.labelContainer}>
        {valueLabel && (
          <ThemedText style={styles.valueLabel}>{valueLabel}</ThemedText>
        )}
        {!valueLabel && (
          <ThemedText style={styles.progressText}>
            {Math.round(progressValue.value)}%
          </ThemedText>
        )}
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  valueLabel: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
});