import { gql } from "@apollo/client";

export const START_TIMERECORD = gql`
  mutation startTimerecord($input: StartTimerecordInput) {
    startTimerecord(input: $input) {
      id
      task {
        name
      }
    }
  }
`;

export const STOP_TIMERECORD = gql`
  mutation stopTimerecord($input: StartTimerecordInput) {
    stopTimerecord(input: $input) {
      id
      task {
        name
      }
    }
  }
`;
