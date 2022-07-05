import {
  Box, Container, Divider, Typography,
} from '@mui/material';
import About from './About';
import Contact from './Contact';

function Home() {
  return (
    <>
      <Box
        component="div"
        sx={{
          backgroundImage:
            'url(https://www.peerspace.com/resources/wp-content/uploads/yoga-studio-scaled.jpeg)',
          width: '100%',
          height: '80vh',
          maxHeight: '700px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h2" align="center" component="h1" gutterBottom>
          Yoga Studio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste
          eum perferendis vel dicta adipisci animi earum est hic sunt quis ex
          excepturi quibusdam reprehenderit asperiores nostrum dignissimos,
          vitae dolorum!
        </Typography>

        <Box my={4} width="100%" pt="66.66%" position="relative" overflow="hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            src="https://www.youtube.com/embed/JC5iwJri06M"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Container>

      <Divider variant="middle" />

      <About />
      <Contact />
    </>
  );
}

export default Home;
