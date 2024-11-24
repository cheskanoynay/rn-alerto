import React, { useEffect } from "react";
import { LucideLoader, LucideProps } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SpinnerProps extends LucideProps {}

const Spinner = (props: SpinnerProps) => {
  const { style, ...rest } = props;

  const spin = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  useEffect(() => {
    spin.value = withRepeat(withTiming(360, { duration: 1000 }), -2, true);
  });

  return (
    <Animated.View style={animatedStyle}>
      <LucideLoader style={style} color="#000000" size={16} {...rest} />
    </Animated.View>
  );
};

export { Spinner };
