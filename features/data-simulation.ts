// Data simulation service for car data
import { useEffect, useState } from 'react';

// Define diagnostic trouble codes and their descriptions
export const DIAGNOSTIC_CODES: Record<string, string> = {
  'P0420': 'Catalyst System Efficiency Below Threshold',
  'P0171': 'System Too Lean (Bank 1)',
  'P0300': 'Random/Multiple Cylinder Misfire Detected',
  'P0455': 'Evaporative Emission Control System Leak Detected',
  'P0401': 'Exhaust Gas Recirculation Flow Insufficient',
  'P0128': 'Coolant Thermostat Temperature Below Regulating Temperature',
  'P0442': 'Evaporative Emission Control System Leak Detected (Small Leak)',
  'P0456': 'Evaporative Emission Control System Leak Detected (Very Small Leak)',
  'P0131': 'O2 Sensor Circuit Low Voltage (Bank 1, Sensor 1)',
  'P0302': 'Cylinder 2 Misfire Detected',
};

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
  engineLoad: number;
  throttlePosition: number;
  dataPointsCollected: number;
  dataPointsShared: number;
  sharingEnabled: boolean;
}

// Generate semi-realistic data patterns
export const getSimulatedCarData = (): CarData => {
  // Create pseudo-random but somewhat realistic patterns
  const time = new Date();
  const hour = time.getHours();
  
  // Simulate driving patterns based on time of day
  const isDriving = Math.random() > (hour >= 22 || hour <= 6 ? 0.8 : 0.3);
  const isCityDriving = Math.random() > 0.5;
  
  // Base speed on time and driving context
  let speed = 0;
  if (isDriving) {
    speed = isCityDriving 
      ? Math.floor(Math.random() * 50) + 10 // City speeds: 10-60 km/h
      : Math.floor(Math.random() * 60) + 60; // Highway speeds: 60-120 km/h
  }
  
  // RPM correlates with speed
  const rpm = isDriving 
    ? speed * 40 + Math.floor(Math.random() * 500) 
    : Math.floor(Math.random() * 800) + 700; // Idle RPM around 700-1500
  
  // Daily fuel consumption simulation
  const fuelLevel = Math.max(0, Math.min(100, 70 - (hour % 24) * 0.8 + Math.random() * 10));
  
  // Engine temperature based on driving status
  const engineTemp = isDriving 
    ? 85 + Math.floor(Math.random() * 15) // Running engine: 85-100°C
    : Math.max(70, 70 + Math.floor(Math.random() * 15)); // Cooling or cold engine
  
  // GPS with small variations to simulate movement
  const baseLat = 37.7749; // San Francisco as an example
  const baseLng = -122.4194;
  const latVariation = isDriving ? (Math.random() * 0.01 - 0.005) : 0;
  const lngVariation = isDriving ? (Math.random() * 0.01 - 0.005) : 0;
  
  // Daily engine load based on speed
  const engineLoad = isDriving 
    ? (30 + speed / 2 + Math.random() * 10) 
    : Math.random() * 5;
    
  // Throttle position correlates with speed changes
  const throttlePosition = isDriving 
    ? Math.min(100, speed / 1.2 + Math.random() * 20) 
    : Math.random() * 3;
  
  // Simulate diagnostic codes occasionally
  const diagnostics = Math.random() > 0.92 
    ? [Object.keys(DIAGNOSTIC_CODES)[Math.floor(Math.random() * Object.keys(DIAGNOSTIC_CODES).length)]] 
    : ['No issues'];
  
  // Calculate earnings based on data points and sharing status
  const dataPointsCollected = Math.floor(isDriving ? 15 + Math.random() * 10 : 5 + Math.random() * 5);
  const sharingEnabled = Math.random() > 0.2;
  const dataPointsShared = sharingEnabled ? Math.floor(dataPointsCollected * (0.7 + Math.random() * 0.3)) : 0;
  const earningsRate = 0.0015; // DCL tokens per data point
  const simulatedEarnings = (dataPointsShared * earningsRate).toFixed(4);
  
  return {
    timestamp: Date.now(),
    speed,
    rpm,
    fuelLevel,
    engineTemp,
    gps: {
      latitude: (baseLat + latVariation).toFixed(6),
      longitude: (baseLng + lngVariation).toFixed(6),
    },
    diagnostics,
    simulatedEarnings,
    batteryLevel: Math.max(0, Math.min(100, 85 - (hour % 24) * 0.6 + Math.random() * 5)), // EV battery percentage
    efficiency: isDriving ? 3.5 + Math.random() * 2 : 0, // km/kWh
    range: Math.floor(220 - (hour % 24) * 2 + Math.random() * 20), // km
    totalMileage: 12543 + Math.floor(hour * 12 + Math.random() * 10), // km
    engineLoad,
    throttlePosition,
    dataPointsCollected,
    dataPointsShared,
    sharingEnabled,
    emissionsReduced: isDriving ? (speed / 60) * 0.12 : 0, // kg CO2 saved when sharing data
    powerUsage: isDriving ? 10 + (speed / 10) : 0.5, // kW
    carModel: 'Tesla Model 3',
  };
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
  const [totalEarnings, setTotalEarnings] = useState(0);
  
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
      
      // Accumulate earnings
      setTotalEarnings(prev => prev + parseFloat(newData.simulatedEarnings));
    }, updateIntervalMs);
    
    return () => clearInterval(interval);
  }, [updateIntervalMs]);
  
  return { carData, dataHistory, totalEarnings };
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
  icon: string;
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
    icon: 'speedometer',
  },
  {
    id: '2',
    name: 'GPS Location Trails',
    description: 'Share anonymized location history for traffic optimization',
    category: 'Location',
    shared: false,
    rewardsPerDay: 0.15,
    privacyLevel: 'High',
    icon: 'location.fill',
  },
  {
    id: '3',
    name: 'Fuel Consumption Patterns',
    description: 'Help optimize city-wide fuel usage and reduce emissions',
    category: 'Efficiency',
    shared: true,
    rewardsPerDay: 0.07,
    privacyLevel: 'Medium',
    icon: 'drop.fill',
  },
  {
    id: '4',
    name: 'Diagnostic Trouble Codes',
    description: 'Contribute to predictive maintenance models',
    category: 'Diagnostics',
    shared: false,
    rewardsPerDay: 0.10,
    privacyLevel: 'Medium',
    icon: 'exclamationmark.triangle.fill',
  },
  {
    id: '5',
    name: 'Battery Performance',
    description: 'Help improve EV battery technology and longevity',
    category: 'Efficiency',
    shared: true,
    rewardsPerDay: 0.12,
    privacyLevel: 'Low',
    icon: 'battery.100',
  },
  {
    id: '6',
    name: 'Braking Patterns',
    description: 'Contribute to safer road infrastructure design',
    category: 'Safety',
    shared: false,
    rewardsPerDay: 0.08,
    privacyLevel: 'Medium',
    icon: 'hand.raised.fill',
  },
];