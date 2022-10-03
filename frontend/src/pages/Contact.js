import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { lazy, Suspense, useState } from 'react';
import { Button } from '@mui/material';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

const ContactEmailHref = lazy(() => import('../components/ContactEmailHref'));

function Contact() {
  const [showingEmail, setShowingEmail] = useState(false);

  const email = showingEmail ? (
    <ContactEmailHref />
  ) : (
    <Button onClick={() => setShowingEmail(true)} variant="outlined">Email megjelenítése</Button>
  );

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
                // fontFamily: 'The Nautigal',
                fontFamily: 'Raleway',
                fontWeight: 400,
                letterSpacing: '.1rem',
                textDecoration: 'none',
              }}
            >
              Fusion Yoga Studio
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
              Fusion Yoga Studio
            </Typography>

            <Typography
              variant="subtitle1"
              component="div"
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
              Gál Tibor Fúzió Galéria
              <br />
              Csiky Sándor u. 10
              <br />
              3300, Eger
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
              +36 70 703 7123
            </Typography>

            <Suspense fallback={<>loading...</>}>
              {email}
            </Suspense>

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
