import { col } from "sequelize";
import {
  Customer,
  Ticket,
  ClassFlight,
  Flight,
  Airport,
} from "../models/model.js";

export const getInfo = async (req, res) => {
  const { idCustomer } = req.user;

  try {
    const customer = await Customer.findOne({
      attributes: ["username", "email", "numberPhone"],
      where: {
        idCustomer: idCustomer,
      },
    });

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const changeInfo = async (req, res) => {
  const { idCustomer } = req.user;
  const { username, email, numberPhone } = req.body;

  try {
    const [updatedRows] = await Customer.update(
      { username, email, numberPhone },
      {
        where: { idCustomer },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).send("Customer not found");
    }

    res.send("Change info customer success");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getTickets = async (req, res) => {
  const { idCustomer } = req.user;

  try {
    const tickets = await Ticket.findAll({
      attributes: [
        "idTicket",
        "idClassFlight",
        "code",
        "price",
        "status",
        "created_at",
        [col("ClassFlight.class"), "class"],
        [col("ClassFlight.Flight.timeStart"), "timeStart"],
        [col("ClassFlight.Flight.beginAirport.name"), "airportBeginName"],
        [col("ClassFlight.Flight.endAirport.name"), "airportEndName"],
      ],
      include: [
        {
          model: ClassFlight,
          as: "ClassFlight",
          attributes: [],
          include: [
            {
              model: Flight,
              as: "Flight",
              attributes: [],
              include: [
                {
                  model: Airport,
                  as: "beginAirport",
                  attributes: [],
                },
                {
                  model: Airport,
                  as: "endAirport",
                  attributes: [],
                },
              ],
            },
          ],
        },
        {
          model: Customer,
          as: "Customer",
          attributes: [],
          where: { idCustomer },
        },
      ],
    });

    if (!tickets || tickets.length === 0) {
      return res.status(404).send("No tickets found");
    }

    res.send(tickets);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};
