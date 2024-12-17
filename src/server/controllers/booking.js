import { col } from "sequelize";
import { sequelize } from "../models/config.model.js";
import { ClassFlight, Ticket, Flight, Airport, Customer } from "../models/model.js";

export const bookTicket = async (req, res) => {
  const { idCustomer } = req.user;
  const { idClassFlight } = req.body;

  if (!idClassFlight) {
    return res.status(400).json({ message: "idClassFlight is required." });
  }

  const transaction = await sequelize.transaction();

  try {
    const classFlight = await ClassFlight.findOne({
      where: { idClassFlight },
      attributes: ["seatBooked", "seatAmount", "currentPrice"],
      transaction,
    });

    if (!classFlight) {
      throw new Error("Hạng vé không tồn tại.");
    }

    const { seatBooked, seatAmount, currentPrice } = classFlight;

    if (seatBooked >= seatAmount) {
      throw new Error("Không còn ghế trống trong hạng vé này.");
    }

    const [updateResult] = await ClassFlight.update(
      {
        seatBooked: seatBooked + 1,
      },
      {
        where: { idClassFlight },
        transaction,
      }
    );

    if (updateResult === 0) {
      throw new Error("Không thể cập nhật số lượng ghế.");
    }

    const ticket = await Ticket.create(
      {
        idClassFlight,
        idCustomer,
        price: currentPrice,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      message: "Đặt vé thành công.",
      ticketId: ticket.id,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({
      message: error.message || "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

export const getTicketByCode = async (req, res) => {
  const { code } = req.query;

  try {
    const infoTicket = await Ticket.findOne({
      attributes: [
        "idTicket",
        [col("classFlight.idclassFlight"), "idClassFlight"],
        [col("classFlight.class"), "class"],
        "code",
        "price",
        "status",
        "created_at",
        [col("ClassFlight.Flight.timeStart"), "timeStart"],
        [col("ClassFlight.Flight.beginAirport.name"), "airportBeginName"],
        [col("ClassFlight.Flight.endAirport.name"), "airportEndName"],
      ],
      where: { code },
      include: [
        {
          model: ClassFlight,
          required: true,
          include: [
            {
              model: Flight,
              required: true,
              include: [
                {
                  model: Airport,
                  required: true,
                  as: "beginAirport",
                },
                {
                  model: Airport,
                  required: true,
                  as: "endAirport",
                },
              ],
            },
          ],
        },
      ],
    });
    res.send(infoTicket);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: ClassFlight,
          required: true,
          attributes: ['class'],
          include: [
            {
              model: Flight,
              required: true,
              attributes: ['idFlight', 'timeStart'],
              include: [
                {
                  model: Airport,
                  as: 'beginAirport',
                  attributes: ['city'],
                },
                {
                  model: Airport,
                  as: 'endAirport',
                  attributes: ['city'],
                },
              ]
            },
          ]
        },
        {
          model: Customer,
          required: true,
          attributes: ['username']
        }
      ]
    }).then(ticket => ticket.flat(1));
    res.send(tickets);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
