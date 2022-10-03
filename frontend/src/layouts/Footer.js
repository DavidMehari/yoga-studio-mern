import { Box, Button, Typography } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';

import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { NavLink } from 'react-router-dom';

const ContactEmailHref = lazy(() => import('../components/ContactEmailHref'));

function Footer() {
  const [showingEmail, setShowingEmail] = useState(false);

  const email = showingEmail ? (
    <ContactEmailHref />
  ) : (
    <Button onClick={() => setShowingEmail(true)} variant="outlined" color="inherit">Email megjelenítése</Button>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.main',
        // color: 'whitesmoke',
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        px: 5,
        py: 7,
        alignItems: 'center',
      }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
          }}
          component={NavLink}
          to="/"
        >
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
              color: 'black',
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
              alignItems: 'center',
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
      <Typography
        variant="body2"
        component="div"
        textTransform="capitalize"
        width="100%"
        textAlign="center"
        fontWeight={200}
      >
        {`© ${new Date().getFullYear()} All rights reserved`}
      </Typography>
    </Box>
  );
}

export default Footer;
