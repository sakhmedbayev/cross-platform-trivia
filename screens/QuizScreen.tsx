import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-web-swiper";
import Question from "../containers/Question";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

type Params = {};
type ScreenProps = {};

const QuizScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation
}) => {
  const swiperRef = useRef(null);

  // we are setting dummy array in the following way, because Swiper (react-native-web-swiper)
  // does not rerender its children on props or state change, however,
  // individual slides are still updating. It is known issue, see more here:
  // https://github.com/oxyii/react-native-web-swiper/issues/22
  console.log('navigation.state.params.numberOfQuestions)', navigation.state.params.numberOfQuestions))
  const arrayOfQuestions = new Array(navigation.state.params.numberOfQuestions).fill(1);

  return (
    <View style={styles.container}>
      <Swiper style={styles.container} ref={swiperRef}>
        {arrayOfQuestions.map((_, idx) => {
          return <Question key={idx} questionIdx={idx} swiperRef={swiperRef} />;
        })}
      </Swiper>
    </View>
  );
};

export default QuizScreen;
