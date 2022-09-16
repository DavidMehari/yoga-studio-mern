import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MenuIcon from '@mui/icons-material/Menu';
import UserAuth from '../components/authentication/UserAuth';
import { useUserContext } from '../contexts/UserContext';

const pages = {
  timetable: 'Órarend',
  prices: 'Áraink',
  about: 'Rólunk',
  contact: 'Kapcsolat',
};
const userMenu = ['Foglalásaim', 'Kijelentkezés'];
const adminMenu = ['Foglalások', 'Órák', 'Óra hozzáadása', 'Óratípus hozzáadása', 'Kijelentkezés'];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { activeUser, setActiveUser } = useUserContext();
  const navigate = useNavigate();

  const activeStyleMoblie = {
    color: 'whitesmoke',
    backgroundColor: '#b7e3e5',
    // backgroundColor: '#bac3b8',
    fontWeight: 600,
  };

  const activeStyle = {
    color: 'white',
    backgroundColor: '#a1dadd',
    // color: '#484242',
    // backgroundColor: '#b7e3e5',
    fontWeight: 600,
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {Object.keys(pages).map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton
              component={NavLink}
              to={page}
              style={({ isActive }) => (isActive ? activeStyleMoblie : undefined)}
            >
              <ListItemText primary={pages[page]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenu = (selectedOption) => {
    handleCloseUserMenu();

    switch (selectedOption) {
      case 'Kijelentkezés':
        localStorage.removeItem('userToken');
        setActiveUser(null);
        navigate('/');
        break;
      case 'Foglalásaim':
        navigate('/my-bookings');
        break;
      case 'Foglalások':
        navigate('/admin/bookings');
        break;
      case 'Órák':
        navigate('/admin/lessons');
        break;
      case 'Óra hozzáadása':
        navigate('/admin/add-lesson');
        break;
      case 'Óratípus hozzáadása':
        navigate('/admin/add-lesson-type');
        break;

      default:
        break;
    }
  };

  const renderSecondaryMenu = (menuItems) => menuItems.map((menuItem) => (
    <MenuItem key={menuItem} onClick={() => handleClickUserMenu(menuItem)}>
      <Typography textAlign="center">{menuItem}</Typography>
    </MenuItem>
  ));

  return (
    <>
      <AppBar position="static" sx={{ zIndex: 1 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <SelfImprovementIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }}
            />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'The Nautigal',
                fontWeight: 400,
                letterSpacing: '.1rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Fusion Yoga Studio
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>

            </Box>

            <SelfImprovementIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }}
            />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'The Nautigal',
                fontWeight: 400,
                letterSpacing: '.1rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Fusion Yoga Studio
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                justifyContent: 'flex-end',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {Object.keys(pages).map((page) => (
                <Button
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  component={NavLink}
                  to={page}
                  key={page}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontWeight: 400,
                  }}
                >
                  {pages[page]}
                </Button>
              ))}
            </Box>
            {activeUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: 'transparent' }}
                      alt={activeUser.name}
                      src={
                        activeUser.avatar
                        || 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {activeUser.role === 'admin'
                    ? renderSecondaryMenu(adminMenu)
                    : renderSecondaryMenu(userMenu)}
                </Menu>
              </Box>
            ) : (
              <UserAuth />
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        disableDiscovery
        disableSwipeToOpen
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}

export default Header;
