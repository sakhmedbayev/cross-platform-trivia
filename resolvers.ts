import gql from "graphql-tag";
import QUESTIONS_QUERY from "./graphql/QUERY_QUESTIONS";
import QUERY_ANSWERS from "./graphql/QUERY_ANSWERS";

export const typeDefs = gql`

  type Answer {
    question: String!
    answer: Boolean!
  }

  extend type Query {
    answers: [Answer!]!
  }

  extend type Question {
    userAnswer: Boolean
  }

  # extend type Mutation {
  #   addEditAnswer(question: String!, answer: Boolean!): [Results]
  # }
`;

export const resolvers = {
  Question: {
    userAnswer: (question, _, { cache }) => {
      const { answers } = cache.readQuery({ query: QUERY_ANSWERS });

      const filterRes = answers.filter(
        answerItem => answerItem.question === question.question
      );
      // console.log('filterRes', filterRes)
      return null;
    }
  },
  Mutation: {
    addEditAnswer: (_, { question, answer }, { cache }) => {
      const { answers } = cache.readQuery({ query: QUERY_ANSWERS });

      const filterRes = answers.filter(answer => answer.question === question);

      let newAnswers = [];

      if (filterRes.length > 0) {
        newAnswers = [
          ...answers,
          {
            question: filterRes[0].question,
            answer: answer,
            __typename: "Answer"
          }
        ];
      } else {
        newAnswers = [...answers, { question, answer, __typename: "Answer" }];
      }

      const data = {
        answers: newAnswers
      };

      cache.writeQuery({ query: QUERY_ANSWERS, data });
      return data.answers;
    }
  }
};
