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
          Talaj Jóga
        </Typography>
        <Divider />
        <Box mt={2} mb={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 alkalom</Typography>
            <Typography fontWeight={500}>3 700.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>5 alkalas bérlet</Typography>
            <Typography fontWeight={500}>16 000.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>10 alkalas bérlet</Typography>
            <Typography fontWeight={500}>30 000.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Egyéni Jóga / Páros Jóga</Typography>
            <Typography fontWeight={500}>14 000.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Egyéni Jóga / Páros Jóga 4 alkalas bérlet</Typography>
            <Typography fontWeight={500}>48 000.-</Typography>
          </Box>
          <Typography fontWeight={300} mt={2} align="center">
            Az 5 alkalmas bérlet 6 hétig, a 10 alkalmas bérlet pedig 11 hétig használható fel.
          </Typography>
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
          Air Yoga
        </Typography>
        <Divider />
        <Box mt={2} mb={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 alkalom</Typography>
            <Typography fontWeight={500}>4 500.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1 alkalom Air Yoga Kids</Typography>
            <Typography fontWeight={500}>3 900.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>4 alkalas bérlet</Typography>
            <Typography fontWeight={500}>15 000.-</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Egyéni Jóga / Páros Jóga</Typography>
            <Typography fontWeight={500}>14 000.-</Typography>
          </Box>
          <Typography fontWeight={300} mt={2} align="center">
            A KIDS bérlet a vásárlás napjától számított 6 hétig érvényes!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PriceTableV2;
