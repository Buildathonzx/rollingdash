import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import { HapticTab } from '@/components/HapticTab';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 5;

const AnimatedIcon = ({ name, color, isFocused }) => {
  const scale = useSharedValue(isFocused ? 1.2 : 1);
  
  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <Animated.View style={animatedStyle}>
      <IconSymbol size={28} name={name} color={color} />
    </Animated.View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeIndex = useSharedValue(0);
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(activeIndex.value * TAB_WIDTH, {
        damping: 20,
        stiffness: 180,
      }) }],
      backgroundColor: tintColor,
    };
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarButton: props => {
          return (
            <HapticTab
              {...props}
              onPress={() => {
                activeIndex.value = props.index;
                props.onPress();
              }}
            />
          );
        },
        tabBarBackground: () => (
          <ThemedView style={{ 
            ...StyleSheet.absoluteFillObject,
            borderTopWidth: 0.5,
            borderTopColor: borderColor,
          }} />
        ),
        tabBarStyle: {
          height: 80,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="house.fill" color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="car.fill" color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="storefront.fill" color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="paperplane.fill" color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="gearshape.fill" color={color} isFocused={focused} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="indicator"
        options={{
          href: null,
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          }
        }}
      />
    </Tabs>
  );
}
