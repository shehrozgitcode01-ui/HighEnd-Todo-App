import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native'; // <--- Changed from Pressable

interface Props {
  value: boolean;
  onValueChange: () => void;
  activeColor: string;
  inActiveColor: string;
}

export const IosSwitch = ({ value, onValueChange, activeColor, inActiveColor }: Props) => {
  // Animation value: 0 for Off, 1 for On
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200, 
      useNativeDriver: false,
    }).start();
  }, [value]);

  // Interpolate background color
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inActiveColor, activeColor]
  });

  // Interpolate thumb position
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 18] 
  });

  return (
    // <--- Changed to TouchableOpacity to fix the 'activeOpacity' error
    <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View 
          style={[
            styles.thumb, 
            { transform: [{ translateX }] }
          ]} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 12, 
    justifyContent: 'center',
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#fff', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2, 
  }
});