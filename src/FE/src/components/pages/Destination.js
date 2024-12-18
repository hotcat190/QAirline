import './Destination.css';
import AirportSearch from '../MainContent/AirportSearch';
import { useState, useEffect, useRef } from 'react';

function Destination() {
    const formatDate = (date) => {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const startAirportInputRef = useRef(null);
    const endAirportInputRef = useRef(null);
    const budgetRef = useRef(null);

    const [ airports, setAirports ] = useState([]);
    const [ idBeginAirport, setIdBeginAirport ] = useState(null);
    const [ idEndAirport, setIdEndAirport ] = useState(null);
    const [ id2Destination, setId2Destination ] = useState({});
    const [ data, setData ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ budget, setBudget ] = useState("");

    const [ currentPage, setCurrentPage ] = useState(1);  // Trang hiện tại
    const [ flightsPerPage ] = useState(6); // Số chuyến bay mỗi trang

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const res = await fetch("https://qairline.onrender.com/api/airport/");
                if (!res.ok) throw new Error("Failed to fetch airport data!");
                const result = await res.json();

                setAirports(result);
                const airportMap = result.reduce((acc, airport) => {
                    acc[ airport.idairport ] = airport.city;
                    return acc;
                }, {});
                setId2Destination(airportMap);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchAirports();
    }, []);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await fetch("https://qairline.onrender.com/api/flight");
                const flights = await res.json();

                const flightWithPrices = await Promise.all(
                    flights.map(async (flight) => {
                        const flightInfo = await fetch(
                            `https://qairline.onrender.com/api/flight/getInfo?idFlight=${flight.idFlight}`
                        );
                        const infoData = await flightInfo.json();
                        const economyPrice = infoData.classes?.Economy?.currentPrice || 0;

                        return {
                            idflight: flight.idFlight,
                            from: flight.beginAirport.id,
                            to: flight.endAirport.id,
                            date: formatDate(flight.timeStart),
                            price: economyPrice,
                            thumb_image: "img/pd_1.jpg",
                        };
                    })
                );

                setData(flightWithPrices);
                setFilteredData(flightWithPrices);
            } catch (error) {
                console.error("Error fetching flights: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);

    const filterFlights = () => {
        let filtered = data;

        if (idBeginAirport) {
            filtered = filtered.filter(flight => flight.from === idBeginAirport);
        }

        if (idEndAirport) {
            filtered = filtered.filter(flight => flight.to === idEndAirport);
        }

        if (budget) {
            filtered = filtered.filter(flight => flight.price <= budget);
        }

        setFilteredData(filtered);
    };

    const handleSelectAirport = (type, id) => {
        if (type === "Start") {
            setIdBeginAirport(id);
        } else {
            setIdEndAirport(id);
        }
    };

    useEffect(() => {
        filterFlights();
    }, [ idBeginAirport ]);

    useEffect(() => {
        filterFlights();
    }, [ idEndAirport ]);

    useEffect(() => {
        filterFlights();
    }, [ budget ]);

    // Tính các chuyến bay cần hiển thị trong trang hiện tại
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = filteredData.slice(indexOfFirstFlight, indexOfLastFlight);

    // Chuyển đến trang tiếp theo
    const paginateNext = () => {
        if (currentPage < Math.ceil(filteredData.length / flightsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Chuyển đến trang trước
    const paginatePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="destination-container">
            <div className="content">
                <h2 className="pd-title">
                    Flights with cost-effective prices to popular destinations
                </h2>
                <form className="search-popular-destination">
                    <div className="input-group">
                        <span className="icon">
                            <i className="fa-solid fa-plane-departure"></i>
                        </span>
                        <AirportSearch
                            airports={airports}
                            type="Start"
                            idOther={idEndAirport}
                            onSelectAirport={handleSelectAirport}
                            inputRef={startAirportInputRef}
                            nextInputRef={endAirportInputRef}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">
                            <i className="fa-solid fa-plane-arrival"></i>
                        </span>
                        <AirportSearch
                            airports={airports}
                            type="End"
                            idOther={idBeginAirport}
                            onSelectAirport={handleSelectAirport}
                            inputRef={endAirportInputRef}
                            nextInputRef={budgetRef}
                        />
                    </div>
                    <div className="common-search-destination">
                        <div className="block-select">
                            <div className="icon">
                                <img src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/icon/budget.svg" alt="" />
                            </div>
                            <input
                                type="number"
                                className="form-control"
                                id="ldp-price-block-ldp-2"
                                placeholder="Maximum budget (VNĐ)"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                ref={budgetRef}
                            />
                        </div>
                    </div>
                </form>

                {loading ? (
                    <div style={{ marginTop: "20%" }}>
                        <img src='img/loading.gif' style={{ display: "block", width: "100px", height: "auto", margin: "0 auto" }} />
                        <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
                    </div>
                ) : (
                    <div>
                        <div className="destination-grid">
                            {currentFlights.map((item, index) => (
                                <div className="card" key={index}>
                                    <img src={item.thumb_image} className='thumb' alt="Flight" />
                                    <div className="card-top">
                                        <p className="route">
                                            <i className="fa-solid fa-plane-departure"></i>
                                            <strong>{id2Destination[ item.from ]}</strong>
                                            <br />
                                            <i className="fa-solid fa-plane-arrival"></i>
                                            <strong>{id2Destination[ item.to ]}</strong>
                                        </p>
                                        <p className="date-des">Departure Date: {item.date}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <p className="price">
                                            Price from<br />
                                            <span>{item.price / 1000}.000 VNĐ</span>
                                        </p>
                                        <p className="type-flight">Eco/One way</p>
                                    </div>
                                    <button className="book-now">Book Now</button>
                                </div>
                            ))}
                        </div>
                        <div className="pagination" style={{margin: "20px 0px", float: "right"}}>
                            <button onClick={paginatePrev} disabled={currentPage === 1} style={{minWidth: "80px", background: "rgb(224, 54, 54)", padding: "10px 20px",
                            color: "white", borderRadius: "10px"}}>
                                Previous
                            </button>
                            <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredData.length / flightsPerPage)} style={{minWidth: "80px", background: "rgb(224, 54, 54)", padding: "10px 20px",
                            color: "white", borderRadius: "10px", marginLeft: "10px"}}>
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Destination;
