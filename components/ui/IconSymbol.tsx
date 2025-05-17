// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import React from 'react';
import { Platform } from 'react-native';

// Map SF Symbols to MaterialIcons for Android/web
const MAPPING: Record<string, string> = {
  'house.fill': 'home',
  'car.fill': 'directions-car',
  'storefront.fill': 'storefront',
  'paperplane.fill': 'send',
  'gearshape.fill': 'settings',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.left.forwardslash.chevron.right': 'code',
  'speedometer': 'speed',
  'gauge': 'speed',
  'drop.fill': 'water-drop',
  'thermometer': 'device-thermostat',
  'location.fill': 'location-on',
  'chart.line.uptrend.xyaxis': 'show-chart',
  'arrow.clockwise': 'refresh',
  'checkmark.circle.fill': 'check-circle',
  'exclamationmark.triangle.fill': 'warning',
  'xmark.circle.fill': 'cancel',
  'info.circle.fill': 'info',
  'arrow.up.right': 'trending-up',
  'arrow.down.right': 'trending-down',
  'figure.walk.motion': 'directions-walk',
  'car.2.fill': 'directions-car',
  'map.fill': 'map',
  'wallet.pass.fill': 'account-balance-wallet',
  'key.fill': 'key',
  'bell.fill': 'notifications',
  'person.crop.circle.fill': 'account-circle',
  'chart.bar.fill': 'bar-chart',
  'waveform.path.ecg': 'timeline',
  'shield.fill': 'security',
  'gear.badge.checkmark': 'verified',
  'network': 'wifi-tethering',
  'chart.pie.fill': 'pie-chart',
  'doc.text.fill': 'receipt',
  'bolt.fill': 'bolt',
  'square.and.arrow.up': 'share',
  'hand.thumbsup.fill': 'thumb-up',
  'clock.fill': 'access-time',
  'tag.fill': 'local-offer',
  'car.side.fill': 'commute',
  'battery.100': 'battery-full',
  'bitcoin.circle.fill': 'currency-bitcoin',
  'leaf.fill': 'eco',
};

export function IconSymbol({ name, size, color, style, weight = 'regular' }: {
  name: string;
  size: number;
  color: string;
  style?: any;
  weight?: SymbolWeight;
}) {
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name as SymbolViewProps['name']}
        weight={weight}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={[{ width: size, height: size }, style]}
      />
    );
  }
  // Fallback for Android/web
  const iconName = (MAPPING[name] || 'help-outline') as keyof typeof MaterialIcons.glyphMap;
  return (
    <MaterialIcons name={iconName} size={size} color={color} style={style} />
  );
}
