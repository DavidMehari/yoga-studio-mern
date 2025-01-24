import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Box, CardActionArea, Divider, Link,
} from '@mui/material';
import { getAllLessonTypes } from '../helpers/utils';
import LessonTypeDetailed from '../components/LessonTypeDetailed';

function About() {
  const [lessonTypes, setLessonTypes] = useState([]);
  const [detailedLessonTypeOpen, setDetailedLessonTypeOpen] = useState(false);
  const [selectedLessonType, setSelectedLessonType] = useState({});

  useEffect(() => {
    getAllLessonTypes().then((result) => {
      if (result.lessonTypes?.length) {
        setLessonTypes(result.lessonTypes.filter((lessonType) => !lessonType?.hidden));
      }
      console.log(lessonTypes);
    });
  }, []);

  useEffect(() => {
    console.log(lessonTypes);
  }, [lessonTypes]);

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
                A Stúdió megálmodója, az oldal tulajdonosa, Hatha Jóga oktató,
                Aerial Yoga Trapeze oktató, Gerinctréner
              </Typography>
              <Typography>
                Bár közgazdászként végeztem, de valójában soha nem dolgoztam a
                szakmámban. A sport természetesen folyamatosan az életem része
                volt, de amikor a jogával találkoztam először sajnos a stressz
                is. Többet kerestem mint mozgás. A jóga ezt adta meg nekem, hogy
                ki tudtam kapcsolni az elmémet a folyamatos gondolkozást,
                agyalást. És ekkor tudatosult bennem az is, hogy gyakorlatilag
                egész általános iskolás koromtól kezdve csak ültem, merev
                voltam, gerinc ferdülésem is kialukult a mindennapos helytelen
                testtartastól. Hálás vagyok hogy időben életem részévé vált a
                jóga, mert sokat ad a minden napokban is. Mind fizikálisan mind
                mentálisan. A jóga számomra az egyik leghatékonyabb módszer
                arra, hogy a testet és az elmét egyensúlyba hozzuk, miközben
                erősítjük a testtudatosságot és a jelenlétet. Az óráimon a
                hangsúly a légzésre, a helyes testtartásra és a finom mozgásokra
                kerül, hogy mindenki saját tempójában, biztonságosan
                fejlődhessen. Az órák nemcsak a fizikai erőnlétet javítják,
                hanem segítenek a mentális feszültségek oldásában is. Ha
                szeretnéd felfedezni a jóga mélyebb világát, vagy ha csupán egy
                kis pihenésre és feltöltődésre van szükséged a hétköznapokban,
                szeretettel várlak az óráimra.
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
                Gávai Nancy vagyok, világutazó lélek, aki szereti a határokat
                feszegetni – legyen az a jógaszőnyegen vagy az életben! 5+ éve
                tanítok air jógát gyerekeknek és felnőtteknek, szeretem a
                kreativitást a mindennapokba csempészni. Erasmus+ és Campus
                Mundi ösztöndíjas kalandjaim során Spanyolországban és
                Portugáliában szereztem életre szóló élményeket Ha szereted a
                jógát, a kreativitást és az inspiráló beszélgetéseket, itt jó
                helyen jársz!
              </Typography>
              <Typography mt={2}>
                Foglalás:
                {' '}
                <Link
                  href="https://nancyyoga.booked4.us/public/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://nancyyoga.booked4.us/public/
                </Link>
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
                objectPosition: 'top',
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
                // objectPosition: { sm: 'center', md: '0px -100px' },
                width: '100%',
                height: { xs: '100%', sm: 500, md: 400 },
              }}
              src="/trainers/anita-yoga-about.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography variant="h5" component="h2">
                Bodó Anita
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Hatha & flow jógaoktató, Pránajámaoktató növendék
              </Typography>
              <Typography>
                Mindig is szenvedélyesen szerettem mozogni. Versenyszerűen
                karatéztam, ami mellé szerettem volna egy lágyabb mozgásformát
                is beiktatni az életembe. Akkor azt hittem, a jóga csak nyújtózó
                mozdulatokból áll, meg egy pár perc néma csendben történő
                ülésből. Hatalmasat tévedtem. Igazából ez a legjobb tévedés, ami
                történhetett velem. Azóta a saját gyakorlásaim mellett heti
                rendszerességgel oktathatom a jógát és építhetem a szívemnek
                kedves Cup of Moon közösséget. Folyamatosan képzem magam, hogy a
                tudásom legjavát adhassam a gyakorlóknak. Az óráimon kiemelt
                figyelmet kap a megfelelő mobilizáció, a preventív ászana
                gyakorlás és a pránajámák - légzőgyakorlatok. Szívügyem, hogy
                egy mély levegővétellel mindenki felfedezhesse, hogy a jóga a
                szőnyegen túl kezdődik csak igazán. Hiszek a közös fejlődésben
                és a közösség erejében, ezért a közös jógás utunkat különböző
                jógás programokkal, workshopokkal és rendezvényekkel igyekszem
                színesíteni. Ha csatlakoznál erre a közös utazásra, sok
                szeretettel várlak az óráimra!
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider variant="middle" />

        <Grid container spacing={4} justifyContent="center" my={4}>
          <Grid item xs={12} sm={6} md={6} order={{ xs: 2, sm: 1 }}>
            <Box>
              <Typography variant="h5" component="h2">
                Ida Dávid-Liktor
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Hatha jóga oktató
              </Typography>
              <Typography>
                Ida vagyok, több éve lelkes yogi, jógaoktató, egy két éves
                kisfiú anyukája. Szeretek kísérletezni, új dolgokat tanulni,
                imádok szervezni és élményeket gyüjteni. A jógás utam elején a
                dinamikus vinyasa volt a kedvencem, azóta a slow flow és a yin
                ad a legtöbbet. Célom hogy akárhol is tartasz a saját jógás
                utadon, tudjalak kísérni, inspirálni, hogy a rendszeres
                jógagyakorlás a napjaid része legyen és a jóga kisétáljon az
                életedbe is.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} order={{ xs: 1, sm: 2 }}>
            <Box
              component="img"
              sx={{
                maxHeight: 500,
                objectFit: 'cover',
                // objectPosition: '0px -100px',
                width: '100%',
                height: { xs: '100%', sm: 500, md: 400 },
              }}
              src="/trainers/ida-yoga-about.jpeg"
            />
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
