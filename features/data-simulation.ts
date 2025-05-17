// Data simulation service for car data
import { useEffect, useState } from 'react';

// Define the car data interface
export interface CarData {
  timestamp: number;
  speed: number;
  rpm: number;
  fuelLevel: number;
  engineTemp: number;
  batteryLevel: number;
  efficiency: number;
  range: number;
  totalMileage: number;
  gps: {
    latitude: string;
    longitude: string;
  };
  diagnostics: string[];
  simulatedEarnings: string;
  emissionsReduced: number;
  powerUsage: number;
  carModel: string;
}

// Generate random car data
export const getSimulatedCarData = (): CarData => ({
  timestamp: Date.now(),
  speed: Math.floor(Math.random() * 120), // km/h
  rpm: Math.floor(Math.random() * 5000), // RPM
  fuelLevel: Math.random() * 100, // Percentage
  engineTemp: Math.floor(Math.random() * 50) + 70, // Celsius
  batteryLevel: Math.random() * 100, // EV battery percentage
  efficiency: Math.random() * 5 + 3, // km/kWh
  range: Math.floor(Math.random() * 100) + 200, // km
  totalMileage: Math.floor(Math.random() * 10000) + 5000, // km
  gps: {
    latitude: (Math.random() * 180 - 90).toFixed(6),
    longitude: (Math.random() * 360 - 180).toFixed(6),
  },
  diagnostics: Math.random() > 0.9 ? ['P0420'] : ['No issues'],
  simulatedEarnings: (Math.random() * 0.1).toFixed(4), // Simulated token earnings
  emissionsReduced: Math.random() * 10, // kg of CO2
  powerUsage: Math.random() * 20 + 10, // kW
  carModel: 'Tesla Model 3',
});

// Diagnostic trouble codes reference
export const dtcCodes = {
  'P0420': 'Catalyst System Efficiency Below Threshold',
  'P0171': 'System Too Lean (Bank 1)',
  'P0300': 'Random/Multiple Cylinder Misfire Detected',
  'P0455': 'Evaporative Emission System Leak Detected (large leak)',
  'P0102': 'Mass or Volume Air Flow Circuit Low Input',
};

// Calculate reward based on data shared
export const calculateReward = (dataPoints: string[]): number => {
  const baseReward = 0.001; // Base reward per data point
  let multiplier = 1.0;
  
  // Apply multipliers based on data types
  if (dataPoints.includes('location')) multiplier *= 1.5;
  if (dataPoints.includes('diagnostics')) multiplier *= 1.3;
  if (dataPoints.includes('speed')) multiplier *= 1.1;
  
  return baseReward * dataPoints.length * multiplier;
};

// Hook for using car data with automatic updates
export function useCarData(updateIntervalMs = 2000) {
  const [carData, setCarData] = useState<CarData>(getSimulatedCarData());
  const [dataHistory, setDataHistory] = useState<{ [key: string]: number[] }>({
    speed: [],
    rpm: [],
    fuelLevel: [],
    engineTemp: [],
    batteryLevel: [],
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getSimulatedCarData();
      setCarData(newData);
      
      // Update history values for charts
      setDataHistory(prev => ({
        speed: [...prev.speed.slice(-11), newData.speed],
        rpm: [...prev.rpm.slice(-11), newData.rpm],
        fuelLevel: [...prev.fuelLevel.slice(-11), newData.fuelLevel],
        engineTemp: [...prev.engineTemp.slice(-11), newData.engineTemp],
        batteryLevel: [...prev.batteryLevel.slice(-11), newData.batteryLevel],
      }));
    }, updateIntervalMs);
    
    return () => clearInterval(interval);
  }, [updateIntervalMs]);
  
  return { carData, dataHistory };
}

// Mock marketplace data types
export interface DataListingItem {
  id: string;
  name: string;
  description: string;
  category: 'Location' | 'Metrics' | 'Diagnostics' | 'Efficiency' | 'Safety';
  shared: boolean;
  rewardsPerDay: number;
  privacyLevel: 'Low' | 'Medium' | 'High';
}

// Generate mock marketplace data
export const getMarketplaceListings = (): DataListingItem[] => [
  {
    id: '1',
    name: 'Speed Data',
    description: 'Share your average and max speed anonymously',
    category: 'Metrics',
    shared: true,
    rewardsPerDay: 0.05,
    privacyLevel: 'Low',
  },
  {
    id: '2',
    name: 'GPS Location Trails',
    description: 'Share anonymized location history for traffic optimization',
    category: 'Location',
    shared: false,
    rewardsPerDay: 0.15,
    privacyLevel: 'High',
  },
  {
    id: '3',
    name: 'Fuel Consumption Patterns',
    description: 'Help optimize city-wide fuel usage and reduce emissions',
    category: 'Efficiency',
    shared: true,
    rewardsPerDay: 0.07,
    privacyLevel: 'Medium',
  },
  {
    id: '4',
    name: 'Diagnostic Trouble Codes',
    description: 'Contribute to predictive maintenance models',
    category: 'Diagnostics',
    shared: false,
    rewardsPerDay: 0.10,
    privacyLevel: 'Medium',
  },
  {
    id: '5',
    name: 'Battery Performance',
    description: 'Help improve EV battery technology and longevity',
    category: 'Efficiency',
    shared: true,
    rewardsPerDay: 0.12,
    privacyLevel: 'Low',
  },
  {
    id: '6',
    name: 'Braking Patterns',
    description: 'Contribute to safer road infrastructure design',
    category: 'Safety',
    shared: false,
    rewardsPerDay: 0.08,
    privacyLevel: 'Medium',
  },
];