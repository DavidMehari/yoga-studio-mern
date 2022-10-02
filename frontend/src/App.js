import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Helmet } from 'react-helmet';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Timetable from './pages/Timetable';
import MyBookings from './pages/MyBookings';
import Prices from './pages/Prices';
import AddLesson from './pages/admin/AddLesson';
import AllBookings from './pages/admin/AllBookings';
import theme from './helpers/theme';
import About from './pages/About';
import Contact from './pages/Contact';
import EditLesson from './pages/admin/EditLesson';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/admin/AdminRoute';
import NotImplementedYet from './pages/NotImplementedYet';
import AllLessons from './pages/admin/AllLessons';
import AddLessonType from './pages/admin/AddLessonType';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Helmet>
          {/* Primary Meta Tags */}
          <title>Fusion Yoga Stúdió</title>
          <meta name="title" content="Fusion Yoga Stúdió" />
          <meta name="description" content="Modern Jóga Stúdió Eger szívében. Egyéni, csoportos, talaj és levegő jóga órákkal várunk szinte a hét minden napján." />
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fusionyogastudio.com/" />
          <meta property="og:title" content="Fusion Yoga Stúdió" />
          <meta property="og:description" content="Modern Jóga Stúdió Eger szívében. Egyéni, csoportos, talaj és levegő jóga órákkal várunk szinte a hét minden napján." />
          <meta property="og:image" content="https://fusionyogastudio.com/studio/fusion-yoga-studio.jpg" />
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://fusionyogastudio.com/" />
          <meta property="twitter:title" content="Fusion Yoga Stúdió" />
          <meta property="twitter:description" content="Modern Jóga Stúdió Eger szívében. Egyéni, csoportos, talaj és levegő jóga órákkal várunk szinte a hét minden napján." />
          <meta property="twitter:image" content="https://fusionyogastudio.com/studio/fusion-yoga-studio.jpg" />
          {/* Google / Search Engine Tags */}
          <meta itemProp="name" content="Fusion Yoga Stúdió" />
          <meta itemProp="description" content="Modern Jóga Stúdió a belváros szívében. Egyéni, csoportos, talaj és levegő jóga órákkal várunk szinte a hét minden napján." />
          <meta itemProp="image" content="https://fusionyogastudio.com/studio/fusion-yoga-studio.jpg" />
        </Helmet>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/my-bookings" element={<MyBookings />} />

              <Route element={<AdminRoute />}>
                <Route path="/admin/bookings" element={<AllBookings />} />
                <Route path="/admin/lessons" element={<AllLessons />} />
                <Route path="/admin/add-lesson" element={<AddLesson />} />
                <Route path="/admin/add-lesson-type" element={<AddLessonType />} />
                <Route path="/admin/edit-lesson/:lessonId" element={<EditLesson />} />
              </Route>
            </Route>
            <Route path="*" element={<NotImplementedYet />} />
          </Routes>
        </Main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
