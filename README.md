# DePIN x Mobility: Smart Car Data Marketplace

This project is a modular prototype for a decentralized smart car data marketplace, built with Expo and React Native. It aims to simulate smart vehicle data, allow users to visualize and control their data sharing, and prototype a peer-to-peer marketplace with potential token incentives, as per the DeCharge Hackathon requirements.

## Features

- **Real-time Synthetic Car Data Simulation**: Simulates key vehicle data including Speed, RPM, Fuel Level, Engine Temperature, GPS coordinates, and Diagnostic Trouble Codes (DTCs).
- **Data Visualization Dashboard**: Users can view their simulated car's data in real-time.
- **Peer-to-Peer Data Marketplace Interface**: Users can choose what data they share on a simulated marketplace.
- **Prototyped Incentive Model**: Placeholder for a token or incentive system to reward data contributions.
- **Modular Architecture**: Designed for easy extension with new data sources (e.g., real car APIs, other sensors) and features.
- **Para SDK Integration**: Ready for integrating Para for wallets and authentication to enhance user ownership and onchain interactions.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the app
   ```bash
   npx expo start
   ```

## Project Structure

- `app/` — Main application screens (Dashboard, Marketplace, Settings) and navigation.
- `components/` — Reusable UI components.
- `constants/` — App-wide constants (colors, styles, configuration).
- `features/` — Modular components for specific functionalities:
  - `data-simulation/` — Scripts and modules for generating/simulating car data (OBD, GPS).
  - `vehicle-data/` — Handling and processing of vehicle data.
  - `visualization/` — Components for displaying data (charts, maps, etc.).
- `hooks/` — Custom React hooks for shared logic.
- `marketplace/` — Logic and UI components for the data marketplace.
  - `api/` — Mock API or integration points for marketplace interactions.
  - `screens/` — Marketplace specific screens.
  - `services/` — Marketplace related services.
- `services/` — Core application services:
  - `para-integration/` — Modules for Para SDK wallet and authentication.
  - `data-manager/` — Service for managing data flows and storage.
- `store/` — Global state management (e.g., Zustand, Redux).
- `types/` — TypeScript type definitions for the project.
- `assets/` — Static files like images, fonts.
- `navigation/` — Navigation setup if not fully covered by `expo-router` file-based routing.
- `scripts/` — Utility scripts for development and building.
- `utils/` — Utility functions.

## Extending
- Add new data simulation modules in `features/data-simulation/`.
- Integrate real car APIs by creating new services in `services/`.
- Develop new UI components in `components/` or feature-specific UI in `features/*/` or `marketplace/`.

## Resources
- [DeCharge Hackathon Brief](./docx/requirements.md)
- [Synthetic OBD Dataset & Simulator](https://drive.google.com/drive/folders/14cyq1ENXsz9EyzGVIEh5TtzkARejwemy?usp=sharing)

---

Built for the DeCharge x Para DePIN Hackathon.
