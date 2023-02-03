import {
  Box, Divider, Grid, Typography,
} from '@mui/material';

function PriceTableV2() {
  return (
    <Box maxWidth="md" mx="auto">
      <Box>
        <Typography variant="h4" fontSize={30} fontWeight={300} align="center" component="h2">Talaj Jóga</Typography>
        <Divider />
        <Grid container spacing={2} align="center" mt={2} mb={3} columnSpacing={{ xs: 8, sm: 20 }}>
          <Grid item xs={6}>
            <Typography variant="h5" fontSize={25} fontWeight={300}>Enikő</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                1 alkalom
              </Typography>
              <Typography fontWeight={500}>
                3500.-
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                5 alkalas bérlet
              </Typography>
              <Typography fontWeight={500}>
                15000.-
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" fontSize={25} fontWeight={300}>Nancy</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                1 alkalom
              </Typography>
              <Typography fontWeight={500}>
                3500.-
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                5 alkalas bérlet
              </Typography>
              <Typography fontWeight={500}>
                15000.-
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h4" fontSize={30} fontWeight={300} align="center" component="h2">Air Yoga</Typography>
        <Divider />
        <Box mt={2} mb={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              1 alkalom
            </Typography>
            <Typography fontWeight={500}>
              4500.-
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              5 alkalas bérlet
            </Typography>
            <Typography fontWeight={500}>
              21500.-
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" fontSize={30} fontWeight={300} align="center" component="h2">Gyermek Air Yoga</Typography>
        <Divider />
        <Box mt={2} mb={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              1 alkalom
            </Typography>
            <Typography fontWeight={500}>
              3500.-
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              5 alkalas bérlet
            </Typography>
            <Typography fontWeight={500}>
              16500.-
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" fontSize={30} fontWeight={300} align="center" component="h2">Yoga Trapaze</Typography>
        <Divider />
        <Box mt={2} mb={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              1 alkalom
            </Typography>
            <Typography fontWeight={500}>
              3500.-
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              5 alkalas bérlet
            </Typography>
            <Typography fontWeight={500}>
              15000.-
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              Kombinált Talaj Jóga + Yoga Trapaze
            </Typography>
            <Typography fontWeight={500}>
              29000.-
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={2} mb={3}>
        <Typography variant="h4" fontSize={30} fontWeight={300} align="center" component="h2">Magánóra</Typography>
        <Typography variant="h4" fontSize={20} fontWeight={300} align="center" component="h3">(Talaj Jóga, Air Yoga, Yoga Trapaze)</Typography>
        <Divider />
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              1 alkalom
            </Typography>
            <Typography fontWeight={500}>
              8000.-
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography fontWeight={300} mt={6} align="center">Bérletek érvényessége: A vásárlástól számított 12 hét.</Typography>
    </Box>
  );
}

export default PriceTableV2;
