import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
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
