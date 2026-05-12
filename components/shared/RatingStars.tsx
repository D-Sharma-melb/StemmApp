import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onRating: (rating: number) => void;
  maxStars?: number;
}

export const RatingStars: React.FC<Props> = ({ onRating, maxStars = 5 }) => {
  const [rating, setRating] = useState(0);

  const handlePress = (idx: number) => {
    setRating(idx);
    onRating(idx);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <TouchableOpacity key={i} onPress={() => handlePress(i + 1)}>
          <Ionicons 
            name={i < rating ? "star" : "star-outline"} 
            size={48} 
            color="#FFD54F" // Warning/Yellow from theme
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
  }
});