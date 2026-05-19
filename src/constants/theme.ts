import { Platform } from 'react-native';

export const Colors = {
  // Page & surface backgrounds
  background: '#FAF9F6', // warm off-white — used as the page/screen bg
  surface: '#FFFFFF', // cards, headers, modals
  surfaceMuted: '#F0EDE7', // badges, subtle containers

  // Text hierarchy
  textPrimary: '#1C1917', // headings and main body copy
  textSecondary: '#78716C', // meta labels, supporting text
  textMuted: '#A8A29E', // hints, placeholders, inactive tab labels
  textInverse: '#FFFFFF', // text placed on dark or accent-colored surfaces

  // Brand accent — terracotta
  accent: '#C2612A',

  // Status
  error: '#DC2626',

  // Misc
  shadow: '#000000',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
