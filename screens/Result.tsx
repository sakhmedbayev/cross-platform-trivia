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
  answeredSlide1: {
    backgroundColor: "grey"
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

};

const Result: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(QUESTIONS_QUERY, {
    fetchPolicy: "cache-only"
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

  

  return (
    <View
      style={[
        styles.slideContainer,
        styles.slide1
      ]}
    >
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

export Result 
