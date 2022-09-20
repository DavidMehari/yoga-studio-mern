# DavidMehari-masterwork

# Yoga studio

## 1. Az alkalmazásról

### 1.1 Célja
A weboldal célja egy yoga studio adminisztrációs folyamatainak megkönnyítése. A felhasználók egyszerűen be tudnak jelentkezni az órákra és visszaigazolást kapnak foglalásukról. Az oktatók egy helyen megtalálják az összes fontos információt az óráikról és az órákon résztvevőkről.

### 1.2 Az oldal működése
A regisztrált felhasználó rendelkezik egy saját profillal, mellyel jogosultá válik az órán helyet foglalni magának és további nem regisztrált felhasználóknak.
Az oktatók maguk alakíthatják órarendjüket, meghatározva az adott óra fő jellemzőit. 

### 1.3 Az oldal felépítése
Minden látogató számára elérhető oldalak:
- Főoldal: csak általános információkat tartalmaz az oldallal kapcsolatban 
- Órarend: egy naptár, ahol az elérhető órák jelennek meg - a foglaláshoz regisztráció szükséges.
- Rólunk: A yoga studio és az oktatók története
- Kapcsolat: A yoga stuido elérhetőségeit tartalmazza kapcsolati űrlappal és interaktív térképpel
- Registráció: űrlap, melynek segítségével a vendég felhasználóvá válhat.
- Bejelentkezés: a regisztrált felhasználók ezen az oldalon tudnak bejelentkezni

Bejelentkezett felhasználók számára elérhető oldalak:
- Foglalás: űrlap melynek segítségével a felhasználó helyet biztosít magának az órán.
- Foglalásaim: Ezen a felületen a regisztrált felhasználó a saját fogalalásait látja

Bejelentkezett adminok (oktatók) számára elérhető oldalak:
- Óráim: Az oktató aktuális óráinak listája a bejelentkezett felhasználók listájával, lehetőség új órák hozzáadására
- Új óra: Az adminoknak lehetősége van új órák felvitelére
- Foglalások: Az adinok itt megtalálják az összes beérkezett foglalást szűrhető listában. A foglalást lemondhatják vagy akár vissza is állíthatják, valamint változtathatnak a résztvevők számán.

### 1.4 Felhasználók jogosultság szerint
- Vendég:
  - tud nézelődni az oldalon, böngészni az órák között, de foglalni nem tud
    
- Regisztrált felhasználó:
  - hozzáfér a foglalási felülethez
  - meg tudja nézni a foglalásait
  - változtatni tud a foglalásain

- Admin / oktató:
  - hozzáfér az órákhoz
  - létrehozhat új órát
  - változtathat adott órán
  - létrehozhat új foglalást
  - változtathat adott foglaláson

## 2. Alkalmazott technológiák
#### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token
- Docker
- Nodemailer

#### Frontend
- React
- MUI

#### API dokumentáció
- OpenAPI/Swagger

#### Tesztelés
- Jest

## 3. Az alkalmazás indítása

1. Alkalmazás által használt kulcsok:
- [MailTrap a NodeMailerhez](https://mailtrap.io/)
- [Mongo DB](https://www.mongodb.com)
- [Google Client Id & Maps API Key](https://console.cloud.google.com/apis/)
2. Hozz létre egy `.env` fájlt a `.env.example` alapján a `backend` mappában
3. Hozz létre egy `.env fájlt` a `.env.example` alapján a `frontend` mappában
4. Ebben a mappában állva írd be a terminálba, hogy `docker compose build`
5. Miután lefutott a parancs, indítsd el az alkalmazást a `docker compose up`-pal
6. Példaadatok feltöltése a `backend` mappaban kiadott `npm run loadData`
7. Yoga Studio Frontend elérése: http://localhost:3000/
8. Open API dokumentáció elérése: http://localhost:4000/
9. Példaadatok feltöltése után az Admin hozzáférés: Email: `a@a.com` Jelszó: `asdasdasd`

## 4. PORT-ok

Az alkalmazás indítása után:
- Backend url: 8080
- Frontend PORT: 3000
- API dokumnetáció PORT: 4000
