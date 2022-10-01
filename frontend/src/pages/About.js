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

      {/* <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" component="h2" gutterBottom>
          Oktatóink
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Magasan képzett szakemberek, akik folyamatosan képzik
          magukat a szinvonalasabb oktatás elérése érdekében.
        </Typography>
      </Container> */}

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center" my={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              component="img"
              sx={{
                maxHeight: 500,
                objectFit: 'cover',
                objectPosition: { sm: 'center', md: '0px -100px' },
                width: '100%',
                height: { xs: '100%', sm: 500, md: 400 },
              }}
              src="/trainers/eniko-yoga-about.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box>
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
                is. Többet kerestem mint mozgás. A jóga ezt adta meg nekem, hogy
                ki tudtam kapcsolni az elmémet a folyamatos gondolkozást,
                agyalást. És ekkor tudásult bennem az is, hogy gyakorlatilag
                egész általános iskolás koromtól kezdve csak ültem, merev
                voltam, gerinc ferdülésem is kialukult a mindennapos helytelen
                testtartastól. Hálás vagyok hogy időben életem részévé vált a
                jóga, mert sokat a minden napokban is. Mind fizikálisan mind
                mentálisan. Ha te is már eljutottál oda, hogy változtatni
                szeretnél és érzed hogy többre van szükséged jelentkezz be
                hozzám valamelyik órámra.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider variant="middle" />

        <Grid container spacing={4} justifyContent="center" my={4}>
          <Grid item xs={12} sm={6} md={6} order={{ xs: 2, sm: 1 }}>
            <Box>
              <Typography variant="h5" component="h2">
                Gávai Nancy
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Ösztöndíjas Jógaoktató, Mesterdiplomás Testnevelő Tanár
              </Typography>
              <Typography>
                Ahogy sokan mások, én sem találtam a helyem, ebben a nyüzsgő,
                rohanó világban. Aztán elkezdődött valami. Egyetemi éveim alatt,
                ösztöndíj program keretein belül elutaztam a Kanári-szigetekre,
                ahol egy évet töltöttem. Itt ismerkedtem meg a Jógával és a
                Meditációval. Hatalmas, pozitív változás következett be az
                életembe. Ezután éreztem, hogy oktatni és fejlődni szeretnék.
                Több éve érzem, hogy a Világnak szüksége van fejlődésre, lelki &
                testi szinten is. Ezért is nyitotta meg kapuit a Nancy Yoga •
                EGER.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} order={{ xs: 1, sm: 2 }}>
            <Box
              component="img"
              sx={{
                maxHeight: 500,
                objectFit: 'cover',
                // objectPosition: { sm: 'center', md: '0px -100px' },
                width: '100%',
                height: { xs: '100%', sm: 500, md: 400 },
              }}
              src="/trainers/nancy-yoga-about.jpg"
            />
          </Grid>
        </Grid>

        <Divider variant="middle" />

        <Grid container spacing={4} justifyContent="center" my={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              component="img"
              sx={{
                maxHeight: 500,
                objectFit: 'cover',
                // objectPosition: '0px -100px',
                width: '100%',
                height: { xs: '100%', sm: 500, md: 400 },
              }}
              src="/trainers/brigi-yoga-about.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography variant="h5" component="h2">
                Vizslán Brigitta
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Gyermekjóga oktató
              </Typography>
              <Typography>
                Két gyermekes anyuka vagyok, emellett már évek óta gyerekekkel
                dolgozom. Kilenc évig óvodában dolgoztam, nagyon szeretem a
                gyerekek társaságát, és úgy gondolom, hogy nagyon könnyen
                megtalálom velük a közös hangot. Jelenleg gyermektáborok
                szervezésével és a jógával foglalkozom. Anya- Lánya illetve
                gyermekjóga órákat tartok. A gyerekek nagyon szívesen játszanak
                és mozognak egyszerre, így könnyedèn sajátítják el a jógázás
                örömét, tanulják meg az állatok utánzásával a jóga ászanákat. A
                rendszeres jógázás testi, lelki , szellemi szinten egyaránt
                megalapozzák a kicsik egészséges èletèt. Szeretettel várok
                minden jógázni vágyó gyereket!
              </Typography>
            </Box>
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
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
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
