import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTickets } from '../helpers/utils';
import PriceTableItem from './PriceTableItem';

function PriceTable() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets().then((result) => setTickets(result.tickets));
  }, []);

  return (
    <Box>
      {tickets?.map((ticket) => <PriceTableItem key={ticket._id} ticket={ticket} />)}
    </Box>
  );
}

export default PriceTable;
