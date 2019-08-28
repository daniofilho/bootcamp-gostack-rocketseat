import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

// controller para exibir apenas horários disponíveis
class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // converte a data que veio
    const searchDate = Number(date);
    console.log(startOfDay(searchDate));
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        // canceled_at: null,
        /* date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        }, */
      },
    });

    return res.json(appointments);
  }
}
export default new AvailableController();
