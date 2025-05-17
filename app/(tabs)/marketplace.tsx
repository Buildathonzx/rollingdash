import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressRing } from '@/components/ProgressRing';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Import data simulation
import { DataListingItem, getMarketplaceListings } from '@/features/data-simulation';
import { useThemeColor } from '@/hooks/useThemeColor';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function MarketplaceScreen() {
  const [dataListings, setDataListings] = useState<DataListingItem[]>(getMarketplaceListings());
  const [totalRewards, setTotalRewards] = useState(0.42); // Initial simulated value
  const [activeFilter, setActiveFilter] = useState('all');
  const tintColor = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    // Calculate total potential rewards
    const potentialRewards = dataListings
      .filter(item => item.shared)
      .reduce((sum, item) => sum + item.rewardsPerDay, 0);
    
    setTotalRewards(potentialRewards);
  }, [dataListings]);

  const toggleShare = (id: string) => {
    setDataListings(prevListings =>
      prevListings.map(item =>
        item.id === id ? { ...item, shared: !item.shared } : item
      )
    );
  };

  const filterItems = (items: DataListingItem[]) => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());
  };
  
  const getPrivacyColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low': return '#4cd964';
      case 'Medium': return '#FF9500';
      case 'High': return '#FF3B30';
    }
  };

  const categoryFilters = [
    { id: 'all', name: 'All', icon: 'chart.pie.fill' },
    { id: 'metrics', name: 'Metrics', icon: 'speedometer' },
    { id: 'location', name: 'Location', icon: 'location.fill' },
    { id: 'efficiency', name: 'Efficiency', icon: 'leaf.fill' },
    { id: 'diagnostics', name: 'Diagnostics', icon: 'waveform.path.ecg' },
    { id: 'safety', name: 'Safety', icon: 'shield.fill' },
  ];
  
  const FilterButton = ({ filter }: { filter: { id: string, name: string, icon: string } }) => {
    const textColor = useThemeColor({}, 'text');
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          activeFilter === filter.id && { backgroundColor: `${tintColor}20` }
        ]}
        onPress={() => setActiveFilter(filter.id)}
      >
        <IconSymbol 
          name={filter.icon} 
          size={18} 
          color={activeFilter === filter.id ? tintColor : textColor} 
        />
        <ThemedText 
          style={[
            styles.filterText,
            activeFilter === filter.id && { color: tintColor, fontWeight: '600' }
          ]}
        >
          {filter.name}
        </ThemedText>
      </TouchableOpacity>
    );
  };
  
  const ListingItem = ({ item }: { item: DataListingItem }) => {
    const privacyColor = getPrivacyColor(item.privacyLevel);
    
    return (
      <AnimatedCard
        entering={FadeInDown.delay(parseInt(item.id) * 100).duration(400)}
        title={item.name}
        description={item.description}
        icon={getCategoryIcon(item.category)}
        rightContent={
          <Switch
            trackColor={{ false: '#767577', true: `${tintColor}50` }}
            thumbColor={item.shared ? tintColor : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleShare(item.id)}
            value={item.shared}
          />
        }
      >
        <View style={styles.listingDetails}>
          <View style={styles.listingDetail}>
            <IconSymbol name="bitcoin.circle.fill" size={16} color={tintColor} />
            <ThemedText style={styles.detailText}>
              {item.rewardsPerDay.toFixed(2)} DCL/day
            </ThemedText>
          </View>
          
          <View style={styles.listingDetail}>
            <IconSymbol name="shield.fill" size={16} color={privacyColor} />
            <ThemedText style={[styles.detailText, { color: privacyColor }]}>
              {item.privacyLevel} Privacy Impact
            </ThemedText>
          </View>
          
          <ThemedText style={styles.categoryTag}>
            {item.category}
          </ThemedText>
        </View>
      </AnimatedCard>
    );
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Metrics': return 'speedometer';
      case 'Location': return 'location.fill';
      case 'Efficiency': return 'leaf.fill';
      case 'Diagnostics': return 'waveform.path.ecg';
      case 'Safety': return 'shield.fill';
      default: return 'chart.pie.fill';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <AppBar 
        title="Data Marketplace" 
        rightActions={
          <IconSymbol name="arrow.clockwise" size={22} color={tintColor} />
        }
      />
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <ThemedText type="subtitle">Your Data Rewards</ThemedText>
            <ThemedText type="title" style={styles.rewardsValue}>
              {totalRewards.toFixed(2)} <ThemedText style={styles.unit}>DCL/day</ThemedText>
            </ThemedText>
            <ThemedText style={styles.rewardsCaption}>
              Based on your current data sharing settings
            </ThemedText>
            <Button
              title="Withdraw Rewards"
              onPress={() => {}}
              variant="primary"
              icon="wallet.pass.fill"
              style={styles.withdrawButton}
            />
          </View>
          
          <View style={styles.progressRingContainer}>
            <ProgressRing
              progress={(dataListings.filter(i => i.shared).length / dataListings.length) * 100}
              size={100}
              label="Data shared"
              color={tintColor}
            />
          </View>
        </View>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Filter Data Categories
        </ThemedText>
        
        <FlatList
          horizontal
          data={categoryFilters}
          renderItem={({ item }) => <FilterButton filter={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        />
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Available Data Points
        </ThemedText>
        
        {filterItems(dataListings).map(item => (
          <ListingItem key={item.id} item={item} />
        ))}
        
        <ThemedText style={styles.marketplaceInfo}>
          By sharing your vehicle data, you help improve mobility services while earning rewards.
          All shared data is anonymized to protect your privacy.
        </ThemedText>
        
        <View style={styles.actionButtons}>
          <Button
            title="Privacy Settings"
            onPress={() => {}}
            variant="outline"
            icon="key.fill"
            style={styles.actionButton}
          />
          <Button
            title="Rewards History"
            onPress={() => {}}
            variant="outline"
            icon="doc.text.fill"
            style={styles.actionButton}
          />
        </View>
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
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    marginVertical: 8,
    flexDirection: 'row',
  },
  summaryContent: {
    flex: 1.5,
  },
  progressRingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsValue: {
    fontSize: 28,
    marginVertical: 8,
  },
  unit: {
    fontSize: 16,
    opacity: 0.8,
  },
  rewardsCaption: {
    opacity: 0.7,
    marginBottom: 16,
  },
  withdrawButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
  },
  listingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  listingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  categoryTag: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  marketplaceInfo: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
