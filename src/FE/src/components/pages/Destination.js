import './Destination.css';

function Destination() {
    const data = [
        { from: "Tp. Hồ Chí Minh (SGN)", to: "Bali (DPS)", date: "17/01/2025", price: "1.000", thumb_image: "img/pd_1.jpg"},
        { from: "Hà Nội (HAN)", to: "Tokyo (NRT)", date: "20/01/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Đà Nẵng (DAD)", to: "Seoul (ICN)", date: "15/02/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        // Add 9 more similar objects here
        { from: "Tp. Hồ Chí Minh (SGN)", to: "Singapore (SIN)", date: "30/01/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Tp. Hồ Chí Minh (SGN)", to: "Bangkok (BKK)", date: "28/01/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Hà Nội (HAN)", to: "Kuala Lumpur (KUL)", date: "12/02/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Đà Nẵng (DAD)", to: "Hong Kong (HKG)", date: "18/03/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Hồ Chí Minh (SGN)", to: "Sydney (SYD)", date: "05/04/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Hà Nội (HAN)", to: "Paris (CDG)", date: "21/03/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Đà Nẵng (DAD)", to: "New York (JFK)", date: "01/05/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Tp. Hồ Chí Minh (SGN)", to: "Dubai (DXB)", date: "11/03/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
        { from: "Hà Nội (HAN)", to: "Berlin (BER)", date: "30/03/2025", price: "1.000", thumb_image: "img/pd_1.jpg" },
    ]
    return (
        <div className="destination-container">
            <div className="content">
                <h2 className="pd-title">
                    Flights with cost-effective prices to popular destinations
                </h2>
                <div className="search-popular-destination">
                    <div class="common-search-destination">
                        <div class="block-select">
                            <div class="icon">
                                <img src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/icon/flight.svg" alt="" />
                            </div>
                            <select class="form-control" id="ldp-origin-block-ldp-2">
                                <option value="">Start destination</option>
                                <option value="">Sydney</option>
                                <option value="">Italia</option>
                            </select>
                        </div>
                    </div>

                    <div class="common-search-destination">
                        <div class="block-select">
                            <div class="icon"><img src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/icon/destination.svg" alt="" /></div>
                            <select class="form-control" id="ldp-origin-block-ldp-2">
                                <option value="">End destination</option>
                                <option value="">Sydney</option>
                                <option value="">Italia</option>
                            </select>
                        </div>
                    </div>

                    <div class="common-search-destination">
                        <div class="block-select"><div class="icon">
                            <img src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/icon/budget.svg" alt="" />
                        </div>
                            <input type="text" class="form-control" id="ldp-price-block-ldp-2" placeholder="Maximum budget" />
                        </div>
                    </div>
                </div>
                <div className="destination-grid">
                    {data.map((item, index) => (
                        <div className="card" key={index}>
                            <a><img src={item.thumb_image} className='thumb'/></a>
                            <div className="card-top">
                                <p className="route">
                                <i class="fa-solid fa-plane-departure"></i>
                                    <strong>{item.from}</strong>
                                    <br />
                                    <i class="fa-solid fa-plane-arrival"></i>
                                    <strong>{item.to}</strong>
                                </p>
                                <p className="date-des">Departure Date: {item.date}</p>
                            </div>
                            <div className="card-bottom">
                                <p className="price">
                                    Price from 
                                    <br /><span>${item.price}</span>
                                </p>
                                <p className="type-flight">Eco / One way</p>
                            </div>
                            <button className="book-now">Book Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Destination;