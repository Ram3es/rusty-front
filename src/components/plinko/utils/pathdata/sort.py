import json
import os

# JSON file path
json_file = "sim_rows_16.json"

# Load JSON data from file
with open(json_file, "r") as file:
    json_data = json.load(file)

# Group objects by "end" value
grouped_data = {}
for obj in json_data:
    end_value = obj["end"]
    if end_value in grouped_data:
        grouped_data[end_value].append(obj)
    else:
        grouped_data[end_value] = [obj]

# Create folders for each unique "end" value
output_folder = "output"
os.makedirs(output_folder, exist_ok=True)

# Create separate JSON files for each unique "end" value
for end_value, objects in grouped_data.items():
    filename = f"rows_16_end_{end_value}.json"
    filepath = os.path.join(output_folder, filename)

    with open(filepath, "w") as file:
        json.dump(objects, file, indent=2)

    print(f"Created file: {filepath}")
