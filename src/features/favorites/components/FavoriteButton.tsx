import { Colors } from '@/src/constants/theme';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  isFavorite: boolean;
  onPress: () => void;
}

export function FavoriteButton({ isFavorite, onPress }: Props) {
  const scale = useSharedValue(1);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    scale.value = withSequence(
      withSpring(1.15, { damping: 6 }),
      withSpring(1, { damping: 10 }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scale is a Reanimated shared value (stable ref), not a reactive dependency
  }, [isFavorite]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[styles.button, isFavorite && styles.buttonActive]}
        onPressIn={() => {
          scale.value = withSpring(0.95, { damping: 15 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 });
        }}
        onPress={onPress}
      >
        <Text style={styles.text}>
          {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: Colors.textPrimary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: Colors.accent,
  },
  text: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
