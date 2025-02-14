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

export const addAirplane = async (req, res) => {
  const { code, type, capacity, status } = req.body;

  try {
    const airplane = await Airplane.create({ code, type, capacity, status });
    res.send(airplane);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

export const updateAirplane = async (req, res) => {
  const { idAirplane } = req.params;
  const { code, type, capacity, status } = req.body;

  try {
    const airplane = await Airplane.update({ code, type, capacity, status }, { where: { idAirplane } });
    res.send(airplane);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

export const deleteAirplane = async (req, res) => {
  const { idAirplane } = req.params;

  try {
    const airplane = await Airplane.destroy({ where: { idAirplane } });
    res.send(airplane);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

export const getAllAirplane = async (req, res) => {
  try {
    const airplanes = await Airplane.findAll();
    res.send(airplanes);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

export const getAirplaneCount = async (req, res) => {
  try {
    const airplaneCount = await Airplane.count();
    res.status(200).send({airplaneCount: airplaneCount});
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}