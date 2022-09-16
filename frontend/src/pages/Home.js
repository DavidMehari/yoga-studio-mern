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
          // 'url(http://localhost:8080/uploads/20220819_114247_0000.png)',
          width: '100%',
          height: '80vh',
          maxHeight: '700px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Container maxWidth="md" sx={{ my: 5 }}>
        <Typography variant="h2" align="center" component="h1">
          Fusion Yoga Studio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          component="h2"
          mb={3}
          fontWeight={300}
          color="text.secondary"
        >
          Modern Jóga Stúdió a belváros szívében
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          my={6}
        >
          Egyéni, csoportos, talaj és levegő jóga órákkal várunk szinte a hét
          minden napján.
        </Typography>

        {/* <Divider variant="middle" /> */}

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          my={3}
        >
          &quot;A jóga olyan fény, amely ha egyszer kigyúl, sosem halványul el. Minél
          többet gyakoroljuk annál ragyogóbb lesz.&quot; B.K.S Iyengar
        </Typography>

        {/* <Divider variant="middle" /> */}

        {/* <Box
          my={4}
          width="100%"
          pt="66.66%"
          position="relative"
          overflow="hidden"
        >
          <iframe
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            src="https://www.youtube.com/embed/JC5iwJri06M"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box> */}
      </Container>

      <Divider variant="middle" />

      <About />
      <Contact />
    </>
  );
}

export default Home;
