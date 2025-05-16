// filepath: /home/nathfavour/Documents/code/buildathonzx/rollingdash/app/(tabs)/settings.tsx
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol'; // Assuming you have an Icon component

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [dataSharingConsent, setDataSharingConsent] = useState(true);
  const [paraWalletConnected, setParaWalletConnected] = useState(false); // Placeholder state

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleDataSharingConsent = () => setDataSharingConsent(previousState => !previousState);

  const handleConnectParaWallet = () => {
    // TODO: Implement Para SDK wallet connection logic
    Alert.alert(
      "Connect Para Wallet", 
      "Para Wallet integration coming soon! This will allow you to manage your data ownership and rewards securely.",
      [{ text: "OK" }]
    );
    // Simulate connection for UI purposes for now
    setParaWalletConnected(true);
  };

  const handleManageDataPreferences = () => {
    // TODO: Navigate to a more detailed data preferences screen or show a modal
    Alert.alert("Manage Data Preferences", "Granular data preference settings coming soon!");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.headerContainer}>
          <IconSymbol name="gearshape.fill" size={30} style={styles.headerIcon}/>
          <ThemedText type="title">Settings</ThemedText>
        </View>

        <ThemedView style={styles.settingSection}>
          <ThemedText type="subtitle">General</ThemedText>
          <View style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Enable Notifications</ThemedText>
            <Switch
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          </View>
        </ThemedView>

        <ThemedView style={styles.settingSection}>
          <ThemedText type="subtitle">Data & Privacy</ThemedText>
          <View style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Allow Data Contribution</ThemedText>
            <Switch
              onValueChange={toggleDataSharingConsent}
              value={dataSharingConsent}
            />
          </View>
          <Button title="Manage Detailed Data Preferences" onPress={handleManageDataPreferences} />
        </ThemedView>

        <ThemedView style={styles.settingSection}>
          <ThemedText type="subtitle">Wallet & Rewards (Para Integration)</ThemedText>
          {paraWalletConnected ? (
            <View>
              <ThemedText style={styles.walletStatusText}>Para Wallet: Connected</ThemedText>
              {/* TODO: Display wallet address or other relevant info */}
              <Button title="Disconnect Wallet" onPress={() => setParaWalletConnected(false)} color="red"/>
            </View>
          ) : (
            <Button title="Connect Para Wallet" onPress={handleConnectParaWallet} />
          )}
          <ThemedText style={styles.infoText}>
            Connect your Para wallet to manage data ownership, receive rewards, and interact with onchain features.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.settingSection}>
          <ThemedText type="subtitle">About</ThemedText>
          <ThemedText>App Version: 1.0.0 (Prototype)</ThemedText>
          <ThemedText>Built for DeCharge x Para Hackathon</ThemedText>
        </ThemedView>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  headerIcon: {
    // Style if needed
  },
  settingSection: {
    marginBottom: 25,
    padding: 15,
    borderRadius: 8,
    // ThemedView provides background
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
  walletStatusText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green', // Example color
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
});
