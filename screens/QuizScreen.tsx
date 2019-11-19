import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-web-swiper";
import Question from "../containers/Question";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const QuizScreen = () => {
  const swiperRef = useRef(null);

  // we are setting dummy array in the following way, because Swiper (react-native-web-swiper)
  // does not rerender its children on props or state change, however,
  // individual slides are still updating. It is known issue, see more here:
  // https://github.com/oxyii/react-native-web-swiper/issues/22
  const arrayOfQuestions = new Array(10).fill(1);

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
