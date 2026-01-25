import { useState } from 'react';
import {
  Box,
  Chip,
  Container,
  Divider,
  Dialog,
  Grid,
  Typography,
} from '@mui/material';

const bukkImage = '/retreats/bukkszentkereszt-joga-elvonulas.jpeg';

const orebicImage = '/retreats/orebic-joga-tabor-horvat.jpeg';

function Retreats() {
  const [openImage, setOpenImage] = useState('');

  const handleOpenImage = (src) => setOpenImage(src);
  const handleCloseImage = () => setOpenImage('');

  const renderImage = (src) => (
    <Box
      component="img"
      src={src}
      alt="Elvonulás galéria"
      onClick={() => handleOpenImage(src)}
      sx={{
        width: '100%',
        height: 'auto',
        maxHeight: 400,
        objectFit: 'contain',
        cursor: 'zoom-in',
      }}
    />
  );

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Typography
        variant="h3"
        align="center"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 400 }}
      >
        Elvonulások
      </Typography>

      <Box sx={{
        mt: 4, mb: 6, justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2,
      }}
      >
        <Typography variant="body" sx={{ fontWeight: 300 }}>
          Közelgő elvonulások
        </Typography>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center',
        }}
        >
          <Chip
            component="a"
            href="#retreat-bukk"
            clickable
            label="Jóga elvonulás Bükkszentkereszt — 2026. február 13.-15."
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.06)',
              color: 'text.primary',
              fontWeight: 500,
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.12)' },
            }}
          />
          <Chip
            component="a"
            href="#retreat-orebic"
            clickable
            label="Jóga Tábor Orebic, Horvátország — 2026. június 13–20."
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.06)',
              color: 'text.primary',
              fontWeight: 500,
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.12)' },
            }}
          />
        </Box>
      </Box>

      <Box id="retreat-bukk" sx={{ mt: 4, scrollMarginTop: { xs: 120, md: 88 } }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            {renderImage(bukkImage)}
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 400 }}>
              Jóga elvonulás Bükkszentkereszt
            </Typography>
            <Typography variant="subtitle" gutterBottom color="text.secondary">
              2026. február 13.-15.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" paragraph>
              Ez nem csak egy “Jóga Hétvége”. Ez egy reset a testednek, az
              idegrendszerednek és a lelkednek.
            </Typography>
            <Typography variant="body2" paragraph>
              🌲 Egy hétvége, ahol végre leteheted a terheidet. Ha hónapok óta azt
              érzed, hogy fáradt vagy, túl sok a zaj, a rohanás, és szeretnél végre
              egy olyan helyre menekülni, ahol megáll az idő… akkor ez a
              jógaelvonulás neked szól.
            </Typography>
            <Typography variant="body2" paragraph>
              A Bükk egyik legegyedibb völgykatlanában, távol a világtól, csendben,
              gyógyító energiák között töltünk együtt 3 napot. Egy kis létszámú,
              meghitt közösségben, ahol valóban te vagy a középpontban.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          🧘‍♀️ A hétvége vezetője:
        </Typography>
        <Typography variant="body2" paragraph>
          Venczel Enikő
          <br />
          Hatha jóga oktató • Női jóga oktató • Gerinctréner
        </Typography>
        <Typography variant="body2" paragraph>
          Finom női energiájú órák a biztonságról, a test meghallásáról és a
          szelíd, mély megérkezésről szólnak. Itt a gyakorlás nem csak
          mozdulatok sorozata lesz, hanem belső utazás — vissza önmagadhoz.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          ✨ Mi teszi különlegessé ezt az elvonulást?
        </Typography>
        <Typography variant="body2" paragraph>
          Nem a programok sokasága… Hanem a tér, amit közösen teremtünk.
        </Typography>
        <Typography variant="body2" paragraph>
          • lassú reggelek, nem rohanunk
          <br />
          • puha, gyógyító jógagyakorlások
          <br />
          • elvonulás a természetbe: Gyógyító kövek, kilátó
          <br />
          • csend, amire a városban vágyakozol
          <br />
          • meleg, otthonos, női energiájú közeg
          <br />
          • csak 10 fő — valódi figyelem, valódi jelenlét
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          🧘‍♂️ Mi vár rád?
        </Typography>
        <Typography variant="body2" paragraph>
          🌞 Reggeli Energizáló Jóga — Frissítő, tisztító gyakorlás, amivel
          beindítjuk a belső fényt.
          <br />
          🌙 Esti Yin jóga & Hangtálas ellazulás — Mély oldás, amely átöblíti a
          nap feszültségeit.
          <br />
          ✨ Légzésmeditáció — Megérkezés a jelen pillanatba.
          <br />
          🌌 Jóga Nidra — Ideg­rendszeri újrahangolás — 1 óra, amely felér egy
          mély alvással.
          <br />
          🌲 Erdőjárás — Kapcsolódás a Bükk tiszta energiájához, gyógyító
          pontjaihoz.
          <br />
          🍃 Vegetáriánus ételek — Lágy, tápláló finomságok — a test is pihen.
          <br />
          🔥 Szauna & Dézsafürdő — Melegedés, lazulás, testi-lelki ellazulás.
          <br />
          🌱 Szappankészítő workshop — Kreatív, örömteli női rituálé.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          💚 Kinek szól?
        </Typography>
        <Typography variant="body2" paragraph>
          Annak a nőnek, aki…
        </Typography>
        <Typography variant="body2" paragraph>
          • túl sokat vállal
          <br />
          • fáradt, leterhelt
          <br />
          • túlhajtott, feszült
          <br />
          • változásra vágyik
          <br />
          • szeretne újra kapcsolódni önmagához
          <br />
          • vágyik egy szeretetteljes térre
          <br />
          • szeretne töltekezni a természetben
        </Typography>
        <Typography variant="body2" paragraph>
          Ha magadra ismertél, akkor ez a hétvége a te időd.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          🏡 Szállás & ellátás
        </Typography>
        <Typography variant="body2" paragraph>
          Csendes, hangulatos vendégház 2–3–5 ágyas szobákkal. Teljes ellátás:
          reggeli + meleg leves ebéd + vacsora + egész nap gyógynövénytea.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          💸 Árak
        </Typography>
        <Typography variant="body2" paragraph>
          Részvételi díj: 👉 109.000 Ft / fő
          <br />
          Páros kedvezmény (ha barátnőddel, anyukáddal vagy pároddal érkezel):
          👉 99.000 Ft / fő
          <br />
          Max. 10 fő – valódi minőség, személyes jelenlét.
          <br />
          Jelentkezés: 40.000 Ft előleggel
          <br />
          Lemondás érkezés előtt 2 héttel díjmentes.
          <br />
          SZÉP kártya elfogadás — érdeklődj!
          <br />
          Utazás: egyénileg vagy telekocsival (segítünk szervezni).
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          📩 Jelentkezés és infó
        </Typography>
        <Typography variant="body2" paragraph>
          E-mail: vencyy@gmail.com
          <br />
          Telefon: +36 70 70 37123
        </Typography>
        <Typography variant="body2" paragraph>
          🌱 Lassulj le. Lélegezz. Kapcsolódj — önmagadhoz, a természethez, az
          élethez.
        </Typography>

      </Box>

      <Box sx={{ my: 6 }}>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.35)', borderBottomWidth: 2 }} />
        <Divider sx={{ mt: 1, borderColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1 }} />
      </Box>

      <Box id="retreat-orebic" sx={{ mt: 2, scrollMarginTop: { xs: 120, md: 88 } }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            {renderImage(orebicImage)}
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 400 }}>
              🌊 Jóga Tábor Orebic, Horvátország
            </Typography>
            <Typography variant="subtitle" gutterBottom color="text.secondary">
              2026. június 13–20.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" paragraph>
              Egy hét, ahol a lélek fellélegzik, a test megújul, a tenger pedig
              hazahív.
            </Typography>
            <Typography variant="body2" paragraph>
              Képzeld el, ahogy a nap első sugarai lágyan felmelegítenek, miközben a
              friss tengeri szellő végigsimítja az arcod. A hullámok halk morajlása
              adja a háttérzenét, te pedig minden lélegzetvétellel beszippantod a
              sós levegőt, kilélegzed a stresszt – és érzed, ahogy egyre könnyebb,
              szabadabb, békésebb leszel.
            </Typography>
            <Typography variant="body2" paragraph>
              Gyere velünk egy varázslatos, egyhetes tengerparti jóga táborba, ahol
              a kikapcsolódás, a feltöltődés és a tenger közelsége biztosított. A
              hullámok ritmusára mozdulunk, együtt gyakorlunk, és olyan élményekkel
              gazdagodunk, amelyek hosszan velünk maradnak.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          ⭐ Mi vár rád?
        </Typography>
        <Typography variant="body2" paragraph>
          • Napi 2 jógaóra
          <Box component="span" sx={{ display: 'block', pl: 3 }}>
            • Reggeli napüdvözletek és légzőgyakorlatok a mólón, a tenger hangjával
          </Box>
          <Box component="span" sx={{ display: 'block', pl: 3 }}>
            • Naplemente jóga, mély relaxáció és hangfürdő
          </Box>
          • Reggeli futás a parton
          • Mindfulness séták a tengerparton
          • Könnyű túrák, fakultatív vízi programok
          • Feltöltődés, természetközelség, saját tempó — semmi rohanás
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          ⭐ Kinek ajánlott?
        </Typography>
        <Typography variant="body2" paragraph>
          • Kezdőknek és haladóknak
          <br />
          • Akik szeretnének kiszakadni a hétköznapok mókuskerekéből
          <br />
          • Akik szeretik a nyugalmat, a tengert és a természetet
          <br />
          • Akik testi-lelki megújulásra vágynak
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          ⭐ Mit ad a tábor?
        </Typography>
        <Typography variant="body2" paragraph>
          • Teljes testi-lelki feltöltődés
          <br />
          • Mély relaxáció és stresszoldás
          <br />
          • Szuper közösségi élmény
          <br />
          • Kiegyensúlyozottság, új energia és inspiráció
          <br />
          • Egy hét, amit soha nem felejtesz el
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          🌍 Helyszínek, amelyeket érintünk
        </Typography>
        <Typography variant="body2" paragraph>
          🌱🌳 Bosznia-Hercegovina:
        </Typography>
        <Typography variant="body2" paragraph>
          • Szarajevó
          <br />
          • Konjic
          <br />
          • Mostar
        </Typography>
        <Typography variant="body2" paragraph>
          🌊🪸🐠⛴️🌴 Horvátország:
        </Typography>
        <Typography variant="body2" paragraph>
          • Orebic
          <br />
          • Dubrovnik
          <br />
          • Korčula (Kurcula)
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          ⭐ Szállás és ellátás
        </Typography>
        <Typography variant="body2" paragraph>
          • 1 éjszaka Szarajevóban
          <br />
          • A további éjszakák Orebicben, csendes, 2 fős apartmanokban, a
          parttól mindössze 3 perc sétányira
        </Typography>
        <Typography variant="body2" paragraph>
          🍽 Étkezés Orebicben: Reggeli + vacsora, húsos és vegetáriánus
          opciókkal
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          💸 A tábor ára
        </Typography>
        <Typography variant="body2" paragraph>
          180.000 Ft/fő + 40.000 Ft/fő utazási költség (amennyiben nem egyénileg
          történik az utazás)
          <br />
          Az ár nem tartalmazza a belépőket, kompjegyeket, valamint az első napi
          étkezést Szarajevóban.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          🎁 Early Bird kedvezmény
        </Typography>
        <Typography variant="body2" paragraph>
          Foglalj december 31-ig és -10% kedvezményt kapsz a tábor árából! Ne
          maradj le – a helyek gyorsan betelnek!
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
          📩 Érdeklődés & jelentkezés, részletes program küldése
        </Typography>
        <Typography variant="body2" paragraph>
          Írj üzenetet: vencyy@gmail.com
        </Typography>
        <Typography variant="body2" paragraph>
          Bármilyen kérdés esetén keress bizalommal. 🩵
        </Typography>

      </Box>

      <Dialog fullScreen open={!!openImage} onClose={handleCloseImage}>
        <Box
          onClick={handleCloseImage}
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          {openImage && (
            <Box
              component="img"
              src={openImage}
              alt="Elvonulás fotó"
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Dialog>
    </Container>
  );
}

export default Retreats;
