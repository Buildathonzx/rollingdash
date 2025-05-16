import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol'; // Assuming you have an Icon component

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol 
          name="car.2.fill" 
          size={200} 
          color="#FFFFFF" 
          style={styles.headerImage} 
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to RollingDash!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Your Smart Car Data Marketplace</ThemedText>
        <ThemedText>
          Explore real-time data from your (simulated) vehicle, choose what data you want to share, 
          and see how a decentralized marketplace for mobility data could work.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Key Features:</ThemedText>
        <View style={styles.featureItem}>
          <IconSymbol name="speedometer" size={24} color="#0a7ea4" style={styles.featureIcon}/>
          <ThemedText>View Real-time Vehicle Metrics (Dashboard)</ThemedText>
        </View>
        <View style={styles.featureItem}>
          <IconSymbol name="storefront.fill" size={24} color="#0a7ea4" style={styles.featureIcon}/>
          <ThemedText>Explore the Data Marketplace</ThemedText>
        </View>
        <View style={styles.featureItem}>
          <IconSymbol name="figure.walk.motion" size={24} color="#0a7ea4" style={styles.featureIcon}/>
          <ThemedText>Simulate Drives (Explore Tab)</ThemedText>
        </View>
        <View style={styles.featureItem}>
          <IconSymbol name="gearshape.fill" size={24} color="#0a7ea4" style={styles.featureIcon}/>
          <ThemedText>Manage Data & Settings</ThemedText>
        </View>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText>
          This prototype is built for the DeCharge x Para DePIN Hackathon.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    // Adjust as needed for your IconSymbol component
    // Example: might need to wrap in a View or adjust positioning
    alignSelf: 'center',
    marginTop: 40, // Adjust to position correctly in the parallax header
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    marginRight: 8,
  }
});
