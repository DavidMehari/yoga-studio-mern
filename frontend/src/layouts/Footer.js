import { Box, Typography } from '@mui/material';
import React from 'react';

import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'whitesmoke',
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
            color: 'whitesmoke',
          }}
          component={NavLink}
          to="/"
        >
          <SelfImprovementOutlinedIcon sx={{ fontSize: 100 }} />
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              fontFamily: 'The Nautigal',
              fontWeight: 400,
              letterSpacing: '.1rem',
              textDecoration: 'none',
              color: 'whitesmoke',
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
            Gál Tibor Fúzió
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
