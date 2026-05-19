import { Platform } from 'react-native';

export const isIpad = Platform.OS === 'ios' && Platform.isPad;
