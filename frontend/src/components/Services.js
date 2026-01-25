import {
  Box, Button, Container, Grid, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const classTypes = [
  {
    title: 'Jóga',
    body: 'Hatha jóga: gyakorlása elsősorban testtartásokból (ászanákból), légzőgyakorlatokból (pránájáma) és relaxációból áll. Az ászanák segítenek erősíteni az izmokat, javítani a testtartást, növelni a hajlékonyságot és támogatni a belső szervek működését. A tudatos légzés megnyugtatja az idegrendszert, fokozza az energiaszintet és segít a stressz csökkentésében. A „ha” szó a napenergiát, a „tha” pedig a holdenergiát jelképezi, utalva arra, hogy a Hatha jóga a bennünk lévő ellentétes erők – aktivitás és nyugalom – egyensúlyát keresi.',
  },
  {
    title: 'Pilates',
    body: 'Hamarosan...',
  },
  {
    title: 'Tánc',
    body: 'A tánc a mozgás, az önkifejezés és a testtudatosság találkozása. Az órákon elsajátított koreográfiák egyszerre formálnak, erősítenek és felszabadítanak, miközben a nőiesség megélése is központi szerepet kap. Nem a tökéletességet keresünk, hanem kapcsolódást a testhez és önmagadhoz.',
  },
];

function Services() {
  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Typography variant="h2" align="center" component="h1" gutterBottom paddingBottom={4}>
        Szolgáltatásaink
      </Typography>
      <Grid container spacing={3}>
        {classTypes.map((item) => (
          <Grid key={item.title} item xs={12} md={4} sx={{ padding: 0 }}>
            <Box
              sx={{
                height: '100%',
                padding: 1,
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h3" paddingBottom={2}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={item.body.startsWith('Hamarosan') ? { fontStyle: 'italic' } : undefined}
              >
                {item.body}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button to="/timetable" component={Link} variant="contained">
          Foglalás
        </Button>
      </Box>
    </Container>
  );
}

export default Services;
