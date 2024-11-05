import React from "react";
import "./Clients.css";

function Clients() {
    return (
        <div className="clients">
        <div className="content">
          <img src="img/book.svg" alt="" className="book" width="60px" />
          <img src="img/main_plane.jpeg" alt="" className="main-plane" />
          <div className="list-clients">
            <a
              href="https://www.singaporeair.com/en_UK/vn/home?gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0csn5tN4MmyjjLYdn7XS7p_5Q0GmY7mG8nuymmbZdqfqZZKW06WaQBlMaAianEALw_wcB&gclsrc=aw.ds#/book/bookflight"
              target="_blank"
            >
              <img src="img/Singapore_Airlines_Logo.svg" alt="" />
            </a>
            <a
              href="https://www.emirates.com/vn/english/book/?utm_source=google&utm_medium=cpc&utm_campaign=GGS_VN_EN_Brand_Pure___VN_E&gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0csnIhrLferNE8yEFbiKUFCrxuQtgSHEAuxTUUrODaTyGibtIdAD0-dAaAlgQEALw_wcB&gclsrc=aw.ds"
              target="_blank"
            >
              <img src="img/emirates.png" alt="" />
            </a>
            <a
              href="https://www.turkishairlines.com/en-int/index.html?gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0cskJVg7lNvE4vzdhFjzBsaC-t3lzrbI8gwbSceC0ZNlq62GsCCwaUJYaAsGdEALw_wcB"
              target="_blank"
            >
              <img src="img/turkish.svg" alt="" />
            </a>
            <a href="https://www.swiss.com/xx/en/homepage" target="_blank">
              <img src="img/Swiss_new.svg.png" alt="" />
            </a>
            <a href="https://www.vietravelairlines.com/vn/en" target="_blank">
              <img src="img/vietravelairlines.svg" alt="" />
            </a>
            <a
              href="https://www.malaysiaairlines.com/vn/en/promotions/time-for-kolkata.html?cid=gpm|VN1024TFK|goo|tac|pmax|pros|vn||en|campaign|mab|awa&gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0csk2fn89DPrnRckSxyyDc9TKMvonDxMYyhqubZIH1hUgOU085L1m7aEaArk3EALw_wcB"
              target="_blank"
            >
              <img src="img/malaysia-airlines.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    )
}

export default Clients; 