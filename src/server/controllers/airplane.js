import { Airplane } from "../models/model.js";

export const getAirplane = async (req, res) => {
  const { idAirplane } = req.query;

  try {
    if (idAirplane) {
      const airplane = await Airplane.findOne({
        where: idAirplane,
      });

      if (!airplane) return res.status(404).send("Airplane not found!");

      res.send(airplane);
    } else {
      const airplanes = await Airplane.findAll();

      res.send(airplanes);
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};
