import React from "react";
import { Button, StyleSheet, Text, View, WebView } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import ADD_EDIT_ANSWER from "../graphql/ADD_EDIT_ANSWER";
import QUERY_QUESTIONS from "../graphql/QUERY_QUESTIONS";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row"
  },
  falseButton: {
    marginRight: 5
  }
});

const QuizButton = ({ title, swiperRef, question }) => {
  const [addEditAnswer] = useMutation(ADD_EDIT_ANSWER);

  return (
    <Button
      style={styles.falseButton}
      onPress={() => {
        addEditAnswer({
          variables: {
            question: question.question,
            answer: false
          },
          update(cache) {
            const { questions } = cache.readQuery({
              query: QUERY_QUESTIONS
            });

            cache.writeQuery({
              query: QUERY_QUESTIONS,
              data: {
                questions: {
                  results: questions.results.map(questionItem => {
                    if (questionItem.question === question.question) {
                      return {
                        ...questionItem,
                        userAnswer: title
                      };
                    }
                    return questionItem;
                  }),
                  __typename: "Questions"
                }
              }
            });
          }
        });
        swiperRef.current.goToNext();
      }}
      title={title.toString().toUpperCase()}
    />
  );
};

export default QuizButton;
