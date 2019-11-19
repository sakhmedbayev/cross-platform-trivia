import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import HTML from "react-native-render-html";
import QUESTIONS_QUERY from "../graphql/QUERY_QUESTIONS";
import { QuestionsQuery } from "../src/generated/graphql";
import QuizButton from "./QuizButton";

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  slide: {
    backgroundColor: "rgba(20,20,200,0.3)"
  },
  buttonContainer: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between"
  }
});

type Props = {
  questionIdx: number;
  swiperRef: React.MutableRefObject<any>;
};

const Question: React.FC<Props> = ({ questionIdx, swiperRef }) => {
  const { loading, error, data } = useQuery<QuestionsQuery>(QUESTIONS_QUERY, {
    fetchPolicy: "cache-first"
  });

  if (loading) {
    return (
      <View style={[styles.slideContainer, styles.slide]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error && process.env.NODE_ENV === "development") {
    return (
      <View style={[styles.slideContainer, styles.slide]}>
        <Text>`Error! ${error.message}`</Text>
      </View>
    );
  }

  const question = data.questions.results[questionIdx];

  return (
    <View style={[styles.slideContainer, styles.slide]}>
      <View>
        <Text>{question.category}</Text>
      </View>

      <HTML html={`<p>${question.question}</p>`} />
      <View style={styles.buttonContainer}>
        <QuizButton
          title={false}
          swiperRef={swiperRef}
          question={question}
          isLast={questionIdx === 9}
        />
        <QuizButton
          title={true}
          swiperRef={swiperRef}
          question={question}
          isLast={questionIdx === 9}
        />
      </View>
      <Text>
        {questionIdx + 1} of {data.questions.results.length}
      </Text>
    </View>
  );
};

export default Question;
