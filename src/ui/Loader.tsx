import {Animated, Easing, StyleSheet, View} from 'react-native';
import {CircleExample} from '../assets/circle';

const spinValue = new Animated.Value(0);

export const spin = () => {
  spinValue.setValue(0);
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 700,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => spin());
};

const rotate = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

export const Loader = () => {
  return (
    <View style={{marginTop: 50}}>
      <Animated.View style={{transform: [{rotate}]}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CircleExample style={styles.loaderSvg} />
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  loaderSvg: {
    fill: '#E5E5D5',
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});
