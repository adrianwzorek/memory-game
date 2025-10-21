import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PlayArrow, Refresh, EmojiEvents } from '@mui/icons-material';
import { useMemoryGameContext } from '../../contexts/MemoryGameContext';

const HeaderContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    margin: theme.spacing(1),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const StatChip = styled(Chip)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.2)',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    '& .MuiChip-label': {
        fontSize: '0.8rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem',
        },
    },
    height: 28,
    [theme.breakpoints.up('sm')]: {
        height: 32,
    },
}));

const GameHeader: React.FC = () => {
    const { gameState, startGame, resetGame } = useMemoryGameContext();

    const handleStartGame = () => {
        startGame();
    };

    const handleResetGame = () => {
        resetGame();
    };

    return (
        <>
            <HeaderContainer elevation={3}>
                <StatsContainer>
                    <StatChip
                        icon={<EmojiEvents />}
                        label={`Score: ${gameState.score}`}
                        variant="outlined"
                    />
                    <StatChip
                        label={`Moves: ${gameState.moves}`}
                        variant="outlined"
                    />
                    <StatChip
                        label={`Cards Left: ${gameState.cards.filter(c => !c.isMatched).length}`}
                        variant="outlined"
                    />
                </StatsContainer>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {!gameState.isGameStarted ? (
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PlayArrow />}
                            onClick={handleStartGame}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.3)',
                                },
                                fontWeight: 'bold',
                                px: { xs: 2, sm: 4 },
                                py: { xs: 1, sm: 1.5 },
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                minWidth: { xs: 120, sm: 'auto' },
                            }}
                        >
                            Start Game
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Refresh />}
                            onClick={handleResetGame}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.3)',
                                },
                                fontWeight: 'bold',
                                px: { xs: 2, sm: 4 },
                                py: { xs: 1, sm: 1.5 },
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                minWidth: { xs: 120, sm: 'auto' },
                            }}
                        >
                            New Game
                        </Button>
                    )}
                </Box>
            </HeaderContainer>

            {/* Win Dialog */}
            <Dialog
                open={gameState.isGameComplete}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                        color: 'white',
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
                    <EmojiEvents sx={{ fontSize: 60, mb: 1 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        Congratulations!
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        You completed the Memory Game!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Final Score: <strong>{gameState.score}</strong> points
                    </Typography>
                    <Typography variant="body1">
                        Total Moves: <strong>{gameState.moves}</strong>
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleResetGame}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.3)',
                            },
                            fontWeight: 'bold',
                            px: 4,
                        }}
                    >
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default GameHeader;
