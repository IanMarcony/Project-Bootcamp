import { Router } from "express";
import { parseISO } from "date-fns";

import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";

const appointmentsRouter = Router();

appointmentsRouter.get("/appointments", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.status(200).json(appointments);
});

appointmentsRouter.post("/appointments", async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
