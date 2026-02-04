import {
  Box, Divider, Typography,
} from '@mui/material';

function PriceTableV2() {
  return (
    <Box maxWidth="md" mx="auto">
      <Box>
        <Typography
          variant="h4"
          fontSize={30}
          fontWeight={300}
          align="center"
          component="h2"
        >
          Órajegy
        </Typography>
        <Divider />
        <Box mt={2} mb={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 Alkalom Jóga, Pilates</Typography>
            <Typography fontWeight={500}>4000ft</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 Alkalom Chair Dance</Typography>
            <Typography fontWeight={500}>4000ft</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 Alkalom Balett</Typography>
            <Typography fontWeight={500}>4000ft</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          fontSize={30}
          fontWeight={300}
          align="center"
          component="h2"
        >
          Bérlet
        </Typography>
        <Divider />
        <Box mt={2} mb={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>3 alkalmas mini bérlet</Typography>
            <Typography fontWeight={500}>11.000ft</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>5 alkalmas bérlet</Typography>
            <Typography fontWeight={500}>17.500ft</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>10 alkalmas bérlet</Typography>
            <Typography fontWeight={500}>32.500ft</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          fontSize={30}
          fontWeight={300}
          align="center"
          component="h2"
        >
          Egyéni óra
        </Typography>
        <Divider />
        <Box mt={2} mb={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 alkalom</Typography>
            <Typography fontWeight={500}>18.000ft</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>4 alkalmas bérlet</Typography>
            <Typography fontWeight={500}>64.000ft</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PriceTableV2;
