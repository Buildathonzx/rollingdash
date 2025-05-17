import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function SettingsSection({ title, children, delay = 0 }: SettingsSectionProps) {
  return (
    <Animated.View entering={FadeIn.delay(delay).duration(300)}>
      <View style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <ThemedView style={styles.sectionContent}>
          {children}
        </ThemedView>
      </View>
    </Animated.View>
  );
}

interface SettingsRowProps {
  title: string;
  description?: string;
  icon: string;
  iconColor?: string;
  rightElement?: React.ReactNode;
  showDivider?: boolean;
  onPress?: () => void;
  delay?: number;
}

function SettingsRow({
  title,
  description,
  icon,
  iconColor,
  rightElement,
  showDivider = true,
  onPress,
  delay = 0
}: SettingsRowProps) {
  const tintColor = useThemeColor({}, 'tint');
  const color = iconColor || tintColor;
  
  return (
    <Animated.View entering={SlideInRight.delay(delay).duration(300)}>
      <TouchableOpacity 
        style={styles.settingsRow} 
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <View style={styles.rowLeftContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <IconSymbol name={icon} size={20} color={color} />
          </View>
          
          <View style={styles.textContainer}>
            <ThemedText style={styles.rowTitle}>{title}</ThemedText>
            {description && <ThemedText style={styles.rowDescription}>{description}</ThemedText>}
          </View>
        </View>
        
        <View style={styles.rowRightContent}>
          {rightElement || (
            onPress && <IconSymbol name="chevron.right" size={18} color="#8E8E93" />
          )}
        </View>
      </TouchableOpacity>
      
      {showDivider && <View style={styles.divider} />}
    </Animated.View>
  );
}

export default function SettingsScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  
  // Settings state
  const [dataSharing, setDataSharing] = useState(true);
  const [diagnosticsSharing, setDiagnosticsSharing] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [batterySharing, setBatterySharing] = useState(true);
  const [autoEnroll, setAutoEnroll] = useState(false);
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            router.replace('/(auth)/login' as any);
          },
        },
      ]
    );
  };
  
  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="Settings" 
        rightActions={
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.clockwise" size={22} color={tintColor} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Account" delay={0}>
          <SettingsRow
            title="John Doe"
            description="john.doe@example.com"
            icon="person.crop.circle.fill"
            rightElement={
              <View style={styles.userBadge}>
                <ThemedText style={styles.userBadgeText}>PRO</ThemedText>
              </View>
            }
            onPress={() => {}}
            delay={100}
          />
          
          <SettingsRow
            title="Wallet"
            description="Connect or manage your crypto wallet"
            icon="wallet.pass.fill"
            onPress={() => {}}
            delay={150}
          />
          
          <SettingsRow
            title="Subscription"
            description="PRO - $5.99/month"
            icon="chart.pie.fill"
            onPress={() => {}}
            delay={200}
          />
        </SettingsSection>
        
        <SettingsSection title="Data Sharing" delay={300}>
          <SettingsRow
            title="Share Vehicle Data"
            description="Allow app to collect and share anonymized vehicle data"
            icon="chart.bar.fill"
            rightElement={
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: '#767577', true: `${tintColor}80` }}
                thumbColor={dataSharing ? tintColor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
            delay={350}
          />
          
          <SettingsRow
            title="Diagnostics"
            description="Share vehicle diagnostic codes"
            icon="exclamationmark.triangle.fill"
            iconColor="#FF9500"
            rightElement={
              <Switch
                value={diagnosticsSharing}
                onValueChange={setDiagnosticsSharing}
                trackColor={{ false: '#767577', true: `${tintColor}80` }}
                thumbColor={diagnosticsSharing ? tintColor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
            delay={400}
          />
          
          <SettingsRow
            title="Location"
            description="Share anonymized location data"
            icon="location.fill"
            iconColor="#FF3B30"
            rightElement={
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: '#767577', true: `${tintColor}80` }}
                thumbColor={locationSharing ? tintColor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
            delay={450}
          />
          
          <SettingsRow
            title="Battery & Charging"
            description="Share battery performance and charging data"
            icon="bolt.fill"
            iconColor="#4CD964"
            rightElement={
              <Switch
                value={batterySharing}
                onValueChange={setBatterySharing}
                trackColor={{ false: '#767577', true: `${tintColor}80` }}
                thumbColor={batterySharing ? tintColor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
            delay={500}
          />
          
          <SettingsRow
            title="Auto-enroll in new data categories"
            description="Automatically opt-in to new data sharing opportunities"
            icon="gear.badge.checkmark"
            rightElement={
              <Switch
                value={autoEnroll}
                onValueChange={setAutoEnroll}
                trackColor={{ false: '#767577', true: `${tintColor}80` }}
                thumbColor={autoEnroll ? tintColor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
            delay={550}
            showDivider={false}
          />
        </SettingsSection>
        
        <SettingsSection title="App Settings" delay={600}>
          <SettingsRow
            title="Notifications"
            description="Manage push notifications"
            icon="bell.fill"
            onPress={() => {}}
            delay={650}
          />
          
          <SettingsRow
            title="Appearance"
            description="Dark mode and theme settings"
            icon="paintbrush.fill"
            onPress={() => {}}
            delay={700}
          />
          
          <SettingsRow
            title="Privacy"
            description="Manage app permissions and privacy settings"
            icon="hand.raised.fill"
            onPress={() => {}}
            delay={750}
          />
          
          <SettingsRow
            title="Help & Support"
            description="FAQs, contact support"
            icon="questionmark.circle.fill"
            onPress={() => {}}
            delay={800}
            showDivider={false}
          />
        </SettingsSection>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FF3B30" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  actionButton: {
    padding: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 8,
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowDescription: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  rowRightContent: {
    marginLeft: 8,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    marginLeft: 64,
  },
  userBadge: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  userBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 12,
    borderRadius: 16,
    marginVertical: 16,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    opacity: 0.5,
    fontSize: 14,
    marginTop: 8,
  },
});
