import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Switch, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { DataListingItem } from '@/features/data-simulation';

// Define the props for the DataSharingCard component
interface DataSharingCardProps {
  item: DataListingItem;
  onToggleSharing: (id: string, newStatus: boolean) => void;
}

export function DataSharingCard({ item, onToggleSharing }: DataSharingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  
  const tintColor = useThemeColor({}, 'tint');
  const privacyColors = {
    'Low': '#4CD964',
    'Medium': '#FF9500',
    'High': '#FF3B30'
  };

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const handleToggleSharing = () => {
    onToggleSharing(item.id, !item.shared);
  };

  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity 
        onPress={toggleExpand}
        activeOpacity={0.7}
        style={styles.header}
      >
        <View style={styles.leftContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${tintColor}20` }]}>
            <IconSymbol name={item.icon} size={24} color={tintColor} />
          </View>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>{item.name}</ThemedText>
            <View style={styles.categoryContainer}>
              <ThemedText style={styles.category}>{item.category}</ThemedText>
            </View>
          </View>
        </View>
        
        <View style={styles.rightContent}>
          <View style={styles.rewardsContainer}>
            <ThemedText style={styles.rewards}>{item.rewardsPerDay.toFixed(2)}</ThemedText>
            <ThemedText style={styles.rewardsLabel}>DCL/day</ThemedText>
          </View>
          <Switch
            value={item.shared}
            onValueChange={handleToggleSharing}
            trackColor={{ false: '#767577', true: `${tintColor}80` }}
            thumbColor={item.shared ? tintColor : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </TouchableOpacity>
      
      <Animated.View style={[styles.expandedContent, { height: heightInterpolate }]}>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
        
        <View style={styles.privacyContainer}>
          <ThemedText style={styles.privacyLabel}>Privacy Impact:</ThemedText>
          <View style={[
            styles.privacyBadge, 
            { backgroundColor: privacyColors[item.privacyLevel] }
          ]}>
            <ThemedText style={styles.privacyText}>{item.privacyLevel}</ThemedText>
          </View>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

// Define the props for the MarketplaceList component
interface MarketplaceListProps {
  listings: DataListingItem[];
  onToggleSharing: (id: string, newStatus: boolean) => void;
}

export function MarketplaceList({ listings, onToggleSharing }: MarketplaceListProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredListings = activeFilter 
    ? listings.filter(item => item.category === activeFilter)
    : listings;
  
  const categories = Array.from(
    new Set(listings.map(item => item.category))
  );
  
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === null && { backgroundColor: tintColor, borderColor: tintColor }
          ]}
          onPress={() => setActiveFilter(null)}
        >
          <ThemedText style={[
            styles.filterText,
            activeFilter === null && { color: backgroundColor }
          ]}>
            All
          </ThemedText>
        </TouchableOpacity>
        
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterChip,
              activeFilter === category && { backgroundColor: tintColor, borderColor: tintColor }
            ]}
            onPress={() => setActiveFilter(category)}
          >
            <ThemedText style={[
              styles.filterText,
              activeFilter === category && { color: backgroundColor }
            ]}>
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView style={styles.listContainer}>
        {filteredListings.map(item => (
          <DataSharingCard 
            key={item.id} 
            item={item} 
            onToggleSharing={onToggleSharing}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  category: {
    fontSize: 12,
    opacity: 0.7,
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rewardsContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  rewards: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  expandedContent: {
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  privacyLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  privacyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  privacyText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});