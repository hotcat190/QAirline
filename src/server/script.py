import random
from datetime import datetime, timedelta

# Hàm tạo danh sách các bản ghi chuyến bay
def generate_flight_records(start_date, end_date, num_records):
    current_time = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
    end_time = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
    
    for day in range(7):
        date = current_time + timedelta(days=day)
        records = []
        while len(records) < num_records:
            # Random thời gian bắt đầu và kết thúc chuyến bay
            flight_duration = 60 * random.randint(3, 8)  # thời gian bay từ 3h đến 8h
            time_start = current_time + timedelta(minutes=15 * random.randint(0, 4 * 24))
            time_end = time_start + timedelta(minutes=flight_duration)
            
            # Random thông tin khác
            idbeginAirport = random.randint(1, 53)
            idendAirport = random.randint(1, 53)
            while idendAirport == idbeginAirport:  # Đảm bảo hai sân bay khác nhau
                idendAirport = random.randint(1, 53)
            
            idAirplane = random.randint(1, 5)
            idAdmin_created = random.randint(1, 2)
            
            # Tạo bản ghi
            record = f"('{time_start}', '{time_end}', {idbeginAirport}, {idendAirport}, {idAirplane}, {idAdmin_created})"
            records.append(record)
            
            current_time = time_end  # Cập nhật thời gian hiện tại
    
    return records

# Tạo 100 bản ghi
start_date = '2024-12-17 00:00:00'
end_date = '2024-12-22 23:59:59'
num_records = 500

flight_records = generate_flight_records(start_date, end_date, num_records)
print(len(flight_records))
# In SQL script
print("INSERT INTO flight (timeStart, timeEnd, idbeginAirport, idendAirport, idAirplane, idAdmin_created) VALUES")
print(",\n".join(flight_records) + ";")
