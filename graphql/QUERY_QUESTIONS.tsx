import gql from "graphql-tag";

const QUERY_QUESTIONS = gql`
  query Questions {
    questions @rest(type: "Questions", path: "") {
      results {
        category
        difficulty
        question
        correct_answer
        userAnswer @client
      }
    }
  }
`;

export default QUERY_QUESTIONS;
