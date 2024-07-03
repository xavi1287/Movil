import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const AnimatedLoading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        <View style={styles.spinnerCut} />
      </Animated.View>
      <Text style={styles.text}>Cargando...</Text>
    </>
  );
};

const styles = StyleSheet.create({
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 6,
    borderColor: '#3498db',
    borderTopColor: 'transparent',
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerCut: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default AnimatedLoading;