import pool from "../database/database.js";

export const getTickets = async (req, res) => {
  const { idCustomer } = req.body;

  try {
    const query = `SELECT 
                        ticket.idTicket,
                        classFlight.idclassFlight,
                        classFlight.class,
                        ticket.price,
                        flight.timeStart,
                        ap1.name AS airportBeginName,
                        ap2.name AS airportEndName
                    FROM 
                        customer
                    JOIN 
                        ticket USING(idCustomer)
                    JOIN 
                        classFlight USING(idclassFlight)
                    JOIN 
                        flight USING(idFlight)
                    JOIN 
                        airport AS ap1 ON flight.beginAirportId = ap1.idairport
                    JOIN 
                        airport AS ap2 ON flight.endAirportId = ap2.idairport
                    WHERE 
                        customer.idCustomer = ?;`;
    const [
      idTickets,
      idclassFlight,
      classFlight,
      price,
      timeStart,
      airportBegin,
      airportEnd,
    ] = await pool.query(query, idCustomer);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};
