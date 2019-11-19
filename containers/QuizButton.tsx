import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { Button, StyleSheet } from "react-native";
import ADD_EDIT_ANSWER from "../graphql/ADD_EDIT_ANSWER";
import QUERY_QUESTIONS from "../graphql/QUERY_QUESTIONS";
import {
  AddEditAnswerMutation,
  AddEditAnswerMutationVariables,
  Question
} from "../src/generated/graphql";
import NavigationService from "../services/NavigationService";
import { ButtonBoolean } from "../components/ButtonBoolean";

function areEqual(prevProps, nextProps) {
  return prevProps.question.userAnswer === nextProps.question.userAnswer;
}

type Props = {
  title: Boolean;
  question: Question;
  swiperRef: React.MutableRefObject<any>;
  isLast: Boolean;
};

const QuizButton: React.FC<Props> = React.memo(
  ({ title, swiperRef, question, isLast }) => {
    const [addEditAnswer] = useMutation<
      AddEditAnswerMutation,
      AddEditAnswerMutationVariables
    >(ADD_EDIT_ANSWER);

    return (
      <ButtonBoolean
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
              isLast
                ? NavigationService.navigate("ResultScreen", null)
                : swiperRef.current.goToNext();
            }
          });
        }}
        title={title.toString().toUpperCase()}
        selected={question.userAnswer === title}
      />
    );
  },
  areEqual
);

export default QuizButton;
