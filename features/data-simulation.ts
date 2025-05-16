// Data simulation service for car data
export interface CarData {
  speed: number;
  rpm: number;
  fuelLevel: number;
  engineTemp: number;
  gps: {
    latitude: string;
    longitude: string;
  };
  diagnostics: string[];
  simulatedEarnings: string;
  batteryLevel?: number;
  efficiency?: number;
  range?: number;
}

export const getSimulatedCarData = (): CarData => ({
  speed: Math.floor(Math.random() * 120), // km/h
  rpm: Math.floor(Math.random() * 5000), // RPM
  fuelLevel: Math.random() * 100, // Percentage
  engineTemp: Math.floor(Math.random() * 50) + 70, // Celsius
  gps: {
    latitude: (Math.random() * 180 - 90).toFixed(6),
    longitude: (Math.random() * 360 - 180).toFixed(6),
  },
  diagnostics: Math.random() > 0.9 ? ['P0420'] : ['No issues'],
  simulatedEarnings: (Math.random() * 0.1).toFixed(4), // Simulated token earnings
  batteryLevel: Math.random() * 100, // EV battery percentage
  efficiency: Math.random() * 5 + 3, // km/kWh
  range: Math.floor(Math.random() * 100) + 200, // km
});