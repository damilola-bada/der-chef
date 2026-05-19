import { Colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ rating, size = 14, showValue = true }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return 'star';
    if (rating >= i + 0.5) return 'star-half';
    return 'star-outline';
  }) as ('star' | 'star-half' | 'star-outline')[];

  return (
    <View style={styles.row}>
      {stars.map((name, i) => (
        <Ionicons key={i} name={name} size={size} color={Colors.accent} />
      ))}
      {showValue && (
        <Text style={[styles.value, { fontSize: size }]}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  value: {
    color: Colors.textSecondary,
    fontWeight: '500',
    marginLeft: 4,
  },
});
