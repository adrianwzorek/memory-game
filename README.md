# Memory Game

A beautiful and interactive Memory card game built with React, TypeScript, Vite, and Material-UI.

## Features

- 🎮 **Interactive Card Flipping**: Cards flip with smooth 3D animations
- 🎯 **Smart Game Logic**: Automatic matching detection and card rollback
- 🏆 **Scoring System**: Points for successful matches
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🎨 **Modern UI**: Beautiful Material-UI components with gradients and animations
- ⚡ **Fast Performance**: Built with Vite for optimal development and build times
- 👆 **Touch Optimized**: Perfect touch interactions for mobile devices

## Game Rules

1. Click "Start Game" to begin
2. Click on cards to flip them and reveal their symbols
3. Match pairs of identical symbols
4. Cards that don't match will flip back after 1 second
5. Try to complete the game with the fewest moves possible!

## Project Structure

```
src/
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx      # Main game board component
│   │   └── GameHeader.tsx     # Score, moves, and controls
│   └── ui/
│       └── MemoryCard.tsx     # Individual card component
├── contexts/
│   └── MemoryGameContext.tsx  # React context for game state
├── hooks/
│   └── useMemoryGame.ts       # Custom hook for game logic
├── types/
│   └── game.ts               # TypeScript type definitions
├── App.tsx                   # Main app component
└── main.tsx                  # Application entry point
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Game Components

### MemoryCard

- Handles individual card rendering and flip animations
- Uses CSS 3D transforms for smooth card flipping
- Displays question mark on front, MUI icons on back
- Features beautiful gradient backgrounds and smooth animations

### GameBoard

- Manages the 4x4 grid of cards
- Handles card click events and game state
- Fully responsive grid layout that adapts to screen size
- Optimized spacing and sizing for mobile devices

### GameHeader

- Displays current score, moves, and remaining cards
- Start/Reset game controls
- Win condition dialog

### Game Logic

- Automatic card matching detection
- Score calculation (10 points per match)
- Move counting
- Win condition detection

## Customization

You can easily customize the game by:

- Changing card symbols in `CARD_VALUES` array in `useMemoryGame.ts` (using MUI icon names)
- Modifying the grid size by adjusting the number of pairs
- Updating colors and themes in `App.tsx`
- Adding sound effects or additional animations
- Customizing card flip animation timing and easing
- Adjusting responsive breakpoints for different screen sizes
- Modifying touch interaction behaviors for mobile devices

Enjoy playing the Memory Game! 🎮
