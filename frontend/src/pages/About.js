import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box, Divider } from '@mui/material';
import { getAllLessonTypes } from '../helpers/utils';

function About() {
  const [lessonTypes, setLessonTypes] = useState([]);

  useEffect(() => {
    getAllLessonTypes().then((result) => setLessonTypes(result.lessonTypes));
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h2" align="center" component="h1" gutterBottom>
          Rólunk
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto saepe
          enim quia dolor odio quod sequi quisquam autem asperiores? Facilis
          minima quibusdam, velit quae voluptas dolorum deleniti inventore
          maxime perferendis porro praesentium.
        </Typography>
      </Container>

      <Box
        sx={{
          width: '100%',
          maxWidth: 'sm',
          mx: 'auto',
          my: 6,
        }}
      >
        <Box
          width="100%"
          component="img"
          src="https://freedomgenesis.com/wp-content/uploads/2020/09/woman-in-blue-outfit-doing-yoga.jpeg"
          alt="about-us"
        />
      </Box>
      <Divider variant="middle" />

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" component="h2" gutterBottom>
          Oktatóink
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          eligendi esse dignissimos. Ad repellat dolorem velit in blanditiis
          atque perspiciatis?
        </Typography>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                height="400px"
                component="img"
                image="https://media.istockphoto.com/photos/portrait-of-a-yogi-doing-breathing-exercises-picture-id1336154392?b=1&k=20&m=1336154392&s=170667a&w=0&h=GT8g-Eb7W1dxW_5kpCnPiFsncJ3_hr3CAQ96lNJWhaY="
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Enikő
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, dolores!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                height="400px"
                component="img"
                image="https://vinmec-prod.s3.amazonaws.com/images/20210127_034049_102483_yoga.max-1800x1800.jpg"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Olga
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                  dolore?
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                height="400px"
                component="img"
                image="https://images.dailyhive.com/20211123105420/243879181_10158643651053318_890050781357489990_n.jpg"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Vivien
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolor.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Divider variant="middle" />

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" component="h2" gutterBottom>
          Óratípusok
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, debitis!
        </Typography>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {lessonTypes.map((lessonType) => (
            <Grid key={lessonType._id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  height="300px"
                  component="img"
                  image={lessonType.featuredImage}
                  alt={lessonType.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {lessonType.name}
                  </Typography>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '4',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {lessonType.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default About;
