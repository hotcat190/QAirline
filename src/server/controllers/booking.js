import { col } from "sequelize";
import { sequelize } from "../models/config.model.js";
import {
  ClassFlight,
  Ticket,
  Flight,
  Airport,
  Notification,
} from "../models/model.js";

const sendNotification = async (
  idCustomer,
  className,
  idFlight,
  amount,
  tickets
) => {
  try {
    const ticketCodes = tickets.map((ticket) => ticket.code).join(", ");

    const content = `Bạn đã đặt thành công chuyến bay có số hiệu QA${idFlight} hạng vé ${className} với tổng số ${amount} vé. Mã vé của bạn: ${ticketCodes}`;

    await Notification.create({
      content,
      type: "ticket",
      idCustomer,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      message: "Đặt vé thành công nhưng không thể gửi thông báo.",
    });
  }
};

export const bookTicket = async (req, res) => {
  const { idCustomer } = req.user;
  let { idClassFlight, amount } = req.body;

  if (!idClassFlight) {
    return res.status(400).json({ message: "idClassFlight is required." });
  }

  amount = amount || 1;

  const transaction = await sequelize.transaction();

  try {
    const classFlight = await ClassFlight.findOne({
      where: { idClassFlight },
      attributes: [
        "class",
        "seatBooked",
        "seatAmount",
        "currentPrice",
        "idFlight",
      ],
      transaction,
    });

    if (!classFlight) {
      throw new Error("Hạng vé không tồn tại.");
    }

    const {
      class: className,
      seatBooked,
      seatAmount,
      currentPrice,
      idFlight,
    } = classFlight;

    if (seatBooked === seatAmount) {
      await transaction.rollback();
      return res
        .status(409)
        .send({ message: "Không còn ghế trống trong hạng vé này." });
    } else if (seatBooked + amount > seatAmount) {
      await transaction.rollback();
      return res.status(409).send({ message: "Số ghế còn lại không đủ." });
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

    const ticketsData = Array.from({ length: amount }, (_, i) => ({
      idClassFlight,
      idCustomer,
      price: classFlight.currentPrice,
      code: `QA${classFlight.idFlight}-C${idClassFlight}-S${
        classFlight.seatBooked + i + 1
      }`,
    }));

    // Tạo tất cả vé trong một lần
    const tickets = await Ticket.bulkCreate(ticketsData, {
      transaction,
      returning: true,
    });

    const ticketId = tickets.map((ticket) => ticket.idTicket);

    await transaction.commit();

    sendNotification(idCustomer, className, idFlight, amount, tickets);
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
          attributes: [],
          include: [
            {
              model: Flight,
              attributes: [],
              include: [
                {
                  model: Airport,
                  attributes: [],
                  as: "beginAirport",
                },
                {
                  model: Airport,
                  attributes: [],
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
