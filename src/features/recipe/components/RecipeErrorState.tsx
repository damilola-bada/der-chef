import { Colors } from '@/src/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
}

export function RecipeErrorState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 16,
    color: Colors.error,
  },
});
