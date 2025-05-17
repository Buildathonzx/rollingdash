
import time
import csv
from datetime import datetime

def simulate_obd_stream(csv_file, interval_sec=1):
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            print(f"[{datetime.now().isoformat()}] Vehicle ID: {row['vehicle_id']}, Speed: {row['speed_kmph']} km/h, RPM: {row['engine_rpm']}, Fuel: {row['fuel_level_pct']}%, Temp: {row['engine_temp_c']}°C, DTC: {row['dtc_code']}, Location: ({row['lat']}, {row['lon']})")
            time.sleep(interval_sec)

if __name__ == "__main__":
    simulate_obd_stream('synthetic_obd_data_24h.csv', interval_sec=0.5)
