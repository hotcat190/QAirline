import pool from "../database/database.js";

export const getInfo = async (req, res) => {
  const { idCustomer } = req.user;

  try {
    const [info] = await pool.query(
      "SELECT username, email FROM customer WHERE idCustomer = ?",
      idCustomer
    );
    res.send(info);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const changeInfo = async (req, res) => {
  const { idCustomer } = req.user;
  const { username, email } = req.body;

  try {
    await pool.query(
      "UPDATE customer SET username = ?, email = ? WHERE idCustomer = ?",
      [username, email, idCustomer]
    );
    res.send("Change info customer success");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getTickets = async (req, res) => {
  const { idCustomer } = req.user;

  try {
    const query = `SELECT 
                      ticket.idTicket,
                      idclassFlight,
                      cf.class,
                      ticket.code,
                      ticket.price,
                      ticket.status,
                      ticket.created_at,
                      flight.timeStart,
                      ap1.name AS airportBeginName,
                      ap2.name AS airportEndName
                    FROM 
                        customer
                    JOIN 
                        ticket USING(idCustomer)
                    JOIN 
                        classFlight AS cf USING(idclassFlight)
                    JOIN 
                        flight USING(idFlight)
                    JOIN 
                        airport AS ap1 ON flight.idbeginAirport = ap1.idairport
                    JOIN 
                        airport AS ap2 ON flight.idendAirport = ap2.idairport
                    WHERE 
                        customer.idCustomer = ?;`;
    const [info] = await pool.query(query, idCustomer);

    res.send(info);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};
