// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';
// import APIServices from '../../APIServices/APIServices';
// import { useDispatch, useSelector } from 'react-redux';
// import { setIsLoggedIn, setLoginId, setProfileData, setRefreshToken, setToken, setUniqueDeviceId } from '../../Redux/Action';

// const Header = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const isLoggedIn = useSelector((state) => {
//         return state.isLoggedIn;
//     });

//     console.log("isLoggedIn: ", isLoggedIn)

//     const toggleDrawer = (open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }
//         setDrawerOpen(open);
//     };

//     const menuItems = [
//         { text: 'Home', path: '/' },
//         { text: 'About', path: '/about' },
//         { text: 'Profile', path: '/profile' },
//     ];

//     const handleLogout = async () => {
//         console.log('i am in')
//         try {
//             APIServices.handleLogut()
//                 .then((response) => {
//                     console.log("User Logged out successfully")
//                     dispatch(setProfileData(null))
//                     dispatch(setLoginId(null))
//                     dispatch(setUniqueDeviceId(null))
//                     dispatch(setToken(null))
//                     dispatch(setRefreshToken(null))
//                     dispatch(setIsLoggedIn(false))
//                     navigate('/login');
//                 })
//                 .catch((error) => {
//                     console.log("Getting error while logging out: ", error.data)
//                 })
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <AppBar position="static" sx={{ padding: '0 2rem', backgroundColor: "#83214F" }}>
//             <Toolbar>
//                 {/* Logo and Title */}
//                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                     <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                         <img
//                             src="/Assets/LoginScreenLogo.webp"
//                             alt="Padmashali Logo"
//                             style={{ height: 40, marginRight: 10, verticalAlign: 'middle' }}
//                         />
//                         Padmashali Global
//                     </Link>
//                 </Typography>

//                 {/* Desktop Menu */}
//                 <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
//                     {menuItems.map((item) => (
//                         <Button key={item.text} color="inherit" component={Link} to={item.path}>
//                             {item.text}
//                         </Button>
//                     ))}
//                     {/* Logout Button */}
//                     <Button color="inherit" onClick={handleLogout}>
//                         Logout
//                     </Button>
//                 </Box>

//                 {/* Hamburger Menu for small screens */}
//                 <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                     <IconButton
//                         edge="end"
//                         color="inherit"
//                         aria-label="menu"
//                         onClick={toggleDrawer(true)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Drawer
//                         anchor="top"
//                         open={drawerOpen}
//                         onClose={toggleDrawer(false)}
//                         PaperProps={{ sx: { marginTop: '56px' } }}
//                     >
//                         <List>
//                             {menuItems.map((item) => (
//                                 <ListItem key={item.text} disablePadding>
//                                     <ListItemButton
//                                         component={Link}
//                                         to={item.path}
//                                         onClick={toggleDrawer(false)}
//                                     >
//                                         <ListItemText primary={item.text} />
//                                     </ListItemButton>
//                                 </ListItem>
//                             ))}
//                             {isLoggedIn ? (
//                                 <ListItem disablePadding>
//                                     <ListItemButton onClick={handleLogout}>
//                                         <ListItemText primary="Logout" />
//                                     </ListItemButton>
//                                 </ListItem>

//                             ) : (
//                                 <ListItem disablePadding>
//                                     <ListItemButton onClick={handleLogout}>
//                                         <ListItemText primary="Login" />
//                                     </ListItemButton>
//                                 </ListItem>
//                             )}
//                         </List>
//                     </Drawer>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Header;



import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import APIServices from '../../APIServices/APIServices';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsLoggedIn,
    setLoginId,
    setProfileData,
    setRefreshToken,
    setToken,
    setUniqueDeviceId,
} from '../../Redux/Action';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = async () => {
        try {
            await APIServices.handleLogut();
            console.log('User Logged out successfully');
            dispatch(setProfileData(null));
            dispatch(setLoginId(null));
            dispatch(setUniqueDeviceId(null));
            dispatch(setToken(null));
            dispatch(setRefreshToken(null));
            dispatch(setIsLoggedIn(false));
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about', requiresAuth: true },
        { text: 'Profile', path: '/profile', requiresAuth: true },
    ];

    return (
        <AppBar position="static" sx={{ padding: '0 2rem', backgroundColor: '#83214F' }}>
            <Toolbar>
                {/* Logo and Title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src="/Assets/LoginScreenLogo.webp"
                            alt="Padmashali Logo"
                            style={{ height: 40, marginRight: 10, verticalAlign: 'middle' }}
                        />
                        Padmashali Global
                    </Link>
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {menuItems
                        .filter((item) => !item.requiresAuth || isLoggedIn)
                        .map((item) => (
                            <Button key={item.text} color="inherit" component={Link} to={item.path}>
                                {item.text}
                            </Button>
                        ))}
                    {/* Show Logout or Login button based on authentication status */}
                    {isLoggedIn ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    )}
                </Box>

                {/* Hamburger Menu for small screens */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="top"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        PaperProps={{ sx: { marginTop: '56px' } }}
                    >
                        <List>
                            {menuItems
                                .filter((item) => !item.requiresAuth || isLoggedIn)
                                .map((item) => (
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            <ListItem disablePadding>
                                {isLoggedIn ? (
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                ) : (
                                    <ListItemButton component={Link} to="/login" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Login" />
                                    </ListItemButton>
                                )}
                            </ListItem>
                        </List>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
