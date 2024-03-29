import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

function Contact() {
  return (
    <>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h2" align="center" component="h1" gutterBottom>
          Kapcsolat
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 2,
          px: 2,
          py: 2,
          alignItems: 'center',
        }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SelfImprovementOutlinedIcon sx={{ fontSize: 100 }} />
            <Typography
              variant="h4"
              sx={{
                display: 'flex',
                fontFamily: 'The Nautigal',
                fontWeight: 400,
                letterSpacing: '.1rem',
                textDecoration: 'none',
              }}
            >
              Yoga Studio
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end',
          }}
          >
            <Typography
              variant="h5"
              fontWeight={200}
              py={2}
            >
              Yoga Studio
            </Typography>

            <Typography
              variant="subtitle1"
              component="div"
              textTransform="capitalize"
              textAlign="right"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                lineHeight: 1.4,
                fontWeight: 200,
              }}
            >
              <LocationOnIcon fontSize="small" />
              Nyugati tér 18. I.emelet 6
              <br />
              1045 Budapest
            </Typography>

            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                fontWeight: 200,
              }}
            >
              <LocalPhoneIcon fontSize="small" />
              +36 30 343 6542
            </Typography>

            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                fontWeight: 200,
              }}
            >
              <EmailIcon fontSize="small" />

              yogastudio@gmail.com
            </Typography>

          </Box>
        </Box>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={8} md={5}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Map />
          </Grid>

        </Grid>
      </Container>

    </>
  );
}

export default Contact;
