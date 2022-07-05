import Ticket from '../models/Ticket';
import CustomError from '../utils/CustomError';

export const ticketsService = {
  async getAllTicket() {
    try {
      const tickets = await Ticket.find({});
      return tickets;
    } catch (error) {
      throw new CustomError(400, 'Hiba az árak lekérése közben');
    }
  },
};
