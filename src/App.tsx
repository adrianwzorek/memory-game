import React from 'react';
import {
    Container,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Paper
} from '@mui/material';
import { MemoryGameProvider } from './contexts/MemoryGameContext';
import GameHeader from './components/game/GameHeader';
import GameBoard from './components/game/GameBoard';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            dark: '#115293',
            light: '#42a5f5',
        },
        secondary: {
            main: '#dc004e',
            dark: '#9a0036',
            light: '#ff5983',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MemoryGameProvider>
                <Box
                    sx={{
                        minHeight: '100vh',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        py: { xs: 1, sm: 2 },
                        px: { xs: 1, sm: 2 },
                    }}
                >
                    <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
                        <Paper
                            elevation={8}
                            sx={{
                                borderRadius: { xs: 2, sm: 3 },
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                width: '100%',
                            }}
                        >
                            <GameHeader />
                            <GameBoard />
                        </Paper>
                    </Container>
                </Box>
            </MemoryGameProvider>
        </ThemeProvider>
    );
};

export default App;
