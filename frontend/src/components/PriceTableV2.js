import { Box, Divider, Typography } from '@mui/material';

function PriceTableV2() {
  return (
    <Box>
      <Box>
        <Typography>Talaj Jóga</Typography>
        <Box>Enikő 1 alkalom - 3000.- 6 alkalas bérlet - 15000.-</Box>
        <Box>Nancy 1 alkalom - 3000.- 5 alkalas bérlet - 14000.-</Box>
      </Box>
      <Divider />
      <Box>
        <Typography>Levegő Jóga</Typography>
        <Box>1 alkalom - 4000.- 6 alkalas bérlet - 22800.-</Box>
      </Box>
      <Divider />
      <Box>
        <Typography>Gyermek Levegő Jóga</Typography>
        <Box>1 alkalom - 3000.- 6 alkalas bérlet - 12500.-</Box>
      </Box>
      <Divider />
      <Box>
        <Typography>Magánóra</Typography>
        <Box>1 alkalom - 8000.- </Box>
      </Box>
    </Box>
  );
}

export default PriceTableV2;
