import random
from datetime import datetime, timedelta

# Hàm tạo danh sách các bản ghi chuyến bay
def generate_flight_records(start_date, end_date, num_records):
    cur = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
    end_time = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
    records = []
    i = 5
    for day in range(14):
        cur = cur + timedelta(days=1)
        today = cur

        while cur.day == today.day:
            # Random thời gian bắt đầu và kết thúc chuyến bay
            flight_duration = 60 * random.randint(2, 4)  # thời gian bay từ 3h đến 8h
            time_start = cur + timedelta(minutes=15 * random.randint(1, 10))
            time_end = time_start + timedelta(minutes=flight_duration)
            
            # Random thông tin khác
            idbeginAirport = random.randint(1, 4)
            idendAirport = random.randint(1, 4)
            while idendAirport == idbeginAirport:  # Đảm bảo hai sân bay khác nhau
                idendAirport = random.randint(1, 4)
            
            idAirplane = random.randint(1, 5)
            idAdmin_created = random.randint(1, 2)
            
            # Tạo bản ghi
            record = f"('{i}', '{time_start}', '{time_end}', {idbeginAirport}, {idendAirport}, {idAirplane}, {idAdmin_created})"
            records.append(record)
            i += 1
            cur = time_end  # Cập nhật thời gian hiện tại
    
    return records

def gen_class():
    # Danh sách các hạng vé và số lượng ghế dự kiến cho từng hạng
    class_types = ['Economy', 'Business', 'First-Class']
    seat_amounts = {
        'Economy': [150, 180, 200],
        'Business': [40, 50, 30],
        'First-Class': [5, 10, 15],
    }
    priceee = {
        'Economy': [400, 600, 900],
        'Business': [1000, 1500, 2000],
        'First-Class': [4000, 3000, 5000]
    }

    # Khởi tạo giá trị idClassFlight bắt đầu từ 13
    id_class_flight = 13

    # Tạo câu lệnh SQL để chèn dữ liệu vào bảng classflight
    sql_values = []

    for id_flight in range(5, 84):  # idFlight từ 5 đến 83
        for class_type in class_types:
            # Số ghế cho mỗi loại hạng
            seat_amount = seat_amounts[class_type][random.randint(0, 2)]
            seat_booked_count = int (seat_amount * random.random())
            price = priceee[class_type][random.randint(0, 2)] * 1000
            
            # Tạo giá trị cho mỗi bản ghi
            value = f"({id_class_flight}, '{class_type}', {seat_amount}, {seat_booked_count}, {price}, {id_flight})"
            sql_values.append(value)
            
            # Tăng idClassFlight sau mỗi lần insert
            id_class_flight += 1

    # In câu lệnh SQL
    print("INSERT INTO qairline.classflight (idclassFlight, class, seatAmount, seatBooked, currentPrice, idFlight) VALUES")
    print(",\n".join(sql_values) + ";")

# Tạo 100 bản ghi
# start_date = '2024-12-17 00:00:00'
# end_date = '2024-12-22 23:59:59'
# num_records = 500

# flight_records = generate_flight_records(start_date, end_date, num_records)
# print(len(flight_records))
# # In SQL script
# print("INSERT INTO flight (timeStart, timeEnd, idbeginAirport, idendAirport, idAirplane, idAdmin_created) VALUES")
# print(",\n".join(flight_records) + ";")
gen_class()