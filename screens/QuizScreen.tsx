import { useQuery } from "@apollo/react-hooks";
import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import HTML from "react-native-render-html";
import Swiper from "react-native-web-swiper";
import QuizButton from "../containers/QuizButton";
import QUESTIONS_QUERY from "../graphql/QUERY_QUESTIONS";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  slide1: {
    backgroundColor: "rgba(20,20,200,0.3)"
  },
  slide2: {
    backgroundColor: "rgba(20,200,20,0.3)"
  },
  slide3: {
    backgroundColor: "rgba(200,20,20,0.3)"
  },
  buttonContainer: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between"
  },
  falseButton: {
    marginRight: 5
  }
});

type Props = {
  questionIdx: number;
  swiperRef: any;
};

const Question: React.FC<Props> = ({ questionIdx, swiperRef }) => {
  const { loading, error, data } = useQuery(QUESTIONS_QUERY, {
    fetchPolicy: "cache-first"
  });

  if (loading) {
    return (
      <View style={[styles.slideContainer, styles.slide1]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error && process.env.NODE_ENV === "development") {
    return (
      <View style={[styles.slideContainer, styles.slide1]}>
        `Error! ${error.message}`
      </View>
    );
  }

  const question = data.questions.results[questionIdx];

  return (
    <View style={[styles.slideContainer, styles.slide1]}>
      <View>
        <Text>{question.category}</Text>
      </View>

      <HTML html={`<p>${question.question}</p>`} />
      <View style={styles.buttonContainer}>
        <QuizButton title={false} swiperRef={swiperRef} question={question} />
        <QuizButton title={true} swiperRef={swiperRef} question={question} />
      </View>
      <Text>
        {questionIdx + 1} of {data.questions.results.length}
      </Text>
    </View>
  );
};

const QuizScreen = () => {
  const swiperRef = useRef(null);

  // we are setting dummy array in the following way, because Swiper (react-native-web-swiper)
  // does not rerender its children on props or state change, however,
  // individual slides are still updating. It is known issue, see more here:
  // https://github.com/oxyii/react-native-web-swiper/issues/22
  const arrayOfQuestions = new Array(10).fill(1);

  return (
    <View style={styles.container}>
      <Swiper style={styles.container} ref={swiperRef} controlsEnabled={false}>
        {arrayOfQuestions.map((_, idx) => {
          return <Question key={idx} questionIdx={idx} swiperRef={swiperRef} />;
        })}
      </Swiper>
    </View>
  );
};

export default QuizScreen;
