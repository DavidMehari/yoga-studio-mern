import { ticketsService } from '../services';

export const ticketsController = {
  async get(req, res, next) {
    try {
      const tickets = await ticketsService.getAllTicket();
      return res.status(200).json({ tickets });
    } catch (error) {
      return next(error);
    }
  },
};
