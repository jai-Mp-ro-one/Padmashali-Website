import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <AppBar position="static" sx={{ padding: '0 2rem', backgroundColor: "#83214F" }}>
            <Toolbar >
                <div className='header-bg-container'>
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
                    <Box>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/about">About</Button>
                        <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    </Box>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
