const airportCoordinates = {
    "SGN": { latitude: 10.8188, longitude: 106.6519 },   // Tan Son Nhat International Airport
    "HAN": { latitude: 21.2212, longitude: 105.8067 },   // Noi Bai International Airport
    "DAD": { latitude: 16.0439, longitude: 108.1991 },   // Da Nang International Airport
    "CXR": { latitude: 12.0096, longitude: 109.2194 },   // Cam Ranh International Airport
    "SIN": { latitude: 1.3644, longitude: 103.9915 },    // Changi Airport
    "ICN": { latitude: 37.4691, longitude: 126.4505 },   // Incheon International Airport
    "GMP": { latitude: 37.5583, longitude: 126.7906 },   // Seoul Gimpo International Airport
    "KUL": { latitude: 2.7456, longitude: 101.7099 },    // Kuala Lumpur International Airport
    "HKG": { latitude: 22.3080, longitude: 113.9185 },   // Hong Kong International Airport
    "BKK": { latitude: 13.6900, longitude: 100.7501 },   // Suvarnabhumi Airport
    "NRT": { latitude: 35.7656, longitude: 140.3853 },   // Narita International Airport
    "HND": { latitude: 35.5523, longitude: 139.7798 },   // Tokyo Haneda Airport
    "LAX": { latitude: 33.9416, longitude: -118.4085 },  // Los Angeles International Airport
    "JFK": { latitude: 40.6413, longitude: -73.7781 },   // John F. Kennedy International Airport
    "LHR": { latitude: 51.4700, longitude: -0.4543 },    // Heathrow Airport
    "CDG": { latitude: 49.0097, longitude: 2.5479 },     // Charles de Gaulle Airport
    "AMS": { latitude: 52.3105, longitude: 4.7683 },     // Amsterdam Schiphol Airport
    "BER": { latitude: 52.3667, longitude: 13.5033 },    // Berlin Brandenburg Airport
    "DXB": { latitude: 25.2532, longitude: 55.3657 },    // Dubai International Airport
    "DOH": { latitude: 25.2731, longitude: 51.6086 },    // Hamad International Airport
    "SFO": { latitude: 37.6213, longitude: -122.3790 },  // San Francisco International Airport
    "MIA": { latitude: 25.7959, longitude: -80.2870 },   // Miami International Airport
    "SYD": { latitude: -33.9399, longitude: 151.1753 },  // Sydney Kingsford Smith Airport
    "AKL": { latitude: -37.0082, longitude: 174.7850 },  // Auckland Airport
    "MAN": { latitude: 53.3656, longitude: -2.2724 },    // Manchester Airport
    "ZRH": { latitude: 47.4647, longitude: 8.5491 },     // Zurich Airport
    "VIE": { latitude: 48.1107, longitude: 16.5701 },    // Vienna International Airport
    "CPH": { latitude: 55.6180, longitude: 12.6556 },    // Copenhagen Airport
    "BRU": { latitude: 50.9010, longitude: 4.4844 },     // Brussels Airport
    "OSL": { latitude: 60.1939, longitude: 11.1004 },    // Oslo Gardermoen Airport
    "ARN": { latitude: 59.6498, longitude: 17.9238 },    // Stockholm Arlanda Airport
    "LIS": { latitude: 38.7742, longitude: -9.1342 },    // Lisbon Portela Airport
    "MAD": { latitude: 40.4983, longitude: -3.5676 },    // Madrid Barajas Airport
    "FCO": { latitude: 41.7999, longitude: 12.2462 },    // Rome Fiumicino Airport
    "IST": { latitude: 41.2753, longitude: 28.7519 },    // Istanbul Airport
    "ATH": { latitude: 37.9364, longitude: 23.9475 },    // Athens International Airport
    "CAI": { latitude: 30.1206, longitude: 31.4056 },    // Cairo International Airport
    "CPT": { latitude: -33.9694, longitude: 18.6017 },   // Cape Town International Airport
    "GIG": { latitude: -22.8090, longitude: -43.2506 },  // Rio de Janeiro International Airport
    "GRU": { latitude: -23.4356, longitude: -46.4731 },  // Sao Paulo/Guarulhos International Airport
    "HPH": { latitude: 20.8194, longitude: 106.7250 },   // Cat Bi International Airport
    "VCA": { latitude: 10.0852, longitude: 105.7110 },   // Can Tho International Airport
    "PQC": { latitude: 10.1698, longitude: 103.9931 },   // Phu Quoc International Airport
    "VDO": { latitude: 21.1176, longitude: 107.4140 },   // Van Don International Airport
    "VVH": { latitude: 10.7769, longitude: 106.7009 },   // Thoi Loi Airport
    "UIH": { latitude: 14.0036, longitude: 109.0459 },   // Quang Binh/Dong Hoi Airport
    "HUI": { latitude: 16.4015, longitude: 107.7005 },   // Hue Phu Bai International Airport
    "PXU": { latitude: 14.0045, longitude: 108.0161 },   // Pleiku Airport
    "VKG": { latitude: 9.9526, longitude: 105.1326 },    // Rach Gia Airport
    "BMV": { latitude: 12.6683, longitude: 108.1206 },   // Buon Ma Thuot Airport
    "VCL": { latitude: 15.4033, longitude: 108.7065 },   // Chu Lai Airport
};

// Function to retrieve coordinates for a given airport code
export function getCoordinates(airportCode) {
    return airportCoordinates[airportCode] || { latitude: null, longitude: null };
}
  