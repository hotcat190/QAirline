import { col } from "sequelize";
import { sequelize } from "../models/config.model.js";
import { ClassFlight, Ticket, Flight, Airport } from "../models/model.js";

export const bookTicket = async (req, res) => {
  const { idCustomer } = req.user;
  const { idClassFlight, amount } = req.body;

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

    if (seatBooked === seatAmount) {
      throw new Error("Không còn ghế trống trong hạng vé này.");
    } else if (seatBooked + amount > seatAmount) {
      throw new Error("Số ghế còn lại không đủ.");
    }

    const [updateResult] = await ClassFlight.update(
      {
        seatBooked: seatBooked + amount,
      },
      {
        where: { idClassFlight },
        transaction,
      }
    );

    if (updateResult === 0) {
      throw new Error("Không thể cập nhật số lượng ghế.");
    }

    const ticketsData = Array.from({ length: amount }, () => ({
      idClassFlight,
      idCustomer,
      price: currentPrice,
    }));

    // Tạo tất cả vé trong một lần
    const tickets = await Ticket.bulkCreate(ticketsData, {
      transaction,
      returning: true,
    });

    // Lấy danh sách ID từ các vé đã tạo
    const ticketId = tickets.map((ticket) => ticket.idTicket);

    await transaction.commit();

    res.status(201).json({
      message: "Đặt vé thành công.",
      ticketId: ticketId,
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
