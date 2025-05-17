import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCarData } from '@/features/data-simulation';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH * 0.85;

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  destination: string;
  delay: number;
}

function FeatureCard({ title, description, icon, destination, delay }: FeatureCardProps) {
  const router = useRouter();
  const tintColor = useThemeColor({}, 'tint');
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  
  useEffect(() => {
    // Animate card entrance
    cardOpacity.value = withDelay(
      delay,
      withSpring(1, { damping: 15, stiffness: 100 })
    );
    
    cardTranslateY.value = withDelay(
      delay,
      withSpring(0, { damping: 15, stiffness: 100 })
    );
  }, [cardOpacity, cardTranslateY, delay]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ translateY: cardTranslateY.value }]
    };
  });
  
  return (
    <Animated.View style={[styles.cardAnimationContainer, animatedStyle]}>
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => router.navigate(destination as any)}
      >
        <ThemedView style={styles.cardContent}>
          <View style={[styles.iconBox, { backgroundColor: `${tintColor}20` }]}>
            <IconSymbol name={icon} size={32} color={tintColor} />
          </View>
          
          <View style={styles.cardTextContent}>
            <ThemedText style={styles.cardTitle}>{title}</ThemedText>
            <ThemedText style={styles.cardDescription}>{description}</ThemedText>
          </View>
          
          <View style={styles.arrowContainer}>
            <IconSymbol name="chevron.right" size={20} color={tintColor} />
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  const { carData, totalEarnings } = useCarData();
  
  // Animation values
  const heroScale = useSharedValue(0.8);
  const heroOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Animate hero section entrance
    heroScale.value = withSequence(
      withSpring(1.1, { damping: 15, stiffness: 100 }),
      withSpring(1, { damping: 15, stiffness: 100 })
    );
    
    heroOpacity.value = withSpring(1, { damping: 15, stiffness: 150 });
  }, [heroScale, heroOpacity]);
  
  const heroAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: heroOpacity.value,
      transform: [{ scale: heroScale.value }],
    };
  });
  
  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="RollingDash" 
        rightActions={
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.navigate('settings' as any)}
          >
            <IconSymbol name="person.crop.circle.fill" size={24} color={tintColor} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.heroContainer, heroAnimatedStyle]}>
          <ThemedView style={styles.heroCard}>
            <View style={styles.heroContent}>
              <View style={styles.heroTextContainer}>
                <ThemedText style={styles.welcomeText}>Welcome back</ThemedText>
                <ThemedText style={styles.heroTitle}>Your Data,{'\n'}Your Earnings</ThemedText>
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>
                    {totalEarnings.toFixed(4)}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>DCL Earned</ThemedText>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>
                    {carData.dataPointsCollected || 0}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Data Points</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
        </Animated.View>
        
        <ThemedText style={styles.sectionTitle}>Your Data Hub</ThemedText>
        
        <FeatureCard
          title="Vehicle Dashboard"
          description="Monitor real-time metrics from your connected vehicle"
          icon="car.fill"
          destination="/dashboard"
          delay={150}
        />
        
        <FeatureCard
          title="Data Marketplace"
          description="Choose what vehicle data to share and earn tokens"
          icon="storefront.fill"
          destination="/marketplace"
          delay={300}
        />
        
        <FeatureCard
          title="Explore DePIN"
          description="Learn how your data helps build decentralized infrastructure"
          icon="network"
          destination="/explore"
          delay={450}
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
  scrollViewContent: {
    padding: 16,
  },
  profileButton: {
    padding: 8,
  },
  heroContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  heroCard: {
    width: CARD_WIDTH,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  heroContent: {
    padding: 24,
  },
  heroTextContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(150, 150, 150, 0.3)',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  cardAnimationContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContent: {
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
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});
