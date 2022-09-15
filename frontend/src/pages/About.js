import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box, CardActionArea, Divider } from '@mui/material';
import { getAllLessonTypes } from '../helpers/utils';
import LessonTypeDetailed from '../components/LessonTypeDetailed';

function About() {
  const [lessonTypes, setLessonTypes] = useState([]);
  const [detailedLessonTypeOpen, setDetailedLessonTypeOpen] = useState(false);
  const [selectedLessonType, setSelectedLessonType] = useState({});

  useEffect(() => {
    getAllLessonTypes().then((result) => setLessonTypes(result.lessonTypes));
  }, []);

  const openLessonTypeDetails = (lessonType) => {
    setDetailedLessonTypeOpen(true);
    setSelectedLessonType(lessonType);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h2" align="center" component="h1" gutterBottom>
          Oktatóink
        </Typography>
        {/* <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto saepe
          enim quia dolor odio quod sequi quisquam autem asperiores? Facilis
          minima quibusdam, velit quae voluptas dolorum deleniti inventore
          maxime perferendis porro praesentium.
        </Typography> */}
      </Container>

      {/* <Box
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
      <Divider variant="middle" /> */}

      <Container maxWidth="md" sx={{ mt: 8 }}>
        {/* <Typography variant="h4" align="center" component="h2" gutterBottom>
          Oktatóink
        </Typography> */}
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Magasan képzett szakemberek, akik természetesen folyamatosan képzik
          magukat a szinvonalasabb oktatás elérése érdekében.
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
                image="/trainers/eniko-yoga-about.jpg"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">
                  Venczel Enikő
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  Vezető, Hatha Jóga oktató, Aerial Yoga Trapeze oktató,
                  Gerinctréner
                </Typography>
                <Typography>
                  Bár közgazdászként végeztem, de valójában soha nem dolgoztam a
                  szakmámban. A sport természetesen folyamatosan az életem része
                  volt, de amikor a jogával találkoztam először sajnos a stressz
                  is. Többet kerestem mint mozgás. A jóga ezt adta meg nekem,
                  hogy ki tudtam kapcsolni az elmémet a folyamatos gondolkozást,
                  agyalást. És ekkor tudásult bennem az is, hogy gyakorlatilag
                  egész általános iskolás koromtól kezdve csak ültem, merev
                  voltam, gerinc ferdülésem is kialukult a mindennapos helytelen
                  testtartastól. Hálás vagyok hogy időben életem részévé vált a
                  jóga, mert sokat a minden napokban is. Mind fizikálisan mind
                  mentálisan. Ha te is már eljutottál oda, hogy változtatni
                  szeretnél és érzed hogy többre van szükséged jelentkezz be
                  hozzám valamelyik órámra.
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
                image="/trainers/nancy-yoga-about.jpg"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">
                  Gávai Nancy
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  Ösztöndíjas Jógaoktató, Mesterdiplomás Testnevelő Tanár
                </Typography>
                <Typography>
                  Ahogy sokan mások, én sem találtam a helyem, ebben a nyüzsgő,
                  rohanó világban. Aztán elkezdődött valami. Egyetemi éveim
                  alatt, ösztöndíj program keretein belül elutaztam a
                  Kanári-szigetekre, ahol egy évet töltöttem. Itt ismerkedtem
                  meg a Jógával és a Meditációval. Hatalmas, pozitív változás
                  következett be az életembe. Ezután éreztem, hogy oktatni és
                  fejlődni szeretnék. Több éve érzem, hogy a Világnak szüksége
                  van fejlődésre, lelki & testi szinten is. Ezért is nyitotta
                  meg kapuit a Nancy Yoga • EGER.
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
                <Typography variant="h5" component="h2">
                  Vizslán Brigitta
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  Gyermekjóga oktató
                </Typography>
                <Typography>
                  8 évig dolgozotam óvodában, most jelenleg gyermek
                  táboroztatással foglalkozom, és e mellett gyermekjóga órákat
                  tartok.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Divider variant="middle" />

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" component="h2" gutterBottom>
          Óráink
        </Typography>
        {/* <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          debitis!
        </Typography> */}
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
                <CardActionArea
                  onClick={() => openLessonTypeDetails(lessonType)}
                  sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
                >

                  <CardMedia
                    height="300px"
                    component="img"
                    image={`${process.env.REACT_APP_BACKEND_URI}/uploads/${lessonType.featuredImage}`}
                    alt={lessonType.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {lessonType.name}
                    </Typography>
                    {/* <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {lessonType.description}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box maxWidth="90%">
          <LessonTypeDetailed
            lessonType={selectedLessonType}
            detailedLessonTypeOpen={detailedLessonTypeOpen}
            setDetailedLessonTypeOpen={setDetailedLessonTypeOpen}
          />
        </Box>
      </Container>
    </>
  );
}

export default About;
