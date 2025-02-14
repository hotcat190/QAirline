import { Airport } from "../models/model.js";

export const getAirport = async (req, res) => {
  const { idAirport } = req.query;

  try {
    if (idAirport) {
      const airport = await Airport.findOne({
        where: { idAirport },
      });

      if (!airport) {
        return res.status(404).send("Airport not found");
      }

      res.send(airport);
    } else {
      const airports = await Airport.findAll();
      res.send(airports);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};
