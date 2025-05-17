import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withSequence
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AppBar } from '@/components/AppBar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MarketplaceList } from '@/components/MarketplaceComponents';
import { getMarketplaceListings, DataListingItem } from '@/features/data-simulation';

export default function MarketplaceScreen() {
  const tintColor = useThemeColor({}, 'tint');
  
  const [listings, setListings] = useState<DataListingItem[]>(getMarketplaceListings());
  const [totalRewards, setTotalRewards] = useState(0);
  
  // Animation values
  const earningsScale = useSharedValue(1);
  const activeSharesCount = useSharedValue(0);
  
  // Update total rewards whenever listings change
  useEffect(() => {
    const activeListings = listings.filter(item => item.shared);
    activeSharesCount.value = withTiming(activeListings.length);
    
    const daily = activeListings.reduce((sum, item) => sum + item.rewardsPerDay, 0);
    setTotalRewards(daily);
    
    // Pulse animation when rewards change
    earningsScale.value = withSequence(
      withSpring(1.1, { damping: 8 }),
      withSpring(1, { damping: 8 })
    );
  }, [listings, earningsScale, activeSharesCount]);
  
  const earningsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: earningsScale.value }],
    };
  });
  
  // Handle toggling data sharing
  const handleToggleSharing = (id: string, newStatus: boolean) => {
    setListings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, shared: newStatus } : item
      )
    );
  };
  
  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="Data Marketplace" 
        rightActions={
          <TouchableOpacity style={styles.infoButton}>
            <IconSymbol name="info.circle.fill" size={24} color={tintColor} />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.content}>
        <ThemedView style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <ThemedText style={styles.earningsTitle}>Daily Earnings</ThemedText>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color={tintColor} />
          </View>
          
          <Animated.View style={earningsAnimatedStyle}>
            <ThemedText style={styles.earningsAmount}>
              {totalRewards.toFixed(4)} <ThemedText style={styles.ticker}>DCL</ThemedText>
            </ThemedText>
          </Animated.View>
          
          <View style={styles.divider} />
          
          <View style={styles.sharingStats}>
            <ThemedText style={styles.sharingStatsText}>
              Sharing {listings.filter(item => item.shared).length} of {listings.length} data types
            </ThemedText>
            
            <View style={styles.progressBackground}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  {
                    width: `${(listings.filter(item => item.shared).length / listings.length) * 100}%`,
                    backgroundColor: tintColor
                  }
                ]}
              />
            </View>
          </View>
        </ThemedView>
        
        <ThemedText style={styles.sectionTitle}>Your Data Categories</ThemedText>
        
        <MarketplaceList 
          listings={listings}
          onToggleSharing={handleToggleSharing}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoButton: {
    padding: 8,
  },
  earningsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsTitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  ticker: {
    fontSize: 18,
    fontWeight: 'normal',
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    marginVertical: 16,
  },
  sharingStats: {
    marginTop: 4,
  },
  sharingStatsText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBackground: {
    height: 6,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
