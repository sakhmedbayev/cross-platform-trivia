import gql from "graphql-tag";

const QUERY_ANSWERS = gql`
  query answers {
    answers @client {
      question
      answer
    }
  }
`;

export default QUERY_ANSWERS;
