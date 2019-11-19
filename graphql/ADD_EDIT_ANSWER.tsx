import gql from "graphql-tag";

const ADD_EDIT_ANSWER = gql`
  mutation addEditAnswer($question: String!, $answer: Boolean!) {
    addEditAnswer(question: $question, answer: $answer) @client {
      question
      answer
    }
  }
`;

export default ADD_EDIT_ANSWER;
