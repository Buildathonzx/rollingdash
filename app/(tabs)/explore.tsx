import React from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DePinInfoCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
  color: string;
  onPress?: () => void;
}

function DePinInfoCard({ title, description, icon, delay, color, onPress }: DePinInfoCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <ThemedView style={styles.infoCard}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <IconSymbol name={icon} size={32} color={color} />
          </View>
          
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>{title}</ThemedText>
            <ThemedText style={styles.cardDescription}>{description}</ThemedText>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  imageSource: any;
  delay: number;
}

function ResourceCard({ title, description, url, imageSource, delay }: ResourceCardProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };
  
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <ThemedView style={styles.resourceCard}>
          <Image source={imageSource} style={styles.resourceImage} />
          <View style={styles.resourceContent}>
            <ThemedText style={styles.resourceTitle}>{title}</ThemedText>
            <ThemedText style={styles.resourceDescription}>{description}</ThemedText>
            <View style={styles.learnMoreContainer}>
              <ThemedText style={styles.learnMore}>Learn more</ThemedText>
              <IconSymbol name="arrow.right" size={14} color="#007AFF" />
            </View>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ExploreScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  
  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="Explore DePIN" 
        rightActions={
          <TouchableOpacity style={styles.infoButton}>
            <IconSymbol name="info.circle.fill" size={24} color={tintColor} />
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
        <ThemedView style={styles.heroSection}>
          <ThemedText style={styles.heroTitle}>
            Decentralized Physical Infrastructure Networks
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Learn how your car data contributes to the DePIN ecosystem
          </ThemedText>
        </ThemedView>
        
        <ThemedText style={styles.sectionTitle}>What is DePIN?</ThemedText>
        
        <DePinInfoCard
          title="Decentralized Networks"
          description="DePIN connects physical infrastructure to blockchain networks, allowing for community ownership and operation."
          icon="network"
          color="#5856D6"
          delay={100}
        />
        
        <DePinInfoCard
          title="Tokenized Incentives"
          description="Participants earn tokens for contributing data, resources, and services to the network."
          icon="bitcoin.circle.fill"
          color="#FF9500"
          delay={200}
        />
        
        <DePinInfoCard
          title="Community Ownership"
          description="Unlike traditional centralized services, DePIN gives users control, privacy, and rewards."
          icon="person.3.fill"
          color="#4CD964"
          delay={300}
        />
        
        <ThemedText style={styles.sectionTitle}>Your Car as a DePIN Node</ThemedText>
        
        <ThemedView style={styles.benefitsContainer}>
          <View style={styles.benefitRow}>
            <View style={styles.benefitItem}>
              <IconSymbol name="chart.bar.fill" size={28} color="#5AC8FA" />
              <ThemedText style={styles.benefitTitle}>Data Sharing</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Share vehicle data to improve urban mobility
              </ThemedText>
            </View>
            
            <View style={styles.benefitItem}>
              <IconSymbol name="bolt.fill" size={28} color="#FF3B30" />
              <ThemedText style={styles.benefitTitle}>Energy Grid</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Stabilize power networks with EV charging data
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.benefitRow}>
            <View style={styles.benefitItem}>
              <IconSymbol name="map.fill" size={28} color="#FF9500" />
              <ThemedText style={styles.benefitTitle}>Traffic Data</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Contribute to decentralized mapping systems
              </ThemedText>
            </View>
            
            <View style={styles.benefitItem}>
              <IconSymbol name="leaf.fill" size={28} color="#4CD964" />
              <ThemedText style={styles.benefitTitle}>Carbon Reduction</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Earn rewards for eco-friendly driving
              </ThemedText>
            </View>
          </View>
        </ThemedView>
        
        <ThemedText style={styles.sectionTitle}>Resources</ThemedText>
        
        <ResourceCard
          title="DeCharge Network"
          description="Building the world's decentralized EV charging infrastructure."
          url="https://decharge.network"
          imageSource={require('@/assets/images/placeholder.png')}
          delay={500}
        />
        
        <ResourceCard
          title="Para Wallet SDK"
          description="Create non-custodial wallets for DePIN applications."
          url="https://para.org"
          imageSource={require('@/assets/images/placeholder.png')}
          delay={600}
        />
        
        <ResourceCard
          title="DePIN Community"
          description="Join the global conversation about decentralized infrastructure."
          url="https://t.me/dechargecommunity"
          imageSource={require('@/assets/images/placeholder.png')}
          delay={700}
        />
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
  infoButton: {
    padding: 8,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  benefitsContainer: {
    marginBottom: 24,
  },
  benefitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  benefitItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 18,
  },
  resourceCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  resourceContent: {
    padding: 16,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
  },
  learnMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMore: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginRight: 4,
  },
});
