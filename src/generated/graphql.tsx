import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Answer = {
   __typename?: 'Answer',
  question: Scalars['String'],
  answer: Scalars['Boolean'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addEditAnswer?: Maybe<Array<Maybe<Answer>>>,
};


export type MutationAddEditAnswerArgs = {
  question: Scalars['String'],
  answer: Scalars['Boolean']
};

export type Query = {
   __typename?: 'Query',
  questions?: Maybe<Questions>,
  answers: Array<Answer>,
};

export type Question = {
   __typename?: 'Question',
  category: Scalars['String'],
  difficulty: Scalars['String'],
  question: Scalars['String'],
  correct_answer: Scalars['String'],
  userAnswer?: Maybe<Scalars['Boolean']>,
};

export type Questions = {
   __typename?: 'Questions',
  results: Array<Question>,
};

export type AddEditAnswerMutationVariables = {
  question: Scalars['String'],
  answer: Scalars['Boolean']
};


export type AddEditAnswerMutation = (
  { __typename?: 'Mutation' }
  & { addEditAnswer: Maybe<Array<Maybe<(
    { __typename?: 'Answer' }
    & Pick<Answer, 'question' | 'answer'>
  )>>> }
);

export type AnswersQueryVariables = {};


export type AnswersQuery = (
  { __typename?: 'Query' }
  & { answers: Array<(
    { __typename?: 'Answer' }
    & Pick<Answer, 'question' | 'answer'>
  )> }
);

export type QuestionsQueryVariables = {};


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { questions: Maybe<(
    { __typename?: 'Questions' }
    & { results: Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'category' | 'difficulty' | 'question' | 'correct_answer' | 'userAnswer'>
    )> }
  )> }
);


export const AddEditAnswerDocument = gql`
    mutation addEditAnswer($question: String!, $answer: Boolean!) {
  addEditAnswer(question: $question, answer: $answer) @client {
    question
    answer
  }
}
    `;
export type AddEditAnswerMutationFn = ApolloReactCommon.MutationFunction<AddEditAnswerMutation, AddEditAnswerMutationVariables>;
export type AddEditAnswerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddEditAnswerMutation, AddEditAnswerMutationVariables>, 'mutation'>;

    export const AddEditAnswerComponent = (props: AddEditAnswerComponentProps) => (
      <ApolloReactComponents.Mutation<AddEditAnswerMutation, AddEditAnswerMutationVariables> mutation={AddEditAnswerDocument} {...props} />
    );
    
export type AddEditAnswerProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddEditAnswerMutation, AddEditAnswerMutationVariables> & TChildProps;
export function withAddEditAnswer<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddEditAnswerMutation,
  AddEditAnswerMutationVariables,
  AddEditAnswerProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddEditAnswerMutation, AddEditAnswerMutationVariables, AddEditAnswerProps<TChildProps>>(AddEditAnswerDocument, {
      alias: 'addEditAnswer',
      ...operationOptions
    });
};
export type AddEditAnswerMutationResult = ApolloReactCommon.MutationResult<AddEditAnswerMutation>;
export type AddEditAnswerMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEditAnswerMutation, AddEditAnswerMutationVariables>;
export const AnswersDocument = gql`
    query answers {
  answers @client {
    question
    answer
  }
}
    `;
export type AnswersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AnswersQuery, AnswersQueryVariables>, 'query'>;

    export const AnswersComponent = (props: AnswersComponentProps) => (
      <ApolloReactComponents.Query<AnswersQuery, AnswersQueryVariables> query={AnswersDocument} {...props} />
    );
    
export type AnswersProps<TChildProps = {}> = ApolloReactHoc.DataProps<AnswersQuery, AnswersQueryVariables> & TChildProps;
export function withAnswers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AnswersQuery,
  AnswersQueryVariables,
  AnswersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AnswersQuery, AnswersQueryVariables, AnswersProps<TChildProps>>(AnswersDocument, {
      alias: 'answers',
      ...operationOptions
    });
};
export type AnswersQueryResult = ApolloReactCommon.QueryResult<AnswersQuery, AnswersQueryVariables>;
export const QuestionsDocument = gql`
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
export type QuestionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<QuestionsQuery, QuestionsQueryVariables>, 'query'>;

    export const QuestionsComponent = (props: QuestionsComponentProps) => (
      <ApolloReactComponents.Query<QuestionsQuery, QuestionsQueryVariables> query={QuestionsDocument} {...props} />
    );
    
export type QuestionsProps<TChildProps = {}> = ApolloReactHoc.DataProps<QuestionsQuery, QuestionsQueryVariables> & TChildProps;
export function withQuestions<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  QuestionsQuery,
  QuestionsQueryVariables,
  QuestionsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, QuestionsQuery, QuestionsQueryVariables, QuestionsProps<TChildProps>>(QuestionsDocument, {
      alias: 'questions',
      ...operationOptions
    });
};
export type QuestionsQueryResult = ApolloReactCommon.QueryResult<QuestionsQuery, QuestionsQueryVariables>;