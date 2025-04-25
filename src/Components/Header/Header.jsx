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
    // setIsLoggedIn,
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

    // const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
            // dispatch(setIsLoggedIn(false));
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about', requiresAuth: true },
        { text: 'About us', path: '/aboutus' },
        { text: 'Refund policy', path: '/refund' },
        { text: 'Profile', path: '/profile', requiresAuth: true },
        { text: 'Privacy Policy', path: '/privacy-policy' },
        { text: 'Terms & Conditions', path: '/terms-conditions' },
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: '#83214F' }}>
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
                        .filter((item) => !item.requiresAuth)
                        .map((item) => (
                            <Button key={item.text} color="inherit" component={Link} to={item.path}>
                                <ListItemText primary={item.text.charAt(0).toUpperCase() + item.text.slice(1).toLowerCase()} />
                            </Button>
                        ))}

                </Box>

                {/* Hamburger Menu for small screens */}
                <Box sx={{ display: { xs: 'flex', md: 'none', textTransform: 'capitalize' } }}>
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
                                .filter((item) => !item.requiresAuth)
                                .map((item) => (
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
                                            <ListItemText primary={item.text.charAt(0).toUpperCase() + item.text.slice(1).toLowerCase()} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            <ListItem disablePadding>

                            </ListItem>
                        </List>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
