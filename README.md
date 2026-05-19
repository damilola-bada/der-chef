# Der Chef

A React Native recipe app built with Expo, demonstrating real-world navigation patterns, shared state, and animations.

## Stack

- **Expo SDK 54** + **Expo Router 6** — file-based routing
- **React Native 0.81** / **React 19** + TypeScript
- **React Native Reanimated 4** — spring animations
- **AsyncStorage** — favorites persistence

## Features

- Browse 10 recipes with image, difficulty, duration, and star rating
- Full recipe detail — ingredients, step-by-step instructions, favorite toggle
- Filter recipes by difficulty via a bottom sheet
- Favorites tab — persisted across sessions
- Animated recipe cards (press scale) and favorite button (bounce on toggle)

## Navigation patterns

| Pattern       | Where                                              |
| ------------- | -------------------------------------------------- |
| **Stack**     | Root navigator — recipe detail pushed over tab bar |
| **Tabs**      | Bottom nav between Recipes and Favorites           |
| **formSheet** | Filter sheet presented over the Recipes tab        |

## Project structure

```json
app/
  _layout.tsx           # Root Stack
  filter.tsx            # formSheet — difficulty filter
  (tabs)/
    _layout.tsx         # Tab navigator
    index.tsx           # Recipes tab
    favorites.tsx       # Favorites tab
  recipe/
    [id].tsx            # Recipe detail screen

src/
  constants/theme.ts    # Design tokens (Colors, Fonts)
  features/
    recipe/             # Components, hooks, mock data, types
    favorites/          # FavoriteButton, useFavorites hook
```

## Getting started

```bash
pnpm install
pnpm start
```

Open in iOS Simulator, Android Emulator, or Expo Go.
