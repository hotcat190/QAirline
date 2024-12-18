import './Destination.css';
import AirportSearch from '../MainContent/AirportSearch';
import { useState, useEffect, useRef } from 'react';
import PassengerSelector from '../MainContent/PassengerSelector';
import { useNavigate } from "react-router-dom";

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

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ flightsPerPage ] = useState(6);

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

    const airport2Image = {
        1: 'https://www.mundoasiatours.com/wp-content/uploads/2019/05/Ho-Chi-Minh-City.jpg',
        2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIGov6MU0isXR9PCy8IR8brtYJp0YT7K13rA&s',
        3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHy4ufLdqKtdzZ_ez55O7gpHhBm-SyMUX6Q&s',
        4: 'https://t2.ex-cdn.com/crystalbay.com/resize/1860x570/files/content/2024/05/22/du-lich-nha-trang-1-1056.jpeg',
        5: 'https://duhocinec.com/wp-content/uploads/2024/09/dat-nuoc-singapore-01.jpg',
        6: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR02vSSFbxI9eZr3HfH7ONLjiyBUWorrrSwCw&s',
        7: 'https://www.pelago.com/img/destinations/seoul/hero-image-xlarge.webp',
        8: 'https://www.agoda.com/wp-content/uploads/2024/06/Batu-Caves-Kuala-Lumpur-Malaysia.jpg',
        9: 'https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/HongKong3.jpg',
        10: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSehThDFfL4UkAVkgZlFT4KmUkfU-7bt69Fwg&s',
        11: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_SVDLHZgqaiLxkw2z0N8D6vwRhgYJIXAgVJY7XQqKZSyIQUfC0tVV73ay6P47Itb5BhI&usqp=CAU',
        12: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_SVDLHZgqaiLxkw2z0N8D6vwRhgYJIXAgVJY7XQqKZSyIQUfC0tVV73ay6P47Itb5BhI&usqp=CAU',
        13: 'https://www.holidaygenie.com/blog/wp-content/uploads/2018/08/los-angeles-850x459.jpg',
        14: 'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg',
        15: 'https://cdn.pixabay.com/photo/2016/12/11/23/26/london-1900570_1280.jpg',
        16: 'https://as1.ftcdn.net/jpg/06/02/10/24/1000_F_602102439_f7KuHxotZq5H0IeUpicMtfaLZrONztft.webp',
        17: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1200px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
        18: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwwugpkEVFtSq-fMFh4M3lEen-9rxGLKLQw&s',
        19: 'https://media.cnn.com/api/v1/images/stellar/prod/200924183413-dubai-9-1.jpg?q=x_0,y_0,h_900,w_1599,c_fill/h_833,w_1480',
        20: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQthDHtJ5Ky4pAlF7f4nzmrPHvjAPpgeqpArA&s',
        21: 'https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg',
        22: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CiDEh-OeVvdY2PAjv7xFUMxyMpwOHVyG3zoO6rFKKcq80zIjEFpVrulZqbsWNVbr7_I&usqp=CAU',
        23: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/640px-Sydney_Opera_House_-_Dec_2008.jpg',
        24: 'https://content.r9cdn.net/rimg/dimg/09/c2/d0aa16e0-city-2575-166c0a657e0.jpg?width=1366&height=768&xhint=1673&yhint=1229&crop=true',
        25: 'https://etrip4utravel.s3-ap-southeast-1.amazonaws.com/images/article/2021/08/8c9c0f4c-7534-4a36-97ca-64a174da36f4.jpg',
        26: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_WHmDf-8oeH_mA6gQQmXefDFUKmBC_FKkA&s',
        27: 'https://cdn.britannica.com/61/154261-050-3E149111/view-dome-Vienna-St-Peters-pseudo-Gothic-Votive.jpg',
        28: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0PxZQ8__YJUrJW7jB0YbT39N3jtJElaZGQ&s',
        29: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76roYq7vX2gqdnL5a8JSeHfh-oxBWcdqaJw&s',
        30: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5VSe8Uf_kzNa20NRNVVa9hlnNk828QHwiIUrLcYXX6WI_Csf8EzX2ssRSRr6bLx1-Ks&usqp=CAU',
        31: 'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1710588260/dhrmckebzwhdx0akokzd.jpg',
        32: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/50/c7/a6/caption.jpg?w=1200&h=700&s=1&cx=4096&cy=2732&chk=v1_590889ee7dd671bade3e',
        33: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1eAlEGXCzWsPNZl2L-mlPGl2aOYGd94n4BhjBG9VP9dFpyeC24TYEtYPZ-M_onZhncB8&usqp=CAU',
        34: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9W1eqytLv5jclTdtr13a18yaV1Ha05hYa6Q&s',
        35: 'https://content.r9cdn.net/rimg/dimg/66/1f/b1178678-hood-209585-16d8b828ee0.jpg?width=1366&height=768&xhint=1707&yhint=1202&crop=true',
        36: 'https://cdn.britannica.com/66/102266-050-FBDEFCA1/acropolis-city-state-Greece-Athens.jpg',
        37: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEYP63Jvmzox9otE4SPLBQdVlCnkL2zYwWqixOhx9nbhplNpPcnXQ3OIF45N_sC0y-OT4&usqp=CAU',
        38: 'https://img.static-kl.com/images/media/B2B667B6-DC8C-46DA-B9F0A9EBF1877EDE',
        39: 'https://whc.unesco.org/uploads/thumbs/site_1100_0004-750-750-20120625114004.jpg',
        40: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRq7anO8wHTDExWbWklGsOGDSmGkDZJjyv1uL_peF4boZz3e-El31UkHjNnm970OLyWKg&usqp=CAU',
        41: 'https://bcp.cdnchinhphu.vn/334894974524682240/2023/12/3/6c2a27c4e9d617884ec7-1458d2ddfe164132b95ec163ccc8e4ea-1701595864429488932869.jpg',
        42: 'https://ik.imagekit.io/tvlk/blog/2021/11/dia-diem-du-lich-can-tho-cover.jpg?tr=c-at_max',
        43: 'https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2022-10/shutterstock_1660147075.jpg?itok=3T5QSm-o',
        44: 'https://static.vinwonders.com/production/quang-ninh-co-gi-choi-1.jpg',
        45: 'https://www.mundoasiatours.com/wp-content/uploads/2019/05/Ho-Chi-Minh-City.jpg',
        46: 'https://t2.ex-cdn.com/crystalbay.com/resize/1860x570/files/content/2024/05/22/du-lich-nha-trang-1-1056.jpeg',
        47: 'https://statics.vinpearl.com/Dong-Hoi-8_1682439814.jpg',
        48: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCtcO04l769-vDg4qYAJbTObozC4JacoMxjijfRVR9PbUtlr3Y-gWDepKec5AFcV_uGpo&usqp=CAU',
        49: 'https://btnmt.1cdn.vn/2023/06/15/1.jpg',
        50: 'https://www.bambooairways.com/documents/20122/1165110/dia-diem-du-lich-gia-lai-4+%281%29.jpg/55464428-80b2-004a-bb24-cb3dd2833081?t=1695021266985',
        51: 'https://vietnamoriginal-travel.com/upload/images/BLOG/Kien-Giang/the-best-travel-guide-of-kien-giang-vietnam-2023.jpg',
        52: 'https://vhttdl.daklak.gov.vn/CMS/Content/AnhDep/dlk1.jpg',
        53: 'https://vietnam.travel/sites/default/files/inline-images/11125-huybank%40gmail.com-hoi%20an%20ve%20dem%20.jpg'
    };


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
                            thumb_image: airport2Image[ flight.endAirport.id ],
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

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = filteredData.slice(indexOfFirstFlight, indexOfLastFlight);

    const paginateNext = () => {
        if (currentPage < Math.ceil(filteredData.length / flightsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const paginatePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedFlight, setSelectedFlight ] = useState(null);
    const [ error, setError ] = useState(null);

    const [ passengerData, setPassengerData ] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const handlePassengerChange = (updatedPassengers) => {
        setPassengerData(updatedPassengers);
    };

    const passengerSummary = (() => {
        const { adults, children, infants } = passengerData;
        let summary = `${adults} adults`;
        if (children > 0) summary += `, ${children} children`;
        if (infants > 0) summary += `, ${infants} infants`;
        return summary;
    })();

    const openModal = (flightIndex) => {
        setSelectedFlight(flightIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFlight(null);
    };

    const [ flightForwardData, setFlightForwardData ] = useState(null);
    const [ flightBackwardData, setFlightBackwardData ] = useState(null);
    const navigate = useNavigate();
    const handleContinue = async () => {
        const [ month, day, year ] = currentFlights[ selectedFlight ].date.split("/");
        const startMonth = parseInt(month);
        const startDay = parseInt(day);
        const startYear = parseInt(year);
        const idBeginAirport = currentFlights[ selectedFlight ].from;
        const idEndAirport = currentFlights[ selectedFlight ].to;
        const url_forward = `https://qairline.onrender.com/api/flight/searchFlight?day=${startDay}&month=${startMonth}&year=${startYear}&idBeginAirport=${idBeginAirport}&idEndAirport=${idEndAirport}`;
        const startDestination = id2Destination[ idBeginAirport ];
        const endDestination = id2Destination[ idEndAirport ];
        const selectedType = "oneWay"
        console.log(idBeginAirport, idEndAirport, startMonth, startDay, startYear);
        try {
            const response_forward = await fetch(url_forward, { method: "GET" });

            if (response_forward.ok) {
                const data_forward = await response_forward.json();
                console.log(data_forward)
                setFlightForwardData(data_forward);
                navigate("/searchflights", {
                    state: { flightForwardData: data_forward, flightBackwardData: flightBackwardData, startDestination, endDestination, selectedType, passengerSummary },
                });
            } else {
                setError("No flights found or an error occurred.");
            }
        } catch (err) {
            setError("An error occurred: " + err.message);
        } finally {
            //   setLoading(false);
        }
    }


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
                                    <button className="book-now" onClick={() => openModal(index)}>Book Now</button>
                                </div>
                            ))}
                        </div>
                        {isModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Select Passengers</h3>
                                    <PassengerSelector onPassengerChange={handlePassengerChange} />
                                    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                                        <button className="close-modal" onClick={closeModal}>
                                            Close
                                        </button>
                                        <button className='close-modal' onClick={handleContinue}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="pagination" style={{ margin: "20px 0px", float: "right" }}>
                            <button onClick={paginatePrev} disabled={currentPage === 1} style={{
                                minWidth: "80px", background: "rgb(224, 54, 54)", padding: "10px 20px",
                                color: "white", borderRadius: "10px"
                            }}>
                                Previous
                            </button>
                            <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredData.length / flightsPerPage)} style={{
                                minWidth: "80px", background: "rgb(224, 54, 54)", padding: "10px 20px",
                                color: "white", borderRadius: "10px", marginLeft: "10px"
                            }}>
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
