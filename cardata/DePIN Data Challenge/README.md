
# 🚗 DeCharge: Synthetic OBD Dataset & Simulator

This repository contains a synthetic OBD-II dataset and a real-time simulator script to help developers prototype smart car data applications, mobility data marketplaces, and DePIN-powered tools.

## 📂 Contents

- `synthetic_obd_data_24h.json` – 24-hour synthetic OBD data (JSON format)
- `synthetic_obd_data_24h.csv` – Same dataset in CSV format
- `obd_data_simulator.py` – A Python script to simulate streaming vehicle data in real-time

## 📦 Dataset Fields

| Field            | Description                            |
|------------------|----------------------------------------|
| `timestamp`      | ISO timestamp of the data point        |
| `vehicle_id`     | Arbitrary vehicle identifier           |
| `speed_kmph`     | Vehicle speed in km/h                  |
| `engine_rpm`     | Engine revolutions per minute          |
| `fuel_level_pct` | Fuel remaining (0–100%)                |
| `engine_temp_c`  | Engine temperature in Celsius          |
| `lat`, `lon`     | Simulated GPS coordinates              |
| `dtc_code`       | Diagnostic Trouble Code (e.g. P0420)   |

## ▶️ How to Run the Simulator

```bash
python obd_data_simulator.py
```

Each line simulates one minute of vehicle data, streamed every 0.5 seconds.

## 💡 Use Cases

- Prototype mobility data dashboards
- Test tokenized data-sharing flows
- Train DePIN marketplace UI/UX with mock data
- Create demo content for Solana hackathons

## 📫 Created by [DeCharge](https://decharge.network)
