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
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false);

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

//     return (
//         <AppBar position="static" sx={{ padding: '0 2rem', backgroundColor: "#83214F" }}>
//             <Toolbar>
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
//                 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                     {menuItems.map((item) => (
//                         <Button key={item.text} color="inherit" component={Link} to={item.path}>
//                             {item.text}
//                         </Button>
//                     ))}
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
//                         anchor="right"
//                         open={drawerOpen}
//                         onClose={toggleDrawer(false)}
//                     >
//                         <List sx={{ width: 250 }}>
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
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Profile', path: '/profile' },
    ];

    return (
        <AppBar position="static" sx={{ padding: '0 2rem', backgroundColor: "#83214F" }}>
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
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {menuItems.map((item) => (
                        <Button key={item.text} color="inherit" component={Link} to={item.path}>
                            {item.text}
                        </Button>
                    ))}
                </Box>

                {/* Hamburger Menu for small screens */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="top"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        PaperProps={{ sx: { marginTop: '56px' } }} // Positioning adjustment
                    >
                        <List>
                            {menuItems.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        onClick={toggleDrawer(false)}
                                    >
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
